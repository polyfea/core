import { Observable, distinctUntilChanged, fromEvent, startWith, switchMap } from "rxjs";
import { PolyfeaBackend } from "./internal";
import { StaticBackend } from "./static-backend";
import { FetchBackend } from "./fetch-backend";
import { NavigateEvent, Navigation, registerNavigationPolyfill } from "./navigation";
import { Configuration, ContextArea, MicrofrontendResource } from "@polyfea/browser-api";

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
     * @throws Error if the microfrontend specification is not found or if there is a circular dependency.
     */
    loadMicrofrontend(ctx: ContextArea, name: string): Promise<void>;
}

export class Polyfea {

    /** @internal @private */
    private constructor() { }

    /** @static
     * 
     * Get or create a polyfea driver instance. If the instance is provided on the global context, it is returned. 
     * Otherwise, a new instance is created with the given configuration.
     * 
     * @param config - Configuration for the [`PolyfeaApi`](https://github.com/polyfea/browser-api/blob/main/docs/classes/PolyfeaApi.md).
     **/
    static getOrCreate(config?: Configuration): Polyfea {
        if (globalThis.polyfea) {
            return globalThis.polyfea;
        } else return new PolyfeaImpl(config);
    }

    /** @static
     * Initialize the polyfea driver in the global context. 
     * This method is typically invoked by the polyfea controller script `boot.ts`.
     * 
     * @remarks 
     * This method also initializes the Navigation polyfill if it's not already present.
     * It augments `window.customElements.define` to allow for duplicate registration of custom elements.
     * This is particularly useful when different microfrontends need to register the same dependencies.
     */
    static initialize() {
        if (!globalThis.polyfea) {
            PolyfeaImpl.install();
        }
    }

}

declare global {
    interface globalThis {
        polyfea: Polyfea;
        navigation: Navigation;
    }
};

class PolyfeaImpl implements Polyfea {
    constructor(private readonly config?: Configuration) {
        if (globalThis.navigation) {
            globalThis.navigation.addEventListener('navigate', (event: NavigateEvent) => {
                if (event.canIntercept) {
                    if (event.destination.url.startsWith(document.baseURI)) {
                        event.intercept();
                    }
                }
            });
        }
    }

    private backend: PolyfeaBackend;
    private loadedResources: Set<string> = new Set();

    private getBackend(): PolyfeaBackend {
        if (!this.backend) {
            let metaTagContent = document.querySelector('meta[name="polyfea.backend"]')?.getAttribute('content');
            if (metaTagContent) {
                if (metaTagContent.startsWith("static://")) {
                    const url = metaTagContent.slice(9)
                    this.backend = new StaticBackend(this.config || url);
                } else {
                    this.backend = new FetchBackend(this.config || metaTagContent);
                }
            } else {
                this.backend = new FetchBackend(this.config || "./polyfea");
            }
        }
        return this.backend
    }

    getContextArea(contextName: string): Observable<ContextArea> {
        if (globalThis.navigation) {
            return fromEvent(globalThis.navigation, "navigatesuccess").pipe(
                startWith(new Event('navigatesuccess', { bubbles: true, cancelable: true })),
                switchMap(_ => this.getBackend().getContextArea(contextName)),
                distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
            );
        } else {
            return this.getBackend().getContextArea(contextName).pipe(
                distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
            )
        }
    }

    loadMicrofrontend(ctx: ContextArea, name: string): Promise<void> {
        if (!name) return Promise.resolve();
        const dependencyPath: string[] = [];
        return this.loadMicrofrontendRecursive(ctx, name, dependencyPath);
    }

    private async loadMicrofrontendRecursive(ctx: ContextArea, name: string, dependencyPath: string[]): Promise<void> {
        if (dependencyPath.includes(name)) {
            throw new Error("Circular dependency detected: " + dependencyPath.join(" -> "));
        }
        const mcfe = ctx.microfrontends[name];
        if (!mcfe) {
            throw new Error("Microfrontend specification not found: " + name);
        }

        dependencyPath.push(name);
        mcfe.dependsOn && await Promise.all(mcfe.dependsOn.map(dep => this.loadMicrofrontendRecursive(ctx, dep, dependencyPath)));

        let resources = mcfe.resources || [];
        if (mcfe.module) {
            resources = [...resources, {
                kind: "script",
                href: mcfe.module,
                attributes: {
                    type: "module"
                },
                waitOnLoad: true
            }];
        }

        await Promise.all(resources.map(resource => {
            if (this.loadedResources.has(resource.href)) {
                return Promise.resolve();
            }
            switch (resource.kind) {
                case "script":
                    return this.loadScript(resource);
                case "stylesheet":
                    return this.loadStylesheet(resource);
                case "link":
                    return this.loadLink(resource);
            }
        }));
    }

    private loadScript(resource: MicrofrontendResource): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = resource.href;
            script.setAttribute('async', ""); // load async by default
            resource.attributes && Object.entries(resource.attributes).forEach(([name, value]) => {
                script.setAttribute(name, value);
            });
            const cspNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
            if (cspNonce) {
                script.setAttribute('nonce', cspNonce);
            }

            this.loadedResources.add(resource.href);
            if (resource.waitOnLoad) {
                script.onload = () => {
                    resolve();
                }
            } else {
                resolve();
            }
            script.onerror = () => {
                this.loadedResources.delete(resource.href);
                reject();
            }
            document.head.appendChild(script);
        });
    }

    private loadStylesheet(resource: MicrofrontendResource): Promise<void> {
        return this.loadLink({
            ...resource,
            attributes: { ...resource.attributes, rel: "stylesheet" }
        });
    }

    private loadLink(resource: MicrofrontendResource): Promise<void> {
        const link = document.createElement('link');
        link.href = resource.href;
        link.setAttribute('async', "");
        const cspNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
        if (cspNonce) {
            link.setAttribute('nonce', cspNonce);
        }
        resource.attributes && Object.entries(resource.attributes).forEach(([name, value]) => {
            link.setAttribute(name, value);
        });
        return new Promise<void>((resolve, reject) => {
            this.loadedResources.add(resource.href);
            if (resource.waitOnLoad) {
                link.onload = () => {
                    resolve();
                }
            } else {
                resolve();
            }
            link.onerror = () => {
                this.loadedResources.delete(resource.href);
                reject();
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
        let duplicitCustomElements: string = "warn";
        if (metaTagContent === "silent") {
            duplicitCustomElements = "silent";
        } else if (metaTagContent === "error") {
            duplicitCustomElements = "error";
        } else if (metaTagContent === "verbose") {
            duplicitCustomElements = "verbose";
        }

        function safeDecorator(fn) {
            // eslint-disable-next-line func-names
            if (fn.overrider === "polyfea") return fn;
            
            const owned = function (...args) {
                if (this.get(args[0])) {
                    if (duplicitCustomElements === "error") {
                        throw new Error(`Custom element '${args[0]}' is duplicately registered`);
                    } else if (duplicitCustomElements === "warn") {
                        console.warn(`Custom element '${args[0]}' is duplicately registered - ignoring the current attempt for registration`);
                        return false;
                    }
                }
                else {
                    if (duplicitCustomElements === "verbose") {
                        console.log(`Custom element '${args[0]}' is registered`);
                    }
                    return fn.apply(this, args);
                }
            };
            owned.overrider = "polyfea";
            return owned;
        }

        customElements.define = safeDecorator(customElements.define);
    }

}



