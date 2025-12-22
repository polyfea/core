import { expect, test, beforeEach, afterEach, vi } from 'vitest';

import {
  NavigateEvent,
  type Navigation,
  registerNavigationPolyfill,
  unregisterNavigationPolyfill,
} from '../src/navigation';
import { href } from '../src/href';

beforeEach(() => {
  globalThis.navigation = undefined;
});

afterEach(() => {
  unregisterNavigationPolyfill();
  vi.restoreAllMocks()
});

test('navigate: ALL EVENTS invoked when navigating', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  let navSuccessCalled = false;
  sut.addEventListener('navigatesuccess', () => (navSuccessCalled = true), { once: true });
  let navCalled = false;
  sut.addEventListener('navigate', () => (navCalled = true), { once: true });
  //when

  const signals = sut.navigate('./some');
  await signals.commited;
  await signals.finished;
  await vi.waitFor(() => navCalled && navSuccessCalled);

  //then
  // all events were invoked
  expect(true).toBeTruthy();
});

test('navigate: currentRequest is null when navigation is finished', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  //when

  await sut.navigate('./some').finished;

  //then
  // all events were invoked
  expect((sut as any).currentTransition).toBeFalsy();
});

test('navigate: conflicting requests', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  //when

  sut.navigate('./some'); // do not wait the next request shall abort it
  await sut.navigate('./some').finished;

  //then
  // all events were invoked
  expect((sut as any).currentTransition).toBeFalsy();
});

test('navigate: sequence of navigations', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  await sut.navigate('./some').finished;
  await sut.navigate('./some1').finished;

  //when
  const awaiter = Promise.all([
    new Promise<void>((resolve, _) => {
      sut.addEventListener('navigatesuccess', () => resolve(), { once: true });
    }),
    new Promise<void>((resolve, reject) => {
      sut.addEventListener(
        'navigate',
        (e: Event) => {
          (e as NavigateEvent).signal.addEventListener('abort', () => reject(), { once: true });
          expect((e as NavigateEvent).type).toBeTruthy();
          expect(sut.transition?.navigationType).toBeTruthy();
          resolve();
        },
        { once: true },
      );
    }),
  ]);

  const signals = sut.navigate('./some2');

  await signals.commited;
  await signals.finished;
  await awaiter;

  //then
  // all events were invoked
  expect(true).toBeTruthy();
});

test('href: navigate raised', async () => {
  //given
  let wasIntercepted = false;

  const sut = registerNavigationPolyfill(true) as Navigation;

  sut.addEventListener(
    'navigate',
    (ev: Event) => {
      (ev as NavigateEvent).intercept();
      wasIntercepted = true;
    },
    { once: true },
  );

  const anchor = document.createElement('a');
  const ref = href('./some');

  anchor.setAttribute('href', ref.href);
  anchor.addEventListener('click', ref.onclick);
  document.body.appendChild(anchor);

  //when
  const awaiter = new Promise<void>((resolve, _) => {
    sut.addEventListener('navigatesuccess', () => resolve(), { once: true });
  });
  anchor.dispatchEvent(new Event('click'));
  await awaiter;

  //then
  expect(wasIntercepted).toBeTruthy();
  expect(sut.entries().length).toBeGreaterThan(0);
});

test('href: using history if navigation api is not available', async () => {
  //given
  let wasIntercepted = false;

  globalThis.navigation = undefined;
  const oldPushState = history.pushState;
  try {
    history.pushState = function (data: any, title: string, url?: string | null) {
      oldPushState.apply(this, [data, title, url]);
      wasIntercepted = true;
    };

    const anchor = document.createElement('a');
    const ref = href('./some');

    anchor.setAttribute('href', ref.href);
    anchor.addEventListener('click', ref.onclick);
    document.body.appendChild(anchor);

    //when
    anchor.dispatchEvent(new Event('click'));
    await vi.waitFor(() => wasIntercepted);

    //then
    expect(wasIntercepted).toBeTruthy();
  } finally {
    history.pushState = oldPushState;
  }
});

test('transition:is set to null when finished', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  sut.addEventListener('navigate', (ev: Event) => (ev as any).intercept(), { once: true });
  // when
  let request = sut.navigate('./some');
  await request.finished;
  //then
  expect(sut.transition).toBeNull();
});

