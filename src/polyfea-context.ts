import { Polyfea } from '.';
import {
  switchMap,
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  catchError,
  of,
  tap,
  map,
  Observable,
  from,
  forkJoin,
} from 'rxjs';
import { type ContextArea, type ElementSpec } from '@polyfea/browser-api';

/**
 * This component uses the Polyfea interface to load a context area, dynamically render its elements,
 * and load the resources for the associated microfrontend before rendering the elements.
 * If the context area cannot be retrieved or it has no elements, the slotted content is displayed instead.
 *
 *
 * @slot - The slotted content is displayed if the context area  has no elements.
 * @slot error - This slot is present if an error occurs during context area retrieval or loading of dependencies, together with setting error attribute
 *   on the polyfea-context element
 * 
 * @remarks For more details on the ContextArea type, refer to the @polyfea/browser-api package documentation.
 * The path for context area requests is relative to document.baseURI.
 *
 */
export class PolyfeaContext extends HTMLElement {
  /** Defines the custom element 'polyfea-context' if not already defined **/
  static define() {
    if (!customElements.get('polyfea-context')) {
      customElements.define('polyfea-context', PolyfeaContext);
    }
  }

  /** @ignore */
  static observedAttributes = [
    'context-name',
    'name',
    'take',
    'extra-attributes',
    'extra-style',
    'verbosity',
  ];

  /** Verbosity level silent 
   * @see verbosity 
   **/
  static readonly VERBOSITY_SILENT = 'silent';

  /** Verbosity level error 
   * @see verbosity 
   **/
  static readonly VERBOSITY_ERROR = 'error';

  /** Verbosity level verbose 
   * @see verbosity 
   **/
  static readonly VERBOSITY_VERBOSE = 'verbose';

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set
   *
   * @attr context-name
   **/
  set contextName(name: string) {
    this.setAttribute('context-name', name);
  }

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set
   *
   * @attr context-name
   **/
  get contextName(): string {
    let name = this.getAttribute('context-name');
    if (!name) {
      name = this.getAttribute('name');
    }
    return name || '';
  }

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set
   *
   * @attr name
   **/
  set name(name: string) {
    this.setAttribute('context-name', name);
    this.setAttribute('name', name);
  }

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set
   *
   * @attr name
   **/
  get name(): string {
    let name = this.getAttribute('context-name');
    if (!name) {
      name = this.getAttribute('name');
    }
    return name || '';
  }

  /**
   * Specifies the number of context area elements to render.
   * If this property is unset or has a non-positive value, all configured
   * elements will be rendered.
   *
   * @attr take
   */
  get take(): number {
    const takeStr = this.getAttribute('take');
    if (takeStr) {
      return parseInt(takeStr);
    }
    return 0;
  }

  /**
   * Specifies the number of context area elements to render.
   * If this property is unset or has a non-positive value, all configured
   * elements will be rendered.
   *
   * @attr take
   */
  set take(take: number) {
    this.setAttribute('take', (take || 0).toString());
  }

  /**
   * Defines additional attributes to be set on the rendered elements.
   *
   * @remarks The attributes are set in the following order:
   *
   * 1. The `context` attribute, with its value set to the `name` property.
   * 2. The attributes defined in the element specification of the context area.
   * 3. The attributes defined in this property.
   *
   * @attr extra-attributes
   */
  get extraAttributes(): { [key: string]: string } {
    const attrStr = this.getAttribute('extra-attributes');
    if (attrStr) {
      return JSON.parse(attrStr);
    }
    return {};
  }

  /**
   * Defines additional attributes to be set on the rendered elements.
   *
   * @remarks The attributes are set in the following order:
   *
   * 1. The `context` attribute, with its value set to the `name` property.
   * 2. The attributes defined in the element specification of the context area.
   * 3. The attributes defined in this property.
   *
   * @attr extra-attributes
   */
  set extraAttributes(attrs: { [key: string]: string }) {
    this.setAttribute('extra-attributes', JSON.stringify(attrs));
  }

  /**
   * Additional style properties to be set on the rendered elements.
   *
   * @remarks The style properties are set in the following order:
   *
   * 1. Style properties defined in the element specification of the context area.
   * 2. Style properties defined in this property.
   *
   * @attr extra-style
   */
  set extraStyle(style: { [key: string]: string | number }) {
    this.setAttribute('extra-style', JSON.stringify(style));
  }

