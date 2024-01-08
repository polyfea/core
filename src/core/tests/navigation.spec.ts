import { expect, test, beforeEach, afterEach } from 'vitest'

import { NavigateEvent, Navigation, href, registerNavigationPolyfill, unregisterNavigationPolyfill } from '../navigation';


beforeEach(() => {
    globalThis.navigation = undefined;
});

afterEach(() => {
    unregisterNavigationPolyfill();
});

test("navigate: ALL EVENTS invoked when navigating", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;

    //when
    const awaiter = Promise.all([
        new Promise<void>((resolve, _) => sut.addEventListener("navigatesuccess", () => resolve())),
        new Promise<void>((resolve, _) => sut.addEventListener("navigate", () => resolve()))
    ]);
    const signals = sut.navigate("./some");
    await signals.commited;
    await signals.finished;
    await awaiter;

    //then
    // all events were invoked
    expect(true).toBeTruthy()
});

test("navigate: currentRequest is null when navigation is finished", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;

    //when
    
    await sut.navigate("./some").finished;
    
    //then
    // all events were invoked
    expect((sut as any).currentTransition).toBeFalsy()
});

test("navigate: conflicting requests", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;

    //when
    
    sut.navigate("./some"); // do not wait the next request shall abort it
    await sut.navigate("./some").finished;
    
    //then
    // all events were invoked
    expect((sut as any).currentTransition).toBeFalsy()
});


test("navigate: sequence of navigations", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;

    await  sut.navigate("./some").finished;
    await  sut.navigate("./some1").finished;

    //when
    const awaiter = Promise.all([
        new Promise<void>((resolve, _) => sut.addEventListener("navigatesuccess", () => resolve())),
        new Promise<void>((resolve, _) => sut.addEventListener("navigate", () => resolve()))
    ]);
   

    const signals = sut.navigate("./some2");

    await signals.commited;
    await signals.finished;
    await awaiter;

    //then
    // all events were invoked
    expect(true).toBeTruthy()
});

test("href: navigate raised", async () => {
    //given
    let wasIntercepted = false;

    const sut = registerNavigationPolyfill(true) as Navigation;
    sut.addEventListener("navigate", (ev) => {
        (ev as NavigateEvent).intercept();
        wasIntercepted = true;
    })

    const anchor = document.createElement("a");
    const ref = href("./some");

    anchor.setAttribute("href", ref.href);
    anchor.addEventListener("click", ref.onclick);
    document.body.appendChild(anchor);

    //when
    const awaiter = new Promise<void>((resolve, _) => sut.addEventListener("navigatesuccess", () => resolve()))
    anchor.dispatchEvent(new Event("click"));
    await awaiter;

    //then
    expect(wasIntercepted).toBeTruthy()
});

test("transition:is set to null when finished", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;
    sut.addEventListener("navigate", (ev) => {
        (ev as any).intercept();
    });

    // when 
    sut.navigate("./some");
    await sut.transition.finished;

    //then
    expect(sut.transition).toBeNull()
});


test("navigate: ALL EVENTS invoked and interception handler executed when navigating", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;
    const interceptor = new Promise<void>((resolve) =>
        sut.addEventListener("navigate", (ev) =>
            (ev as any).intercept({
                handler: async () => {
                    resolve();
                    return new Promise<void>((r) => setTimeout(r, 150));
                }
            })
        )
    );
    //when
    const awaiter = Promise.all([
        new Promise<void>((resolve, _) => sut.addEventListener("navigatesuccess", () => resolve())),
        new Promise<void>((resolve, _) => sut.addEventListener("navigate", () => resolve()))
    ]);
    const signals = sut.navigate("./some");
    await signals.commited;
    await interceptor;
    await awaiter;
    await signals.finished;

    //then
    // all events were invoked
    expect(true).toBeTruthy()
});


test("currentEntry: points to url/state of last navigation ", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;

    //when
    await sut.navigate("./step1", { state: "step1" }).finished;
    //then
    expect(sut.currentEntry.getState()).toEqual("step1")
    expect(sut.currentEntry.url).toContain("/step1")

});

test("canGoBack: after navigation canGoBack is true", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;

    //when
    await sut.navigate("./step1").commited;
    await sut.transition.finished;
    //then
    expect(sut.canGoBack).toBeTruthy()
});

test("back: returns to previous state", async () => {
    //given   
    const sut = registerNavigationPolyfill(true) as Navigation;
    await sut.navigate("./step1toback", { state: "step1toback" }).finished;
    await sut.navigate("./step2", { state: "step2" }).finished;

    //when
    await sut.back().finished;

    //then
    expect(sut.currentEntry.getState()).toEqual("step1toback")
    expect(sut.currentEntry.url).toContain("/step1toback")
});

test("canGoForward: after navigate canGoForward is always false", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;
    await sut.navigate("./step1", { state: "step1" }).finished;
    await sut.navigate("./step2", { state: "step2" }).finished;

    //when    
    await sut.back().finished;
    await sut.navigate("./step3forward").finished;

    //then
    expect(sut.canGoForward).toBeFalsy()
});


test("canGoForward: after back  canGoForward is true", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;
    await sut.navigate("./step1", { state: "step1" }).finished;
    await sut.navigate("./step2", { state: "step2" }).finished;

    //when    
    await sut.back().finished;
    //then
    expect(sut.canGoForward).toBeTruthy()
});


test("forward: provides state of original entry", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;
    await sut.navigate("./step1", { state: "step1" }).finished;
    await sut.navigate("./step2", { state: "step2" }).finished;
    await sut.navigate("./step3", { state: "step3"}).finished;
    await sut.back().finished; 
    await sut.back().finished; 
    
    //when
    await sut.forward().finished;
    //then
    expect(sut.canGoForward).toBeTruthy()
    expect(sut.currentEntry.getState()).toEqual("step2")
    expect(sut.currentEntry.url).toContain("/step2")
});


test("popstate event: navigateEvent is raised", async () => {
    //given 
    const sut = registerNavigationPolyfill(true) as Navigation;
    const awaiter = new Promise<void>((resolve, _) => sut.addEventListener("navigate", () => resolve()))
    //when
    globalThis.dispatchEvent(new Event("popstate"));
    await awaiter;
    //then
    expect(sut.canGoBack).toBeTruthy()
    
});

test("popstate of back event: navigateEvent is raised and canGoForward", async () => {
    //given
    const sut = registerNavigationPolyfill(true) as Navigation;
    await sut.navigate("./step1", { state: "step1" }).finished;
    const gotoEntry = sut.currentEntry;
    await sut.navigate("./step2", { state: "step2" }).finished;

    const awaiter = new Promise<void>((resolve, _) => sut.addEventListener("navigate", () => resolve()))
    //when
    const ev = new PopStateEvent("popstate", { state: gotoEntry });
    (ev as any).state = gotoEntry;
    globalThis.dispatchEvent(ev);
    await awaiter;
    //then
    expect(sut.canGoBack).toBeTruthy()
    expect(sut.canGoForward).toBeTruthy()
    expect(sut.currentEntry.getState()).toEqual("step1")
    expect(sut.currentEntry.url).toContain("/step1")

    
});

