import { AsyncSubject, Subject, firstValueFrom } from 'rxjs';

declare global {
  interface globalThis {
    navigation: Navigation;
  }
}

const noop = () => {};

/**
 * The Navigation interface represents the state and the methods to manipulate the browser session history.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation}
 */
export interface Navigation extends EventTarget {
  /**
   * Represents the current entry in the session history.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/currentEntry}
   */
  readonly currentEntry: NavigationHistoryEntry;

  /**
   * Returns a Boolean indicating whether the session history contains a previous entry, meaning that the "back" method can be used.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoBack}
   */
  readonly canGoBack: boolean;

  /**
   * Returns a Boolean indicating whether the session history contains a next entry, meaning that the "forward" method can be used.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoForward}
   */
  readonly canGoForward: boolean;

  /**
   * Represents the current navigation transition.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/transition}
   */
  readonly transition: NavigationTransistion;

  /**
   * Returns an array of all entries in the session history.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/entries}
   */
  entries(): NavigationHistoryEntry[];

  /**
   * Navigates to the specified URL.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate}
   */
  navigate(
    destination: string | URL,
    options?: {
      state?: any;
      info?: any;
      history?: 'auto' | 'replace' | 'push';
      replace?: boolean;
    },
  ): { commited: Promise<void>; finished: Promise<void> };

  /**
   * Navigates to the previous entry in the session history, if there is one.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/back}
   */
  back(): { commited: Promise<void>; finished: Promise<void> };

  /**
   * Navigates to the next entry in the session history, if there is one.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/forward}
   */
  forward(info?: any): { commited: Promise<void>; finished: Promise<void> };

  /**
   * Reloads the current entry in the session history.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/reload}
   */
  reload(info?: any): { commited: Promise<void>; finished: Promise<void> };

  /**
   * Navigates to a specific entry in the session history.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/traverseTo}
   */
  traverseTo(
    key: string,
    options?: { info: any },
  ): { commited: Promise<void>; finished: Promise<void> };

  /**
   * Updates the current entry in the session history.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation/updateCurrentEntry}
   */
  updateCurrentEntry(options?: { state: any }): void;
}

/**
 * The NavigationDestination class represents a destination in navigation.
 *
 * For general information about navigation on the web, see:
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation}
 */
export class NavigationDestination {
  /**
   * Constructs a new NavigationDestination instance.
   * @param url - The URL of the navigation destination.
   */
  constructor(url: string) {
    this.url = url;
  }

  /** The URL of the navigation destination. */
  url: string;
}

/** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
 **/
export class NavigateEvent extends Event {
  interceptPromises: Promise<void>[] = [];
  private transition: TransitionRequest;

  constructor(transition: TransitionRequest, from: NavigationHistoryEntry) {
    super('navigate', { bubbles: true, cancelable: true });
    this.transition = transition;

    let rebased = new URL(
      transition.href,
      new URL(globalThis.document.baseURI, globalThis.location.href),
    );
    const fromUrl = new URL(
      from?.url || '',
      new URL(globalThis.document.baseURI, globalThis.location.href),
    );

    this.canIntercept =
      fromUrl.protocol === rebased.protocol &&
      fromUrl.host === rebased.host &&
      fromUrl.port === rebased.port;
    this.destination = new NavigationDestination(rebased.href);
  }

  /** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
   **/
  readonly destination: NavigationDestination;

  /** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
   **/
  readonly canIntercept: boolean;

  /** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
   *  always null in this polyfill
   **/
  readonly downloadRequest: string | null = null;

  /** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
   *  always null in this polyfill
   **/
  readonly formData: FormData | null = null;

  /** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
   *  always false in this polyfill
   **/
  readonly hashChange: boolean = false;

  /** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
   *  always false in this polyfill
   **/
  readonly userInitiated: boolean = false;

  /** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
   *  this polyfill signals abort only on programatic navigation
   **/
  get signal(): AbortSignal {
    return this.transition.abortController.signal;
  }

  /**
   * Prevents the browser from following the navigation request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/intercept}
   */
  intercept(options?: {
    handler?: (event: Event) => Promise<void>;
    focusReset?: 'after-transition' | 'manual';
    scroll?: 'after-transition' | 'manual';
  }) {
    if (options?.handler) {
      try {
        const p = options.handler(this);
        this.interceptPromises.push(p);
      } catch (error) {
        this.interceptPromises.push(Promise.reject(error));
      }
    }
  }
}

/** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigationCurrentEntryChangeEvent ) */
export class NavigationCurrentEntryChangeEvent extends Event {
  readonly navigationType: TransitionMode;
  readonly from: NavigationHistoryEntry;
  constructor(navigationType: TransitionMode, from: NavigationHistoryEntry) {
    super('currententrychange', { bubbles: true, cancelable: true });
    this.navigationType = navigationType;
    this.from = from;
  }
}

/** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigationHistoryEntry ) */
export interface NavigationHistoryEntry extends EventTarget {
  id: string;
  index: number;
  key: string;
  sameDocument: boolean;
  url: string;

  getState(): any;
}

type TransitionMode = 'push' | 'replace' | 'reload' | 'traverse';

/** (@see https://developer.mozilla.org/en-US/docs/Web/API/NavigationTransition ) */
export interface NavigationTransistion {
  finished: Promise<void>;
  from: NavigationHistoryEntry;
  navigationType: TransitionMode;
}

class NavigationTransitionPolyfill implements NavigationTransistion {
  private readonly request: TransitionRequest;
  constructor(request: TransitionRequest) {
    this.request = request;
  }
  get finished() {
    return firstValueFrom(this.request.finished);
  }
  get from() {
    return this.request.entry;
  }
  get navigationType() {
    return this.request.mode;
  }
}

/**
 * The `registerNavigationPolyfill` function is used to register the (Navigation API)[https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API] Polyfill
 * if it is not provided on the window.
 *
 * @remarks
 *
 * The polyfill supports programmatic navigation via the Navigation or History API, but can't capture user-initiated navigation. It's a compromise between
 * a full polyfill and native implementation, allowing SPA developers to use Navigation API events for navigation logic, while augmenting elements with
 * programmatic handlers to capture navigation requests.
 *
 * @param raiseHistoryPopState - A boolean indicating whether to raise the 'popstate' event on the window object when the history changes. Default is `false`.
 * It is useful if you want to get popstate notification on history.pushstate but is nonstandard behavior.
 */
export function registerNavigationPolyfill(raiseHistoryPopState = false) {
  return NavigationPolyfill.tryRegister(raiseHistoryPopState);
}

/**
 * The `unregisterNavigationPolyfill` function is used to remove  (Navigation API)[https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API] Polyfill
 * if it is provided on the window. Used in tests to clean up the global state.
 */
export function unregisterNavigationPolyfill() {
  NavigationPolyfill.unregister();
}

interface TransitionRequest {
  committed: AsyncSubject<void>;
  finished: AsyncSubject<void>;
  mode: TransitionMode;
  href: string;
  info?: any;
  state?: any;
  entry: NavigationHistoryEntryPolyfill;
  abortController: AbortController;
  transition: NavigationTransistion | null;
  traverseToKey: string;
}

class TransitionSubscriber {
  private readonly commited$: AsyncSubject<void>;
  private readonly finished$: AsyncSubject<void>;
  constructor(request: TransitionRequest) {
    this.commited$ = request.committed;
    this.finished$ = request.finished;
  }

  get commited() {
    return firstValueFrom(this.commited$);
  }
  get finished() {
    return firstValueFrom(this.finished$);
  }
}

class NavigationPolyfill extends EventTarget {
  entries(): NavigationHistoryEntry[] {
    return this.entriesList;
  }

  get currentEntry(): NavigationHistoryEntry | undefined {
    if (this.currentEntryIndex >= 0) return this.entriesList[this.currentEntryIndex];
    return undefined;
  }

  get canGoBack(): boolean {
    return this.currentEntryIndex > 0;
  }

  get canGoForward(): boolean {
    return this.currentEntryIndex + 1 < this.entriesList.length;
  }

  get transition() {
    return this.currentTransition?.transition || null;
  }

  navigate(
    destination: string | URL,
    options?: {
      state?: any;
      info?: any;
      history?: 'auto' | 'replace' | 'push';
      replace?: boolean;
    },
  ) {
    let mode: TransitionMode =
      options?.history === 'replace' || options?.replace ? 'replace' : 'push';
    return this.nextTransitionRequest(mode, destination, options);
  }

  back() {
    if (this.currentEntryIndex < 1) {
      throw { name: 'InvaliStateError', message: 'Cannot go back from initial state' };
    }
    return this.nextTransitionRequest('traverse', this.currentEntry!.url, {
      traverseTo: this.entriesList[this.currentEntryIndex - 1].key,
    });
  }

