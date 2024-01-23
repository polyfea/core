
import { afterEach, assert, beforeEach, expect, test } from 'vitest'
import * as FetchMock from 'fetch-mock';
import { Configuration, ContextArea, FetchAPI } from '@polyfea/browser-api';
import { FetchBackend } from '../fetch-backend';

import { firstValueFrom, skip } from 'rxjs';

let expectedContextArea: ContextArea;

beforeEach(() => {
    globalThis.localStorage.clear();
    globalThis.document.head.innerHTML = '';
    expectedContextArea = {
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
});

test('getContextArea: Context Area is provided', async () => {
    // given
    const fetchMock = FetchMock.sandbox();
    fetchMock.get('http://localhost:8080/polyfea/context-area/test?path=.%2Ftest-path', expectedContextArea);

    const w = (globalThis as unknown as Window);

    globalThis.location?.assign('http://localhost:8080/test-path');

    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fetchMock as unknown as FetchAPI
    });

    // when
    const sut = new FetchBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then 
    expect(contextArea).toStrictEqual(expectedContextArea);
});

test('getContextArea: Path value is relative to base href', async () => {
    // given
    const fetchMock = FetchMock.sandbox();
    fetchMock.get('http://localhost:8080/polyfea/context-area/test?path=.%2Ftest-path', expectedContextArea);

    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fetchMock as unknown as FetchAPI
    });

    // when
    const sut = new FetchBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then
    expect(contextArea).toStrictEqual(expectedContextArea);
});

test('getContextArea: Path value is relative to base href, no trailing slash', async () => {
    // given
    const fetchMock = FetchMock.sandbox();
    fetchMock.get('http://localhost:8080/polyfea/context-area/test?path=.%2F', expectedContextArea);

    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fetchMock as unknown as FetchAPI
    });

    // when
    const sut = new FetchBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then
    expect(contextArea).toStrictEqual(expectedContextArea);
});

test('getContextArea: Fetched Context areas requests are stored in local storage for faster retrieval', async () => {
    // given
    const fetchMock = FetchMock.sandbox();
    fetchMock.get('http://localhost:8080/polyfea/context-area/test?path=.%2Ftest-path', expectedContextArea);

    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fetchMock as unknown as FetchAPI
    });

    // assert localstorage is empty before test
    assert(!w.localStorage.getItem(`polyfea-context[test,./test-path]`));
    // when
    const sut = new FetchBackend(config);
    await firstValueFrom(sut.getContextArea('test'));

    const cache = w.localStorage.getItem(`polyfea-context[test,./test-path]`);

    const contextArea = JSON.parse(cache as string) as ContextArea;

    // then
    expect(contextArea).toEqual(expectedContextArea);
});

test('getContextArea: LocalStorage shall be used to get context areas', async () => {
    // given
    const fetchMock = FetchMock.sandbox();
    fetchMock.get('http://localhost:8080/polyfea/context-area/test?path=.%2Ftest-path', 500);

    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fetchMock as unknown as FetchAPI
    });

    w.localStorage.setItem(`polyfea-context[test,./test-path]`, JSON.stringify(expectedContextArea));

    // when
    const sut = new FetchBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then 
    expect(contextArea).toEqual(expectedContextArea);
});


test('getContextArea: contexts are retrieved from remote even if available in LocalStorage', async () => {
    // given
    const fetchMock = FetchMock.sandbox();
    fetchMock.get('http://localhost:8080/polyfea/context-area/test?path=.%2Ftest-path', expectedContextArea);


    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fetchMock as unknown as FetchAPI
    });

    w.localStorage.setItem(`polyfea-context[test,./test-path]`, "{}");

    // when
    const sut = new FetchBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test')
        .pipe(skip(1)));

    // then 
    expect(contextArea).toEqual(expectedContextArea);
});

test('getContextArea: error fetch is signalled on the observable', async () => {
    // given
    const fetchMock = FetchMock.sandbox();
    fetchMock.get('http://localhost:8080/polyfea/context-area/test?path=.%2Ftest-path', 500);


    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
        fetchApi: fetchMock as unknown as FetchAPI
    });

    // assert localstorage is empty before test
    assert(!w.localStorage.getItem(`polyfea-context[test,./test-path]`));

    // when
    const sut = new FetchBackend(config);
    const err = await new Promise((resolve, reject) => {
        sut.getContextArea('test').subscribe({
            next: () => { reject(new Error('Should not be called')); },
            error: (err) => {
                expect(err).toBeInstanceOf(Error);
                resolve(err);
            },
            complete: () => { reject(new Error('Should not be called')); }
        });
    });

    // then 
    expect(err).toBeDefined();
});
