import { Configuration, ContextArea, FetchAPI, StaticConfig } from '@polyfea/browser-api';
import { afterEach, assert, beforeEach, beforeAll, expect, test } from 'vitest'
import * as FetchMock from 'fetch-mock';
import { Polyfea } from '../polyfea';
import { firstValueFrom } from 'rxjs';
import { Navigation } from '../navigation';

interface TestFixture {
    expectedContextArea: ContextArea;
    staticConfig: StaticConfig;
    fetchMock: FetchMock.FetchMockSandbox;
    apiConfig: Configuration;
    originCustomElementsDefine: any;
}

let fixture = {} as TestFixture;

beforeEach(() => {
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    document.head.innerHTML = '';
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);
    

    fixture = {} as TestFixture;
    fixture.originCustomElementsDefine = w.customElements.define;
    fixture.fetchMock = FetchMock.sandbox();
    fixture.apiConfig = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fixture.fetchMock as unknown as FetchAPI
    });

    w.fetch = fixture.fetchMock as any;
    fixture.expectedContextArea = {
        elements: [
            {
                microfrontend: 'some',
                tagName: 'my-element',
                attributes: {
                    'some': 'value'
                },
                style: {
                    'some': 'value'
                }
            }
        ],
        microfrontends: {
            some: {
                module: './some',
                dependsOn: undefined,
                resources: [{
                    kind: 'script',
                    href: './some',
                    attributes: {
                        'some': 'value'
                    },
                    waitOnLoad: true,
                }]
            }
        }
    };

    fixture.staticConfig =  {
        contextAreas: [
            {
                name: 'test',
                path: 'test-path',
                contextArea: {
                    elements: [
                        {
                            microfrontend: 'some',
                            tagName: 'my-element',
                            attributes: {
                                'some': 'value'
                            },
                            style: {
                                'some': 'value'
                            }
                        }
                    ],
                }
            },
            {
                name: 'test2',
                path: './test-path',
                contextArea: {
                    elements: [
                        {
                            microfrontend: 'some',
                            tagName: 'my-element',
                            attributes: {
                                'some': 'value'
                            },
                            style: {
                                'some': 'value'
                            }
                        }
                    ],
                }
            }
        ],
        microfrontends: {
            some: {
                module: './some',
                dependsOn: undefined,
                resources: [{
                    kind: 'script',
                    href: './some',
                    attributes: {
                        'some': 'value'
                    },
                    waitOnLoad: true,
                }]
            }
        }
    };
    
});

afterEach(() => {
    const w = (globalThis as unknown as Window);
    w.customElements.define = fixture.originCustomElementsDefine;
    (w as any).polyfea = undefined;
    (w as any).navigation = undefined;
    
});

test('getContextArea: default setup with fetch backend', async () => {
    // given
    fixture.fetchMock.get(
        'http://localhost:8080/polyfea/context-area/test?path=.%2Ftest-path', 
        fixture.expectedContextArea);

    // when
    const sut = Polyfea.getOrCreate(fixture.apiConfig);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));
    // then
    expect(contextArea).toEqual(fixture.expectedContextArea);
});


test('getContextArea: static config setup', async () => {
    // given
    fixture.fetchMock.get(
        'http://localhost:8080/polyfea/static-config',
        fixture.staticConfig);

    const meta = (globalThis as unknown as Window).document.createElement('meta');
    meta.setAttribute('name', 'polyfea.backend');
    meta.setAttribute('content', 'static://');
    (globalThis as unknown as Window).document.head.appendChild(meta);

    // when
    const sut = Polyfea.getOrCreate(fixture.apiConfig);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then
    expect(contextArea).toEqual(fixture.expectedContextArea);
});

test('initialize: Initialize registers polyfea on global object', async () => {
    // given
    // when
    Polyfea.initialize();
    // then
    expect((globalThis as any ).polyfea).toBeDefined();
});

test('initialize: Initialize registers  navigation polyfill if it is not available', async () => {
    // given
    assert(!(globalThis.navigation));
    // when
    Polyfea.initialize();
    // then
    expect((globalThis as any ).navigation).toBeDefined();
});


test('getOrCreate: when initialized then getOrCreate returns registered instance', async () => {
    // given
    Polyfea.initialize();
    assert((globalThis as any ).polyfea);
    (globalThis as any ).polyfea.mark = 'test__mark';
    // when
    const polyfea = Polyfea.getOrCreate();
    // then
    expect((polyfea as any).mark).toEqual('test__mark');
});

test('initialize: Initialize does not overrides existing navigation API', async () => {
    // given
    assert(!(globalThis.navigation));
    globalThis.navigation  = new EventTarget() as Navigation;
    (globalThis.navigation as any).mark = 'test__mark';
    // when
    Polyfea.initialize();
    // then
    expect((globalThis.navigation as any).mark).toEqual('test__mark');
});