  forward(info?: any) {
    return this.nextTransitionRequest('traverse', this.currentEntry!.url, {
      info,
      traverseTo: this.entriesList[this.currentEntryIndex + 1].key,
    });
  }

  reload(info?: any) {
    return this.nextTransitionRequest('reload', this.currentEntry!.url, { info });
  }

  traverseTo(key: string, options?: { info: any }) {
    const entry = this.entriesList.find(_ => _.key === key);
    if (!entry) throw { name: 'InvaliStateError', message: 'Cannot traverse to unknown state' };
    return this.nextTransitionRequest('traverse', entry.url, {
      info: options?.info,
      traverseTo: key,
    });
  }

  updateCurrentEntry(options?: { state: any }) {
    this.entriesList[this.currentEntryIndex].setState(JSON.parse(JSON.stringify(options?.state)));
    this.dispatchEvent(
      new NavigationCurrentEntryChangeEvent('replace', this.currentEntry!),
    );
  }

  public entriesList: Array<NavigationHistoryEntryPolyfill> = [];
  private idCounter: number = 0;
  private transitionRequests = new Subject<TransitionRequest>();
  private currentTransition: TransitionRequest | null = null;
  private currentEntryIndex: number = -1;
  private doUnregister: () => void = noop;
  private readonly pushstateDelay = 35;

  private rawHistoryMethods = {
    pushState: globalThis.history.pushState,
    replaceState: globalThis.history.replaceState,
    go: globalThis.history.go,
    back: globalThis.history.back,
    forward: globalThis.history.forward,
  };

  private constructor() {
    super();
    this.transitionRequests.subscribe(_ => this.executeRequest(_));
  }

  private nextTransitionRequest(
    mode: TransitionMode,
    destination: string | URL,
    options?: { state?: any; info?: any; traverseTo?: string },
  ): { commited: Promise<void>; finished: Promise<void> } {
    const id = `@${++this.idCounter}-navigation-polyfill-transition`;
    const request: TransitionRequest = {
      mode,
      href: new URL(destination, new URL(globalThis.document.baseURI, globalThis.location.href))
        .href,
      info: options?.info,
      state: options?.state,

      committed: new AsyncSubject<void>(),
      finished: new AsyncSubject<void>(),
      entry: new NavigationHistoryEntryPolyfill(
        this,
        id,
        id,
        destination.toString(),
        options?.state,
      ),
      abortController: new AbortController(),
      traverseToKey: options?.traverseTo || '',
      transition: null,
    };
    setTimeout(() => {
      this.transitionRequests.next(request);
    }, 0);
    return new TransitionSubscriber(request);
  }

  private async executeRequest(request: TransitionRequest) {
    if (this.currentTransition) {
      this.currentTransition.abortController.abort();
      this.currentTransition.finished.error('aborted - new navigation started');
      if (!this.currentTransition.committed.closed) {
        this.currentTransition.committed.error('aborted - new navigation started');
      }
      globalThis.navigation!.dispatchEvent(
        new ErrorEvent('navigateerror', {
          bubbles: true,
          cancelable: true,
          error: Error('aborted - new navigation started'),
        }),
      );
      this.clearTransition(request);
    }

    request.transition = new NavigationTransitionPolyfill(request);
    this.currentTransition = request;

    try {
      await this.commit(request);
      this.dispatchEvent(
        new NavigationCurrentEntryChangeEvent(request.mode, request.transition.from),
      );
      await this.dispatchNavigation(request);
    } catch (ex) {
      request.finished.error('aborted');
      request.committed.error('aborted');
    } finally {
      this.clearTransition(request);
    }
  }