test('navigate: ALL EVENTS invoked and interception handler executed when navigating', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  const interceptor = new Promise<void>(resolve =>
    sut.addEventListener(
      'navigate',
      ev =>
        (ev as any).intercept({
          handler: async () => {
            resolve();
            return new Promise<void>(r => setTimeout(r, 150));
          },
        }),
      { once: true },
    ),
  );
  //when
  const awaiter = Promise.all([
    new Promise<void>((resolve, _) =>
      sut.addEventListener('navigatesuccess', () => resolve(), { once: true }),
    ),
    new Promise<void>((resolve, _) =>
      sut.addEventListener('navigate', () => resolve(), { once: true }),
    ),
  ]);
  const signals = sut.navigate('./some');
  await signals.commited;
  await interceptor;
  await awaiter;
  await signals.finished;

  //then
  // all events were invoked
  expect(true).toBeTruthy();
});

test('currentEntry: points to url/state of last navigation ', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  //when
  await sut.navigate('./step1', { state: 'step1' }).finished;
  //then
  expect(sut.currentEntry.getState()).toEqual('step1');
  expect(sut.currentEntry.url).toContain('/step1');
});

test('currentEntry with history replace: points to url/state of last navigation ', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  //when
  await sut.navigate('./step1', { state: 'step1', history: 'replace' }).finished;
  //then
  expect(sut.currentEntry.getState()).toEqual('step1');
  expect(sut.currentEntry.url).toContain('/step1');
});
test('canGoBack: after navigation canGoBack is true', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  //when
  await sut.navigate('./step1').commited;
  await sut.transition.finished;
  //then
  expect(sut.canGoBack).toBeTruthy();
});

test('back: returns to previous state', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1toback', { state: 'step1toback' }).finished;
  await sut.navigate('./step2', { state: 'step2' }).finished;

  //when
  await sut.back().finished;

  //then
  expect(sut.currentEntry.getState()).toEqual('step1toback');
  expect(sut.currentEntry.url).toContain('/step1toback');
});

test('back: on empty history throws errors', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;

  let err = false;
  let caught = false;
  //when
  try {
    const request = sut.back();
    await request.finished;
    //then
    caught = true;
  } catch (ex) {
    //then
    caught = true;
    err = true;
  }
  await vi.waitFor(() => caught);
  expect(err).toBeTruthy();
});

test('reload: keeps the current state', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1toback', { state: 'step1toback' }).finished;
  await sut.navigate('./step2', { state: 'step2' }).finished;

  //when
  await sut.reload().finished;

  //then
  expect(sut.currentEntry.getState()).toEqual('step2');
  expect(sut.currentEntry.url).toContain('/step2');
});

test('canGoForward: after navigate canGoForward is always false', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;
  await sut.navigate('./step2', { state: 'step2' }).finished;

  //when
  await sut.back().finished;
  await sut.navigate('./step3forward').finished;

  //then
  expect(sut.canGoForward).toBeFalsy();
});

test('canGoForward: after back  canGoForward is true', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;
  await sut.navigate('./step2', { state: 'step2' }).finished;

  //when
  await sut.back().finished;
  //then
  expect(sut.canGoForward).toBeTruthy();
});

test('forward: provides state of original entry', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;
  await sut.navigate('./step2', { state: 'step2' }).finished;
  await sut.navigate('./step3', { state: 'step3' }).finished;
  await sut.back().finished;
  await sut.back().finished;

  //when
  await sut.forward().finished;
  //then
  expect(sut.canGoForward).toBeTruthy();
});

test('traverse: returns to previous state', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1toback', { state: 'step1toback' }).finished;
  await sut.navigate('./step2', { state: 'step2' }).finished;

  const entry = sut.entries().findIndex(e => e.getState() === 'step1toback');
  expect(entry).toBeGreaterThan(-1);
  const key = sut.entries()[entry].key;

  //when
  await sut.traverseTo(key).finished;

  //then
  expect(sut.currentEntry.getState()).toEqual('step1toback');
  expect(sut.currentEntry.url).toContain('/step1toback');
});

test('popstate event: navigateEvent is raised', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  const awaiter = new Promise<void>((resolve, _) =>
    sut.addEventListener('navigate', () => resolve(), { once: true }),
  );
  //when
  globalThis.dispatchEvent(new Event('popstate'));
  await awaiter;
  //then
  expect(sut.canGoBack).toBeTruthy();
});