test('loadMicrofrontend: Module is loaded as es type module script', async () => {
    // given
    fixture.fetchMock.get('/some/module.js', "console.log('test');");
    const contextArea: ContextArea = {
        elements: [
            {
                microfrontend: 'some',
                tagName: 'my-element',
                attributes: {
                    'some': 'value'
                },
                style: {
                    'some': 'value'
                }
            }
        ],
        microfrontends: {
            some: {
                module: './some/module.js'
            }
        }
    };
    
    // when
    const sut = Polyfea.getOrCreate();
    await sut.loadMicrofrontend(contextArea, 'some');
    
    // then
    let count = 0;
    document.head.querySelectorAll('script').forEach(script => {
        if (script.getAttribute('type') === 'module' && script.getAttribute('src') === './some/module.js') {
            count++;            
        }
    });
    expect(count).toEqual(1);
});

test('loadMicrofrontend: script is loaded as es type module script', async () => {
    // given
    fixture.fetchMock.get('/some/module.js', "console.log('test');");
    const contextArea: ContextArea = {
        elements: [
            {
                microfrontend: 'some',
                tagName: 'my-element',
                attributes: {
                    'some': 'value'
                },
                style: {
                    'some': 'value'
                }
            }
        ],
        microfrontends: {
            some: {
                resources: [{
                    kind: 'script',
                    href: './some/module.js',
                    attributes: {
                        type: 'module',
                        defer: ''
                    }
                }]
            }
        }
    };
    
    // when
    const sut = Polyfea.getOrCreate();
    await sut.loadMicrofrontend(contextArea, 'some');
    
    // then
    let count = 0;
    document.head.querySelectorAll('script').forEach(script => {
        if (script.getAttribute('type') === 'module' && script.getAttribute('src') === './some/module.js') {
            count++;            
        }
    });
    expect(count).toEqual(1);
});

test('loadMicrofrontend: prevent loading the same resource multiple times', async () => {
    // given
    fixture.fetchMock.get('/some/module.js', "console.log('test');");
    const contextArea: ContextArea = {
        elements: [
            {
                microfrontend: 'some',
                tagName: 'my-element',
                attributes: {
                    'some': 'value'
                },
                style: {
                    'some': 'value'
                }
            }
        ],
        microfrontends: {
            some: {
                module: './some/module.js',
                resources: [{
                    kind: 'script',
                    href: './some/module.js',
                    attributes: {
                        type: 'module',
                        defer: ''
                    }
                }]
            }
        }
    };
    
    // when
    const sut = Polyfea.getOrCreate();
    await sut.loadMicrofrontend(contextArea, 'some');
    await sut.loadMicrofrontend(contextArea, 'some');
    
    // then
    let count = 0;
    document.head.querySelectorAll('script').forEach(script => {
        if (script.getAttribute('type') === 'module' && script.getAttribute('src') === './some/module.js') {
            count++;            
        }
    });
    expect(count).toEqual(1);
});

test('loadMicrofrontend: stylesheet load adds the head element', async () => {
    // given
    fixture.fetchMock.get('/some/style.css', " body { background-color: red; }");
    const contextArea: ContextArea = {
        elements: [
            {
                microfrontend: 'some',
                tagName: 'my-element',
                attributes: {
                    'some': 'value'
                },
                style: {
                    'some': 'value'
                }
            }
        ],
        microfrontends: {
            some: {
                resources: [{
                    kind: 'stylesheet',
                    href: './some/style.css',
                }]
            }
        }
    };
    
    // when
    const sut = Polyfea.getOrCreate();
    await sut.loadMicrofrontend(contextArea, 'some');
    
    // then
    let count = 0;
    document.head.querySelectorAll('link').forEach(script => {
        if ( script.getAttribute('href') === './some/style.css') {
            count++;            
        }
    });
    expect(count).toEqual(1);
});

test('initialization: enable duplicate custom element registration', async () => {
    // given
    
    // when
    Polyfea.initialize();
    globalThis.customElements.define("test-el", HTMLDivElement)
    globalThis.customElements.define("test-el", HTMLDivElement)
    
    // then
    globalThis.customElements.get("test-el")
    expect( globalThis.customElements.get("test-el")).toBeDefined();
});


test('initialization: it is possible to configure error behavior for duplicate custom element registration', async () => {
    // given
    const meta = document.createElement("meta");
    meta.setAttribute("name", "polyfea.duplicit-custom-elements");
    meta.setAttribute("content", "error");
    document.head.appendChild(meta);

    
    let errorObject: any;
    if(!globalThis.customElements.get("test-el")) {
        globalThis.customElements.define("test-el", HTMLDivElement);
    }

    // when    
    Polyfea.initialize();

    try {
        globalThis.customElements.define("test-el", HTMLDivElement)
    } catch( err) {
        errorObject = err || true;
    }
    
    // then
    expect( errorObject).toBeDefined();
});