  /**
   * Additional style properties to be set on the rendered elements.
   *
   * @remarks The style properties are set in the following order:
   * 1. Style properties defined in the element specification of the context area.
   * 2. Style properties defined in this property.
   *
   * @attr extra-style
   */
  get extraStyle(): { [key: string]: string | number } {
    const styleStr = this.getAttribute('extra-style');
    if (styleStr) {
      try {
        return JSON.parse(styleStr);
      } catch (e) {
        return styleStr.split(';').reduce(
          (acc, style) => {
            const index = style.indexOf(':');
            if (index > 0) {
              const key = style.substring(0, index).trim();
              const value = style.substring(index + 1).trim();
              if (key) acc[key] = value;
            }
            return acc;
          },
          {} as { [key: string]: string | number },
        );
      }
    }
    return {};
  }

  /** The verbosity level of the component.
   *
   * - `silent`: No logs or warnings are produced.
   * - `error`: Only warnings about errors during context area loading are produced. This is the default level.
   * - `verbose`: Detailed logs about context area loading and microfrontend loading are produced.
   *
   * The verbosity level can also be set globally using a meta tag in the document head:
   * `<meta name="polyfea.context-verbosity" content="silent|error|verbose">`
   *
   * @attr verbosity
   */
  get verbosity(): string {
    let v = this.getAttribute('verbosity');
    if (v === null) {
      v =
        document.head
          .querySelector("meta[name='polyfea.context-verbosity']")
          ?.getAttribute('content') || PolyfeaContext.VERBOSITY_ERROR;
    }
    return v;
  }

  /** The verbosity level of the component.
   *
   * - `silent`: No logs or warnings are produced.
   * - `error`: Only warnings about errors during context area loading are produced. This is the default level.
   * - `verbose`: Detailed logs about context area loading and microfrontend loading are produced.
   *
   * The verbosity level can also be set globally using a meta tag in the document head:
   * `<meta name="polyfea.context-verbosity" content="silent|error|verbose">`
   *
   * @attr verbosity
   */
  set verbosity(v: string) {
    this.setAttribute('verbosity', v);
  }

  /** If an error occurs during context area retrieval or loading of dependencies,
   *  this attribute is set with the error message. Otherwise, it is null.
   *
   * @attr error
   **/
  get error(): string | null {
    return this.getAttribute('error');
  }


  /** used internally to detect cyclic context areas
   * @ignore
   **/
  public polyfeaContextStack: string[] | null = null;

  /** @ignore */
  #scheduled: boolean = false;