test('popstate of back event: navigateEvent is raised and canGoForward', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;
  const gotoEntry = sut.currentEntry;
  await sut.navigate('./step2', { state: 'step2' }).finished;

  const awaiter = new Promise<void>((resolve, _) =>
    sut.addEventListener('navigate', () => resolve(), { once: true }),
  );
  //when
  const ev = new PopStateEvent('popstate', { state: gotoEntry });
  (ev as any).state = gotoEntry;
  globalThis.dispatchEvent(ev);
  await awaiter;
  //then
  expect(sut.canGoBack).toBeTruthy();
  expect(sut.canGoForward).toBeTruthy();
  expect(sut.currentEntry.getState()).toEqual('step1');
  expect(sut.currentEntry.url).toContain('/step1');
});

test('updateCurrentEntry: affects the state', async () => {
  //given
  const sut = registerNavigationPolyfill(false) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;
  await sut.navigate('./step2', { state: 'step2' }).finished;



  let updated = false;
  sut.addEventListener('currententrychange', () => {
    updated = true;
  }, { once: true });
  //when
  await sut.updateCurrentEntry({ state: 'updated' });

  await vi.waitFor(() => {
    if (updated) return true;
    throw new Error('Navigation event not fired');
  });

  //then
  expect(sut.currentEntry.getState()).toEqual('updated');
});

test('exception in event handling abborts navigation', async () => {
  //given
  const sut = registerNavigationPolyfill(true) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;

  let err = false;

  sut.addEventListener(
    'navigatesuccess',
    () => {
      throw new Error('exception in handler');
    },
    { once: true },
  );
  sut.addEventListener(
    'navigateerror',
    () => {
      err = true;
    },
    { once: true },
  );
  //when

  let request = sut.navigate('./step2', { state: 'step2' });
  let caught = false;
  let finErr = false;
  await request.finished
    .then(_ => {
      caught = true;
    })
    .catch(_ => {
      caught = true;
      finErr = true;
    });
  await vi.waitFor(() => {
    if (caught  && err) return true;
    throw new Error('Navigation event not fired');
  });
  expect(caught).toBeTruthy();
  expect(finErr).toBeTruthy();
  expect(err).toBeTruthy();
});

test.each([
  ['navigate', false],
  ['reload', false],
  ['traverseTo', false],
  ['navigate', true],
  ['reload', true],
  ['traverseTo', true],
])(
  '%s with raiseHistory == %s : exception in interceptor abborts navigation',
  async (op, raiseHistory) => {
    //given
    const sut = registerNavigationPolyfill(raiseHistory) as Navigation;
    await sut.navigate('./step1', { state: 'step1' }).finished;

    let err = false;
    sut.addEventListener(
      'navigate',
      (e: Event) => {
        const ne = e as NavigateEvent;
        ne.intercept({
          handler() {
            throw new Error('exception in handler');
          },
        });
      },
      { once: true },
    );
    sut.addEventListener(
      'navigateerror',
      () => {
        err = true;
      },
      { once: true },
    );

    //when
    let request: { commited: Promise<void>; finished: Promise<void> };
    switch (op) {
      case 'reload':
        request = sut.reload();
        break;
      case 'traverseTo':
        const entry = sut.entries().findIndex(e => e.getState() === 'step1');
        expect(entry).toBeGreaterThan(-1);
        const key = sut.entries()[entry].key;
        request = sut.traverseTo(key);
        break;
      default:
        request = sut.navigate('./step2', { state: 'step2' });
    }
    let caught = false;
    let finErr = false;
    await request.finished
      .then(_ => {
        caught = true;
      })
      .catch(_ => {
        caught = true;
        finErr = true;
      });
    await vi.waitFor(() =>{
    if (caught  && err) return true;
    throw new Error('Navigation event not fired');
  });
    expect(caught).toBeTruthy();
    expect(err || finErr).toBeTruthy();
  },
);

test('exception in state change handler does not affect navigation - coverage', async () => {
  //given
  const sut = registerNavigationPolyfill(false) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;

  sut.addEventListener(
    'navigationcurrententrychange',
    () => {
      throw new Error('exception in handler');
    },
    { once: true },
  );

  //when

  let request = sut.navigate('./step2', { state: 'step2' });
  let caught = false;
  await request.finished
    .then(_ => {
      caught = true;
    })
    .catch(_ => {
      caught = true;
    });
  await vi.waitFor(() => {
    if (caught  ) return true;
    throw new Error('Navigation event not fired');
  });
  expect(caught).toBeTruthy();
});

