import {
  Observable,
  Subject,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { type PolyfeaBackend } from './internal';
import { StaticBackend } from './static-backend';
import { FetchBackend } from './fetch-backend';
import { NavigateEvent, type Navigation, registerNavigationPolyfill } from './navigation';
import { Configuration, type ContextArea, type MicrofrontendResource } from '@polyfea/browser-api';

declare global {
  var polyfea: Polyfea;
  var navigation: Navigation | undefined;
  var polyfeaNavigation$: Observable<string> | undefined;
}
/**
 * Polyfea driver for loading microfrontends.
 *
 * This interface is primarily used internally by the `<polyfea-context>` element. It loads context area and microfrontend resources.
 * The `boot.ts` script is used by the polyfea controller to initialize the polyfea driver.
 *
 * @remarks
 *
 * For standalone purposes and development, you can use the `boot.ts` script or call `Polyfea.initialize()`.
 * This initializes the polyfea driver in the global context.
 *
 * For more details on the `ContextArea` type, refer to the
 * [@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md) package documentation.
 *
 * The default endpoint of the [@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md) is `./polyfea`.
 * This is relative to the `document`. You can change it using the document meta tag. For example:
 *
 * ```html
 * <meta name="polyfea-endpoint" content="https://example.com/polyfea">
 * ```
 *
 * If the endpoint is prefixed with `static://`, the remaining part is used as the base path for the
 * [@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md).
 *
 * In this case, context areas are loaded only at document load using the
 * [`PolyfeaApi.getStaticConfig`](https://github.com/polyfea/browser-api/blob/main/docs/classes/PolyfeaApi.md#getstaticconfig) API call.
 **/
export interface Polyfea {
  /**
   * Get an observable for the context area. This provides the context area for the current document location path,
   * relative to the `document.baseURI`.
   *
   * The responses are cached in localStorage. They are first served from the cache and updated if the remote context area is different.
   *
   * @param contextName - Name of the context area.
   */
  getContextArea(contextName: string): Observable<ContextArea>;

  /**
   * Load microfrontend resources for the given context area and microfrontend name. This resolves dependencies recursively.
   *
   * @param ctx - Context area specification.
   * @param name - Name of the microfrontend to load. This must be present in the context area specification.
   *
   * @return A promise that resolves to an array of errors or nulls for each resource load.
   * Loading errors does not results in rejection as order of loading is not critical for the application and some elements and resources  may be optional
   * for the microfrontend to function.
   * Fully successful loads are represented as empty array.
   *
   * @throws Never
   */
  loadMicrofrontend(ctx: ContextArea, name: string): Promise<Array<Error>>;
}

export const Polyfea = {
  /** @static
   *
   * Get or create a polyfea driver instance. If the instance is provided on the global context, it is returned.
   * Otherwise, a new instance is created with the given configuration.
   *
   * @param config - Configuration for the [`PolyfeaApi`](https://github.com/polyfea/browser-api/blob/main/docs/classes/PolyfeaApi.md).
   **/
  getOrCreate(config?: Configuration): Polyfea {
    if (globalThis.polyfea) {
      return globalThis.polyfea;
    } else return new PolyfeaImpl(config);
  },

  /** @static
   * Initialize the polyfea driver in the global context.
   * This method is typically invoked by the polyfea controller script `boot.ts`.
   *
   * @return `true` if the polyfea driver was initialized, `false` if it was already present.
   *
   * @remarks
   * This method also initializes the Navigation polyfill if it's not already present.
   * It augments `window.customElements.define` to allow for duplicate registration of custom elements.
   * This is particularly useful when different microfrontends need to register the same dependencies.
   */
  initialize(): boolean {
    let initialized = false;
    if (!globalThis.polyfea) {
      PolyfeaImpl.install();
      initialized = true;
    }
    return initialized;
  },
};

class PolyfeaImpl implements Polyfea {
  private readonly config?: Configuration;

  constructor(config?: Configuration) {
    this.config = config;
    if (globalThis.navigation) {
      globalThis.navigation.addEventListener('navigate', ((event: NavigateEvent) => {
        if (event.canIntercept) {
          if (event.destination.url.startsWith(document.baseURI)) {
            event.intercept();
          }
        }
      }) as EventListener);
    }
  }

  private backend: PolyfeaBackend | undefined;
  private loadedResources: Set<string> = new Set();

  private getBackend(): PolyfeaBackend {
    if (!this.backend) {
      let metaTagContent = document
        .querySelector('meta[name="polyfea.backend"]')
        ?.getAttribute('content');
      if (metaTagContent) {
        if (metaTagContent.startsWith('static://')) {
          const url = metaTagContent.slice(9);
          this.backend = new StaticBackend(this.config || url);
        } else {
          this.backend = new FetchBackend(this.config || metaTagContent);
        }
      } else {
        this.backend = new FetchBackend(this.config || './polyfea');
      }
    }
    return this.backend;
  }

  getContextArea(contextName: string): Observable<ContextArea> {
    let stream$ = this.getBackend().getContextArea(contextName);
    if (globalThis.polyfeaNavigation$) {
      stream$ = globalThis.polyfeaNavigation$.pipe(
        startWith(globalThis.location.pathname),
        switchMap(_ => this.getBackend().getContextArea(contextName)),
      );
    }

    return stream$.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)));
  }

  async loadMicrofrontend(ctx: ContextArea, name: string): Promise<Array<Error>> {
    if (!name) return Promise.resolve([]);
    const dependencyPath: string[] = [];
    const errors = await this.loadMicrofrontendRecursive(ctx, name, dependencyPath);
    return errors.filter(err => err) as Array<Error>;
  }

  private async loadMicrofrontendRecursive(
    ctx: ContextArea,
    name: string,
    dependencyPath: string[],
  ): Promise<Array<Error | null>> {
    if (dependencyPath.includes(name)) {
      console.error(
        '[Polyfea] Circular module dependency detected: ' + dependencyPath.join(' -> '),
      );
      return [new Error('Circular module dependency detected: ' + dependencyPath.join(' -> '))];
    }
    const mcfe = (ctx.microfrontends || {})[name];
    if (!mcfe) {
      console.error('[Polyfea] Microfrontend specification not found: ' + name);
      return [new Error('Microfrontend specification not found: ' + name)];
    }

    dependencyPath.push(name);
    const errors: Array<Error | null> = [];
    if (mcfe.dependsOn) {
      const depErrors = await Promise.all(
        mcfe.dependsOn.map(dep => this.loadMicrofrontendRecursive(ctx, dep, dependencyPath)),
      );
      depErrors.forEach(errArray => {
        errors.push(...errArray.filter(err => err));
      });
    }

    let resources = mcfe.resources || [];
    if (mcfe.module) {
      resources = [
        ...resources,
        {
          kind: 'script',
          href: mcfe.module,
          attributes: {
            type: 'module',
          },
          waitOnLoad: true,
        },
      ];
    }

    const loadErrors = await Promise.all(
      resources.map(resource => {
        if (!resource.href) {
          console.warn(`[Polyfea] Resource has no href: ${JSON.stringify(resource)}`);
          return Promise.resolve(
            new Error(`One of the resources of the module '${name}' has no href`),
          );
        }
        if (this.loadedResources.has(resource.href)) {
          return Promise.resolve(null);
        }
        switch (resource.kind) {
          case 'script':
            return this.loadScript(resource);
          case 'stylesheet':
            return this.loadStylesheet(resource);
          case 'link':
            return this.loadLink(resource);
          default:
            return Promise.resolve(new Error(`Unknown resource kind: ${resource.kind}`));
        }
      }),
    );
    errors.push(...loadErrors.filter(err => err));
    return errors;
  }

  private loadScript(resource: MicrofrontendResource): Promise<Error | null> {
    return new Promise<Error | null>(resolve => {
      const script = document.createElement('script');
      script.src = resource.href!;
      script.setAttribute('async', ''); // load async by default
      resource.attributes &&
        Object.entries(resource.attributes).forEach(([name, value]) => {
          script.setAttribute(name, value);
        });
      const cspNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
      if (cspNonce) {
        script.setAttribute('nonce', cspNonce);
      }

      this.loadedResources.add(resource.href!);
      if (resource.waitOnLoad) {
        script.onload = () => {
          resolve(null);
        };
        script.onerror = () => {
          this.loadedResources.delete(resource.href!);
          const err = new Error(
            `Failed to load script ${resource.href} while loading microfrontend resources, check the network tab for details`,
          );
          console.error(`[Polyfea] ${err.message}`);
          resolve(err);
        };
      } else {
        resolve(null);
      }

      document.head.appendChild(script);
    });
  }

  private loadStylesheet(resource: MicrofrontendResource): Promise<Error | null> {
    return this.loadLink({
      ...resource,
      attributes: { ...resource.attributes, rel: 'stylesheet' },
    });
  }

  private loadLink(resource: MicrofrontendResource): Promise<Error | null> {
    const link = document.createElement('link');
    link.href = resource.href!;
    link.setAttribute('async', '');
    const cspNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
    if (cspNonce) {
      link.setAttribute('nonce', cspNonce);
    }
    resource.attributes &&
      Object.entries(resource.attributes).forEach(([name, value]) => {
        link.setAttribute(name, value);
      });
    return new Promise<Error | null>(resolve => {
      this.loadedResources.add(resource.href!);
      if (resource.waitOnLoad) {
        link.onload = () => {
          resolve(null);
        };
        link.onerror = () => {
          this.loadedResources.delete(resource.href!);
          const err = new Error(
            `Failed to load ${resource.href} while loading microfrontend resources, check the network tab for details`,
          );
          console.error(`[Polyfea] ${err.message}`);
          resolve(err);
        };
      } else {
        resolve(null);
      }
      document.head.appendChild(link);
    });
  }

  static install() {
    if (!globalThis.polyfea) {
      globalThis.polyfea = new PolyfeaImpl();
    }
    registerNavigationPolyfill();

    /// custom elements can be repeatedly registered due to the rebundling in multiple web-components
    // get meta tag with name polyfea.duplicit-custom-elements
    const metaTagContent = document
      .querySelector('meta[name="polyfea.duplicit-custom-elements"]')
      ?.getAttribute('content');
    let duplicitCustomElements: string = 'warn';
    if (['silent', 'error', 'verbose'].includes(metaTagContent || '')) {
      duplicitCustomElements = metaTagContent!;
    }

    function safeDecorator(
      fn: (
        name: string,
        constructor: CustomElementConstructor,
        options?: ElementDefinitionOptions,
      ) => void,
    ) {
        let rn = fn;
      // eslint-disable-next-line func-names
      if ((fn as any).overrider !== 'polyfea') {
        
        const owned = function (this: CustomElementRegistry, ...args: any) {
          if (this.get(args[0])) {
            if (duplicitCustomElements === 'error') {
              throw new Error(`[Polyfea] Custom element '${args[0]}' is duplicately registered`);
            } else if (duplicitCustomElements === 'warn' || duplicitCustomElements === 'verbose') {
              console.warn(
                `[Polyfea] Custom element '${args[0]}' is duplicately registered - ignoring the current attempt for registration`,
              );
              return false;
            }
          } else {
            if (duplicitCustomElements === 'verbose') {
              console.log(`[Polyfea] Custom element '${args[0]}' is registered`);
            }
            return fn.apply(this, args);
          }
        };
        owned.overrider = 'polyfea';
        rn = owned;
      }
      return rn;
    }

    customElements.define = safeDecorator(customElements.define);

    // create navigaion observable to refresh context areason navigation events
    if (!globalThis.polyfeaNavigation$) {
      const originalPush = globalThis.history.pushState as any;
      const originalReplace = globalThis.history.replaceState as any;
      const navigation$ = new Subject<string>();
      globalThis.polyfeaNavigation$ = navigation$;

      const augment = (original: (this: History, ...args: any[]) => void) => {
        return function (this: History, ...args: any[]) {
          const result = original.apply(this, args);
          navigation$!.next(globalThis.location.pathname);
          return result;
        };
      };

      globalThis.history.pushState = augment(originalPush);
      globalThis.history.replaceState = augment(originalReplace);

      // also listen to popstate events
      fromEvent(globalThis, 'popstate')
        .pipe(map(() => globalThis.location.pathname))
        .subscribe(pathname => {
          navigation$!.next(pathname);
        });
      if (globalThis.navigation) {
        fromEvent(globalThis.navigation, 'navigatesuccess')
          .pipe(map(() => globalThis.location.pathname))
          .subscribe(pathname => {
            navigation$!.next(pathname);
          });
      }
    }
  }
}