  private dispatchNavigation(request: TransitionRequest): Promise<void> {
    const event = new NavigateEvent(request, this.currentEntry!);
    try {
      if (!globalThis.navigation?.dispatchEvent(event)) {
        return Promise.reject('navigation event cancelled by preventDefault');
      }
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.all(event.interceptPromises.filter(_ => !!_?.then))
      .then(() => {
        globalThis.navigation!.dispatchEvent(
          new Event('navigatesuccess', { bubbles: true, cancelable: true }),
        );
        this.clearTransition(request);
        request.finished.next();
        request.finished.complete();
      })
      .catch((reason: any) => {
        globalThis.navigation!.dispatchEvent(
          new ErrorEvent('navigateerror', { bubbles: true, cancelable: true, error: reason }),
        );
        this.clearTransition(request);
        request.finished.error(reason);
      });
  }

  private clearTransition(request: TransitionRequest) {
    if (this.currentTransition?.entry.id === request.entry.id) {
      this.currentTransition = null;
    }
  }

  private commit(request: TransitionRequest): Promise<void> {
    switch (request.mode) {
      case 'push':
        return this.commitPushTransition(request);
      case 'replace':
        return this.commitReplaceTransition(request);
      case 'reload':
        return this.commitReloadTransition(request);
      case 'traverse':
        return this.commitTraverseTransition(request);
    }
  }

  private async pushstateAsync(
    request: TransitionRequest,
    commitActor: (request: TransitionRequest) => void = () => {},
  ): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
      setTimeout(() => {
        commitActor(request);
        request.committed.next();
        request.committed.complete();
        resolve();
      }, this.pushstateDelay);
    });
  }
  private commitPushTransition(request: TransitionRequest): Promise<void> {
    this.rawHistoryMethods.pushState.apply(globalThis.history, [
      request.entry.cloneable,
      '',
      request.href,
    ]);
    return this.pushstateAsync(request, request => {
      this.entriesList = [...this.entriesList.slice(0, ++this.currentEntryIndex), request.entry];
    });
  }

  private commitReplaceTransition(request: TransitionRequest): Promise<void> {
    request.entry.key = this.currentEntry!.key;
    this.entriesList[this.currentEntryIndex] = request.entry;

    this.rawHistoryMethods.replaceState.apply(globalThis.history, [
      request.entry.cloneable,
      '',
      request.href,
    ]);
    return this.pushstateAsync(request);
  }

  private commitTraverseTransition(request: TransitionRequest): Promise<void> {
    return new Promise<void>(async (resolve, _) => {
      const targetEntryIndex = this.entriesList.findIndex(_ => _.key === request.traverseToKey);
      // entry existence verification is done in traverseTo method
      const delta = targetEntryIndex - this.currentEntryIndex;
      this.rawHistoryMethods.go.apply(globalThis.history, [delta]);
      await this.pushstateAsync(request, request => {
        const targetEntryIndex = this.entriesList.findIndex(_ => _.key === request.traverseToKey);
        if (targetEntryIndex < 0) {
          request.committed.error(new Error('target entry not found'));
        }
        this.currentEntryIndex = targetEntryIndex;
        request.committed.next();
        request.committed.complete();
        resolve();
      });
    });
  }

  private commitReloadTransition(request: TransitionRequest): Promise<void> {
    request.committed.next();
    request.committed.complete();
    request.finished.subscribe({
      next: () => globalThis.location.reload(),
      error: () => globalThis.location.reload(),
    });
    return Promise.resolve();
  }

  public static tryRegister(raiseHistoryPopState: boolean = false): Navigation {
    if (!globalThis.navigation) {
      const value = new NavigationPolyfill();
      value.doRegister(raiseHistoryPopState);
      return value as Navigation;
    }
    return globalThis.navigation;
  }

  public static unregister() {    
    if (globalThis.navigation && globalThis.navigation instanceof NavigationPolyfill) {
      (globalThis.navigation as NavigationPolyfill).doUnregister
        ? (globalThis.navigation as NavigationPolyfill).doUnregister()
        : null;
      globalThis.navigation = undefined;
    }
  }

  private doRegister(raiseHistoryPopState: boolean) {
    if (!globalThis.navigation) {
      globalThis.navigation = this as Navigation;
      this.entriesList = [
        new NavigationHistoryEntryPolyfill(
          this,
          'initial',
          'initial',
          globalThis.location.href,
          undefined,
        ),
      ];
      this.currentEntryIndex = 0;
      // this is mainly for the tests with jsdom or happydom that do not raise popstate event
      // on history changes

      const raw_pushState =
        globalThis.history?.pushState || noop;
      const raw_replaceState =
        globalThis.history?.replaceState || noop();
      const raw_go = globalThis.history?.go || noop;
      const raw_back = globalThis.history?.back || noop;
      const raw_forward = globalThis.history?.forward || noop;

      if (raiseHistoryPopState) {
        this.rawHistoryMethods.pushState = (...args: any) => {
          raw_pushState.apply(globalThis.history, args);
          const ev = new PopStateEvent('popstate', {
            state: this.currentTransition!.entry.cloneable,
          });
          (ev as any).state = this.currentTransition!.entry.cloneable;
          setTimeout(() => globalThis.dispatchEvent(ev), 25);
        };

        this.rawHistoryMethods.replaceState = (...args: any) => {
          raw_replaceState.apply(globalThis.history, args);
          const ev = new PopStateEvent('popstate', {
            state: this.currentTransition!.entry.cloneable,
          });
          (ev as any).state = this.currentTransition!.entry.cloneable;
          setTimeout(() => globalThis.dispatchEvent(ev), 25);
        };

        this.rawHistoryMethods.go = (...args: any) => {
          const state = this.currentTransition!.entry.cloneable;
          raw_go.apply(globalThis.history, args);
          const ev = new PopStateEvent('popstate', { state });
          (ev as any).state = state;
          setTimeout(() => globalThis.dispatchEvent(ev), 25);
        };
      } else {
        this.rawHistoryMethods = {
          pushState: raw_pushState || noop,
          replaceState:
            raw_replaceState || noop,
          go: raw_go || noop,
          back: raw_back || noop,
          forward: raw_forward || noop,
        };
      }

      if (globalThis.history) {
        globalThis.history.pushState = (data: any, _unused: string, url?: string | URL) =>
          this.navigate(url || '', { state: data, history: 'push' });

        globalThis.history.replaceState = (data: any, _unused: string, url?: string | URL) =>
          this.navigate(url || '', { state: data, history: 'replace' });

        globalThis.history.go = (delta: number) =>
          this.traverseTo(this.entriesList[this.currentEntryIndex + delta].key);

        globalThis.history.back = () => this.back();

        globalThis.history.forward = () => this.forward();
      }

      globalThis.addEventListener('popstate', this.#popStateHandler.bind(this));
      
      this.doUnregister = () => {
        globalThis.history.pushState = raw_pushState;
        globalThis.history.replaceState = raw_replaceState;
        globalThis.history.go = raw_go;
        globalThis.removeEventListener('popstate', this.#popStateHandler.bind(this));
        noop();
      };
    }
  }
  #popStateHandler(ev: PopStateEvent) {
    if (
      this.currentTransition &&
      (ev.state as NavigationHistoryEntry)?.id === this.currentTransition?.entry?.id
    ) {
      return;
    }
    this.currentTransition?.abortController.abort();

    const committed = new AsyncSubject<void>();
    committed.complete();
    let entry: NavigationHistoryEntryPolyfill | null = null;
    if (ev.state?.key) {
      const targetIndex = this.entriesList.findIndex(_ => _.key === ev.state?.key);
      if (targetIndex >= 0) {
        this.currentEntryIndex = targetIndex;
        entry = this.entriesList[targetIndex];
      }
    }
    if (!entry) {
      let id = `@${++this.idCounter}-navigation-polyfill-popstate`;
      entry = new NavigationHistoryEntryPolyfill(this, id, id, globalThis.location.href, ev.state);
      this.entriesList = [...this.entriesList.slice(0, ++this.currentEntryIndex), entry];
    }
    const finished = new AsyncSubject<void>();
    const transitionRequest: TransitionRequest = {
      mode: 'traverse',
      href: globalThis.location.href,
      info: undefined,
      state: ev.state?.state || ev.state,
      committed,
      finished,
      entry: entry,
      abortController: new AbortController(),
      traverseToKey: ev.state?.key,
      transition: null,
    };
    transitionRequest.transition = new NavigationTransitionPolyfill(transitionRequest);

    this.currentTransition = transitionRequest;
    this.dispatchNavigation(this.currentTransition).catch(noop);
  }
}

class NavigationHistoryEntryPolyfill extends EventTarget implements NavigationHistoryEntry {
  private readonly owner: NavigationPolyfill;
  public readonly id: string;
  public key: string;
  public readonly url: string;
  private state: any;

  constructor(owner: NavigationPolyfill, id: string, key: string, url: string, state: any) {
    super();
    this.key = key;
    this.state = state;
    this.owner = owner;
    this.id = id;
    this.url = url;

    this.url = new URL(url, new URL(globalThis.document.baseURI, globalThis.location.href)).href;
  }

  get index(): number {
    return this.owner.entriesList.findIndex(_ => _.id === this.id);
  }
  sameDocument: boolean = true; // polyfill is lost between documents
    
  getState() {
    return this.state;
  }

  setState(state: any) {
    this.state = state;
  }

  get cloneable() {
    return {
      id: this.id,
      key: this.key,
      url: this.url,
      index: this.index,
      state: this.state,
    };
  }
}