test('traversal to nonexisting key  aborts navigation', async () => {
  //given
  const sut = registerNavigationPolyfill(false) as Navigation;
  await sut.navigate('./step1', { state: 'step1' }).finished;

  //when
  let err = false;
  let caught = false;
  try {
    const request = sut.traverseTo('nix');
    request.finished
      .then(_ => {
        caught = true;
      })
      .catch(_ => {
        caught = true;
        err = true;
      });
  } catch (error) {
    caught = true;
    err = true;
  }
  await vi.waitFor(() => {
    if (caught  && err) return true;
    throw new Error('Navigation event not fired');
  });
  expect(err).toBeTruthy();
});

test('navigation cancelled aborts navigation', async () => {
  //given
  const sut = registerNavigationPolyfill(false) as Navigation;

  const cancelHandler = (e: Event) => {
    e.preventDefault();
  };
  
  sut.addEventListener('navigate', cancelHandler, { once: true });

  //when

  let request = sut.navigate('./step2', { state: 'step2' });
  let caught = false;
  let err = false;
  await request.finished
    .then(_ => {
      caught = true;
    })
    .catch(_ => {
      caught = true;
      err = true;
    });
  await vi.waitFor(() => {
    if (caught  && err) return true;
    throw new Error('Navigation event not fired');
  });
  expect(err).toBeTruthy();
  expect(caught).toBeTruthy();
});

test('navigation exception aborts navigation', async () => {
  //given
  const sut = registerNavigationPolyfill(false) as Navigation;

  const cancelHandler = () => {
    throw new Error('exception in handler');
  };
  
  sut.addEventListener('navigate', cancelHandler, { once: true });

  //when

  let request = sut.navigate('./step2', { state: 'step2' });
  let caught = false;
  let err = false;
  await request.finished
    .then(_ => {
      caught = true;
    })
    .catch(_ => {
      caught = true;
      err = true;
    });
  await vi.waitFor(() => {
    if (caught  && err) return true;
    throw new Error('Navigation event not fired');
  });
  expect(err).toBeTruthy();
  expect(caught).toBeTruthy();
});

test.each([
  ["push"],
  ["replace"],
  ["go"],
  ["back"],
  ["forward"]
])('history.%s calls cause navigate event', async (method) => {
  //given
  const sut = registerNavigationPolyfill(false) as Navigation;
  let navigated = false;
  const listener = () => { navigated = true };
  sut.addEventListener('navigate', listener);

  //when
  try {
  switch (method) {
    case "replace":
      globalThis.history.replaceState({}, '', './replace');
      break;
    case "go":
      globalThis.history.pushState({}, '', './push');
      await vi.waitFor(() => {
        if (!navigated) throw new Error('Navigation event not fired');
        return true;
      }, { timeout: 2000 });
      navigated = false;
      globalThis.history.go(-1);
      break;
    case "back":
      globalThis.history.pushState({}, '', './push');
      await vi.waitFor(() => {
        if (!navigated) throw new Error('Navigation event not fired');
        return true;
      }, { timeout: 2000 });
      navigated = false;
      globalThis.history.back();
      break;
    case "forward":
      globalThis.history.pushState({}, '', './push');
      await vi.waitFor(() => {
        if (!navigated) throw new Error('Navigation event not fired');
        return true;
      }, { timeout: 2000 });
      navigated = false;
      globalThis.history.back();
      await vi.waitFor(() => {
        if (!navigated) throw new Error('Navigation event not fired');
        return true;
      }, { timeout: 2000 });
      navigated = false;
      globalThis.history.forward();
      break;
    default:
    globalThis.history.pushState({}, '', './push');
  }
  //then
  await vi.waitFor(() => {
    if (!navigated) throw new Error('Navigation event not fired');
    return true;
  }, { timeout: 2000 });
  expect(navigated).toBeTruthy();
  } finally {
    sut.removeEventListener('navigate', listener);
  }
});

test('cover register/unregister', () => {
  
  unregisterNavigationPolyfill();
  expect(globalThis.navigation).toBeUndefined();

  const sut = registerNavigationPolyfill(false) as Navigation;
  expect(sut).toBeTruthy();
  expect(globalThis.navigation).toBeDefined();
  const sut2 = registerNavigationPolyfill(false) as Navigation;
  expect(sut2).toBeTruthy();
  expect(sut2).toBe(sut);
  expect(globalThis.navigation).toBeDefined();

  unregisterNavigationPolyfill();
  expect(globalThis.navigation).toBeUndefined();
});
