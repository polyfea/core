
import { afterEach, beforeEach, beforeAll, afterAll, expect, test, assert } from 'vitest'
import { Configuration,  PolyfeaApi, type StaticConfig } from '@polyfea/browser-api';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { firstValueFrom } from 'rxjs';
import { StaticBackend } from '../src/static-backend';


let expectedConfig: StaticConfig = {} as StaticConfig;

const server = setupServer(
  http.get('/ui/polyfea/static-config', () => {
    return HttpResponse.json(expectedConfig);
  }),
  http.get('/polyfea/static-config', () => {
    return HttpResponse.json(expectedConfig);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => {
    globalThis.localStorage.clear();
    globalThis.document.head.innerHTML = '';
    expectedConfig = {
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
            },

            {
                name: 'test-root',
                path: '^(\\./)?$',
                contextArea: {
                    elements: [
                        {
                            microfrontend: 'root',
                            tagName: 'my-element',
                            attributes: {
                                'some': 'root'
                            },
                            style: {
                                'some': 'root'
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

test('getContextArea: Context Area provided', async () => {
    // given
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/test-path');

    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea'
    });

    // when
    const sut = new StaticBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then 
    assert(expectedConfig.contextAreas);
    if (expectedConfig.contextAreas) {
        expect(contextArea).toEqual({
            elements: expectedConfig.contextAreas[0].contextArea?.elements,
            microfrontends: expectedConfig.microfrontends
        });
    }
});

test('getContextArea: Path value is relative to base href', async () => {
    // given
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/ui/polyfea'
    });

    // when
    const sut = new StaticBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then
    assert(expectedConfig.contextAreas);
    if (expectedConfig.contextAreas) {

        expect(contextArea).toStrictEqual({
            elements: expectedConfig.contextAreas[1].contextArea?.elements,
            microfrontends: expectedConfig.microfrontends
        });
    }
});

test('getContextArea: Path value is relative to base href, when missing trailing slash', async () => {
    // given
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/ui/polyfea'
    });
    const api= new PolyfeaApi(config);

    // when
    const sut = new StaticBackend(api);
    const contextArea = await firstValueFrom(sut.getContextArea('test-root'));

    // then
    assert(expectedConfig.contextAreas);
    if (expectedConfig.contextAreas) {

        expect(contextArea).toStrictEqual({
            elements: expectedConfig.contextAreas[2].contextArea?.elements,
            microfrontends: expectedConfig.microfrontends
        });
    }
});