  /** @ignore */
  get #extraPrefixedAttributes(): { [key: string]: string } {
    return Object.fromEntries(
      Array.from(this.attributes)
        .filter(
          attr =>
            attr.name.startsWith('extra-') &&
            attr.name != 'extra-attributes' &&
            attr.name != 'extra-style',
        )
        .map(attr => [attr.name.slice(6), attr.value]),
    );
  }

  /** @ignore */
  #elements$: BehaviorSubject<ElementSpec[]> = new BehaviorSubject<ElementSpec[]>([]);

  /** @ignore */
  #contextName$: Subject<string> = new Subject<string>();

  /** @ignore */
  #take$: Subject<number> = new BehaviorSubject<number>(0);

  /** @ignore */
  get #elements(): ElementSpec[] {
    return this.#elements$.getValue();
  }

  /** @ignore */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.#contextName$
      .pipe(
        distinctUntilChanged(), // no reloading if contextName is not changed
        map(ctx => {
          const [ctx0, err] = this.#checkCyclicContext(ctx); // test cycles and propagate errors
          return [ctx0, err] as [string, string];
        }),
        switchMap(
          (
            [ctx, err], // load context area and propagate error
          ) =>
            this.#loadContextElements(ctx).pipe(
              map(([loadedCtx, loadErr]) => {
                let finalErr = err;
                if (loadErr) {
                  finalErr = loadErr;
                }
                return [loadedCtx, finalErr] as [ContextArea | null, string];
              }),
            ),
        ),
        switchMap(
          (
            [ctx, err], // load microfrontends and propagate error
          ) =>
            this.#loadMicrofrontends(ctx).pipe(
              map(errs => {
                err = [err, ...errs.map(e => e?.toString() || '')].filter(e => e).join('; ');
                return [ctx, err] as [ContextArea | null, string];
              }),
            ),
        ),
        tap(([_c, err]) => {
          // set error attribute if any error
          if (err) {
            this.setAttribute('error', err);
          } else {
            this.removeAttribute('error');
          }
        }),
        switchMap(([ctx]) =>
          this.#take$.pipe(
            // combine with take changes
            map(take => [ctx, take] as [ContextArea | null, number]),
          ),
        ),
        map(([ctx, take]): ElementSpec[] => {
          // extract elements
          let elements = ctx?.elements || new Array<ElementSpec>();
          if (take > 0) {
            elements = elements.slice(0, take);
          }
          return elements;
        }),
      )
      .subscribe(this.#elements$);
    this.#elements$.subscribe(_ => {
      // schedule render on elements change
      this.#scheduleRender();
    });
  }

  /** @ignore */
  connectedCallback() {}

  /** @ignore */
  disconnectedCallback() {
    this.polyfeaContextStack = null;
    this.removeAttribute('error');
    this.contextName = '';
  }

  /** @ignore */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      if (name === 'context-name' || name === 'name') {
        this.#contextName$.next(this.contextName);
      } else if (name === 'take') {
        this.#take$.next(this.take);
      } else if (name.startsWith('extra-')) {
        this.#scheduleRender();
      }
    }
  }
  
  /** @ignore */
  #scheduleRender() {
    if (this.#scheduled) return;
    this.#scheduled = true;
    requestAnimationFrame(() => {
      this.#render();
      this.#scheduled = false;
    });
  }

  /** @ignore */
  #checkCyclicContext(name: string): [string, string] {
    this.polyfeaContextStack = [];

    // find closest parent with property polyfeaContextStack to avoid cyclic context
    let currentNode: Node | null = this;
    let stack: string[] | null = null;
    while (stack === null && currentNode && (currentNode as any).tagName !== 'BODY') {
      if (currentNode instanceof ShadowRoot) {
        currentNode = (currentNode as ShadowRoot).host;
      } else {
        currentNode = currentNode.parentNode;
      }
      stack = (currentNode as any)?.polyfeaContextStack || null;
    }
    stack = stack || [];
    this.polyfeaContextStack = [...stack, name];
    if (stack.indexOf(name) >= 0) {
      if (this.verbosity !== PolyfeaContext.VERBOSITY_SILENT) {
        console.warn(
          `[Polyfea]: <polyfea-context name="${this.contextName}">: ` +
            `Cyclic context areas detected: ` +
            `${this.polyfeaContextStack.join(' -> ')}`,
        );
      }
      return ['', 'Cyclic context areas detected'];
    }

    return [name, '']; // Return an empty error string
  }

  /** @ignore */
  #loadContextElements(name: string): Observable<[ContextArea | null, string]> {
    if (name) {
      const polyfea = Polyfea.getOrCreate();
      if (this.verbosity === PolyfeaContext.VERBOSITY_VERBOSE) {
        console.log(
          `[Polyfea]: <polyfea-context name="${this.contextName}">: ` +
            `Loading context ${this.polyfeaContextStack?.join(' -> ')}`,
        );
      }
      return polyfea.getContextArea(name).pipe(
        map(ctx => {
          return [ctx, ''] as [ContextArea | null, string];
        }),
        catchError(err => {
          if (this.verbosity !== PolyfeaContext.VERBOSITY_SILENT) {
            console.warn(
              `[Polyfea]: <polyfea-context name="${this.contextName}">: ` +
                ` Failed to load context area spec because of error: ` +
                `${err} (at: ${this.polyfeaContextStack?.join(' -> ')})`,
            );
          }
          return of([null, `Failed to load context area spec: ${err}`] as [
            ContextArea | null,
            string,
          ]);
        }),
      );
    } else {
      return of([null, ''] as [ContextArea | null, string]);
    }
  }

  /** @ignore */
  #loadMicrofrontends(ctx: ContextArea | null): Observable<Error[]> {
    if (!ctx) return of([]);

    let loaders = (ctx.elements || [])
      .slice(0, this.take > 0 ? this.take : ctx.elements.length)
      .map(el => {
        if (el.microfrontend) {
          if (this.verbosity === PolyfeaContext.VERBOSITY_VERBOSE) {
            console.log(
              `[Polyfea]: <polyfea-context name="${this.contextName}">: ` +
                `Loading microfrontend '${el.microfrontend}' for element <${el.tagName}>`,
            );
          }
          return from(Polyfea.getOrCreate().loadMicrofrontend(ctx, el.microfrontend)).pipe();
        } else {
          return of([]);
        }
      });
    if (loaders.length === 0) {
      return of([]); // enforce at least one event to enable rerender
    }
    return forkJoin(loaders).pipe(map(errs => errs.flat()));
  }

  /** @ignore */
  #render() {
    this.#renderHostStyles();

    const existingElements = Array.from(this.shadowRoot!.children).filter(
      el => el.tagName !== 'STYLE' && el.tagName !== 'SLOT',
    );

    // reconcile elements
    this.#elements.forEach((elementData, index) => {
      let el = existingElements.length > index ? existingElements[index] : null;
      this.#reconcileElement(elementData, el, index);
    });

    // remove extra elements
    if (existingElements.length > this.#elements.length) {
      for (let i = this.#elements.length; i < existingElements.length; i++) {
        existingElements[i].remove();
      }
    }
    this.#renderSlots();
  }

  #renderHostStyles() {
    let styleEl = this.shadowRoot!.querySelector('style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      const nonce =
        (globalThis as any).cspNonce ||
        document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
      if (nonce) {
        styleEl.setAttribute('nonce', nonce);
      }
      styleEl.textContent = ':host { display: contents; }';
      this.shadowRoot!.prepend(styleEl);
    }
  }

  #reconcileElement(elementData: ElementSpec, existing: Element | null, index: number) {
    let connectElement = () => {}; // deffer connection after attributes and styles are set
    // create or replace element if tagName differs

    if (!existing || existing.tagName !== elementData.tagName.toUpperCase()) {
      const newEl = document.createElement(elementData.tagName);
      if (existing) {
        this.shadowRoot!.replaceChild(newEl, existing);
      } else {
        const slot = this.shadowRoot!.querySelector('slot');
        if (slot) {
          connectElement = () => {
            this.shadowRoot!.insertBefore(newEl, slot);
          };
        } else {
          connectElement = () => {
            this.shadowRoot!.appendChild(newEl);
          };
        }
      }
      existing = newEl;
    }

    const attrs = {
      id: (this.id || this.contextName) + `-${elementData.tagName}-${index}`,
      context: `${this.contextName}`,
      ...elementData.attributes,
      ...this.#extraPrefixedAttributes,
      ...this.extraAttributes,
    };

    // sync attribute values
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const strValue = String(value);
        if (existing.getAttribute(key) !== strValue) {
          existing.setAttribute(key, strValue);
        }
      }
    });

    // remove extra attributes
    Array.from(existing.attributes).forEach(attr => {
      if (!(attr.name in attrs)) {
        existing.removeAttribute(attr.name);
      }
    });

    // sync styles
    existing.removeAttribute('style');

    let styleObj = Object.assign({}, elementData.style, this.extraStyle);
    Object.entries(styleObj).forEach(([key, value]) => {
      if (key && value !== undefined && value !== null) {
        const propName = key.trim();
        let propValue = String(value).trim();
        while (propValue.endsWith(';')) {
          propValue = propValue.slice(0, -1).trim();
        }

        if (propName.startsWith('--')) {
          (existing as HTMLElement).style.setProperty(propName, propValue);
        } else {
          const cssName = propName.replace(/[A-Z]/g, '-$&').toLowerCase(); //camelCase to kebab-case
          (existing as HTMLElement).style.setProperty(cssName, propValue);
        }
      }
    });

    connectElement();
  }

  #renderSlots() {
    // default a error slot
    const existingDefaultSlot = this.shadowRoot!.querySelector('slot:not([name])');
    const existingErrorSlot = this.shadowRoot!.querySelector("slot[name='error']");

    // Default Slot Logic
    if (!this.#elements.length && !this.error) {
      if (!existingDefaultSlot) {
        if (this.verbosity === PolyfeaContext.VERBOSITY_VERBOSE) {
          console.log(
            `[Polyfea]: <polyfea-context name="${this.contextName}">: No elements in context area, rendering slotted content.`,
          );
        }
        const slot = document.createElement('slot');
        this.shadowRoot!.appendChild(slot);
      }
    } else {
      if (existingDefaultSlot) {
        existingDefaultSlot.remove();
      }
    }

    // Error Slot Logic
    if (this.error) {
      if (!existingErrorSlot) {
        const slot = document.createElement('slot');
        slot.name = 'error';
        this.shadowRoot!.appendChild(slot);
      }
    } else {
      if (existingErrorSlot) {
        existingErrorSlot.remove();
      }
    }
  }
  
}
