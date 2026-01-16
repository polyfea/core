const REGISTRY_EVENT = 'polyfea-lazy-register';
const GLOBAL_KEY = '__POLYFEA_LAZY_REGISTRY__';

declare global {
  interface CustomElementRegistry {
    /**
     * Register lazy custom element. The element module will be loaded when first used in DOM.
     *
     * @param tagName tag name of the custom element
     * @param loadFn either URL string to the module to import dynamically
     *   or function returning a Promise resolving when the module is loaded (typically dynamic import).
     *   Use lambda function if you intend to use relative path.
     */
    defineLazy(tagName: string, loadFn: string | (() => Promise<unknown>)): void;
  }
}

interface LazyRegisterDetail {
  tagName: string;
  loadFn: string | (() => Promise<unknown>);
}

export class LazyCustomElements {
  #pendingElements = new Map<string, () => Promise<unknown>>();
  #observer: MutationObserver | null = null;
  #observedShadowDocs = new WeakSet<Node>();

  constructor() {
    // singleton check
    if ((window as any)[GLOBAL_KEY]) {
      return (window as any)[GLOBAL_KEY];
    }
    (window as any)[GLOBAL_KEY] = this;

    // MonkeyPatch for attachShadow to observe new Shadow DOMs
    this.#patchAttachShadow();

    window.addEventListener(REGISTRY_EVENT, (e: Event) => {
      const detail = (e as CustomEvent<LazyRegisterDetail>).detail;
      if (detail && detail.tagName && detail.loadFn) {
        this.#registerLazyElement(detail.tagName, detail.loadFn);
      }
    });

    // Sstart observing the main document
    this.#initObserver();
    this.#observeRoot(document.documentElement);
    if (!customElements.defineLazy) {
      customElements.defineLazy = this.#lazyDefineCustomElement.bind(this);
    }
  }

  /**
   * "Monkey Patch" attachShadow.
   * Allows to observe newly created Shadow DOMs.
   */
  #patchAttachShadow() {
    const originalAttachShadow = Element.prototype.attachShadow;
    const self = this;

    Element.prototype.attachShadow = function (init: ShadowRootInit) {
      const shadowRoot = originalAttachShadow.call(this, init);
      if (self.#pendingElements.size > 0) {
        self.#observeRoot(shadowRoot);
      }
      return shadowRoot;
    };
  }

  #registerLazyElement(tagName: string, loadFn: string | (() => Promise<unknown>)) {
    const upperTag = tagName.toUpperCase();

    if (customElements.get(tagName)) {
      return; // Already exists
    }

    let loader: () => Promise<unknown> = loadFn as () => Promise<unknown>;
    if (typeof loadFn === 'string' || loadFn instanceof String) {
      const src = loadFn as unknown as string;
      loader = () => import(/* @vite-ignore */ src);
    }

    this.#pendingElements.set(upperTag, loader);

    // Deep check: lookup if element already exists in DOM (including Shadow DOMs)
    if (this.#deepQuerySelector(upperTag)) {
      this.#loadAndDefine(upperTag);
      return;
    }

    // wake up the observer
    if (!this.#observer) {
      this.#initObserver();
      this.#observeAllKnownRoots();
    }
  }

  #deepQuerySelector(tagName: string, root: Node = document): Element | null {
    if (root instanceof Document || root instanceof Element || root instanceof ShadowRoot) {
      const found = (root as ParentNode).querySelector(tagName);
      if (found) return found;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);

    while (walker.nextNode()) {
      const el = walker.currentNode as Element;
      if (el.shadowRoot) {
        const foundInShadow = this.#deepQuerySelector(tagName, el.shadowRoot);
        if (foundInShadow) return foundInShadow;
      }
    }
    return null;
  }

  #initObserver() {
    if (this.#observer || this.#pendingElements.size === 0) return;

    this.#observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as Element;
              const tag = el.tagName;
              if (this.#pendingElements.has(tag)) {
                this.#loadAndDefine(tag);
              }

              // Check inserted children (deep)
              if ((el as any).querySelectorAll) {
                for (const tag of this.#pendingElements.keys()) {
                  // patched addShadow will observe eventual shadowDoMs
                  if (el.querySelector(tag)) {
                    this.#loadAndDefine(tag);
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  #observeRoot(root: Node) {
    if (!this.#observer || this.#observedShadowDocs.has(root)) return;

    this.#observer.observe(root, {
      childList: true,
      subtree: true,
    });
    this.#observedShadowDocs.add(root);
  }

  #observeAllKnownRoots() {
    this.#observeRoot(document.documentElement);

    const findRoots = (node: Node) => {
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, null);
      while (walker.nextNode()) {
        const el = walker.currentNode as Element;
        if (el.shadowRoot) {
          this.#observeRoot(el.shadowRoot);
          findRoots(el.shadowRoot);
        }
      }
    };

    findRoots(document);
  }

  #stopObserver() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
      this.#observedShadowDocs = new WeakSet();
    }
  }

  #loadAndDefine(upperTagName: string) {
    const loadFn = this.#pendingElements.get(upperTagName);

    if (loadFn) {
      this.#pendingElements.delete(upperTagName);
      if (this.#pendingElements.size === 0) {
        this.#stopObserver();
      }
      loadFn().catch(err => {
        console.error(
          `[polyfea] error to load custom element  <${upperTagName}> implementation:`,
          err,
        );
      });
    }
  }

  #lazyDefineCustomElement(tagName: string, loadFn: string | (() => Promise<unknown>)) {
    if (!tagName || !loadFn) {
      throw new Error('Both tagName and loadFn are required for defineLazy');
    }
    if (
      (typeof loadFn === 'string' || loadFn instanceof String) &&
      (loadFn as string).startsWith('.')
    ) {
      console.warn(
        `[polyfea] Warning: using relative path string for loadFn in defineLazymay lead to unexpected results. Use lambda function returning dynamic import instead.`,
      );
    }
    // enforce singleton pattern and loose coupling by event dispatching instead of direct method call
    window.dispatchEvent(
      new CustomEvent<LazyRegisterDetail>(REGISTRY_EVENT, {
        detail: { tagName, loadFn },
      }),
    );
  }
}
