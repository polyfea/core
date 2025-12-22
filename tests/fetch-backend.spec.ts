
import { assert, beforeEach, expect, test, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Configuration, PolyfeaApi, type ContextArea} from '@polyfea/browser-api';
import { FetchBackend } from '../src/fetch-backend';

import { catchError, firstValueFrom, lastValueFrom, map, of, skip } from 'rxjs';

let expectedContextArea: ContextArea;

const server = setupServer(
  
  http.get('http://localhost:8080/polyfea/context-area/test', () => {
    return HttpResponse.json(expectedContextArea);
  }),

  http.get('http://localhost:8080/polyfea/context-area/raw-error', () => {
    return new HttpResponse(null, { status: 500 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers()
    const w = (globalThis as unknown as Window);
    w.localStorage.clear();
});
afterAll(() => server.close());

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
    const w = (globalThis as unknown as Window);

    globalThis.location?.assign('http://localhost:8080/test-path');

    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
    });

    // when
    const sut = new FetchBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then 
    expect(contextArea).toStrictEqual(expectedContextArea);
});

test('getContextArea: Path value is relative to base href', async () => {
    // given
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
    });

    // when
    const sut = new FetchBackend(config);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then
    expect(contextArea).toStrictEqual(expectedContextArea);
});

test('getContextArea: Path value is relative to base href, no trailing slash', async () => {
    // given
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
    });

    const api = new PolyfeaApi(config);

    // when
    const sut = new FetchBackend(api);
    const contextArea = await firstValueFrom(sut.getContextArea('test'));

    // then
    expect(contextArea).toStrictEqual(expectedContextArea);
});

test('getContextArea: Fetched Context areas requests are stored in local storage for faster retrieval', async () => {
    // given
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
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
    server.use(
    http.get('http://localhost:8080/polyfea/context-area/test', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
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
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
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
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
    });


    const meta = w.document.createElement('meta');
    meta.setAttribute('name', 'polyfea-backend-retries');
    meta.setAttribute('content', '1');
    w.document.head.appendChild(meta);
    
    const metaTimer = w.document.createElement('meta');
    metaTimer.setAttribute('name', 'polyfea-backend-retry-timer');
    metaTimer.setAttribute('content', '200');
    w.document.head.appendChild(metaTimer);

    // assert localstorage is empty before test
    assert(!w.localStorage.getItem(`polyfea-context[test,./raw-error]`));

    // when
    const sut = new FetchBackend(config);
    const waserr = await firstValueFrom(
        sut.getContextArea('raw-error').pipe(
            map(() => false),
            catchError(() => of(true))
        )
    );
    // then 
    expect(waserr).toBe(true);
});


test('getContextArea: error fetch is replaced by cached value', async () => {
    // given    
    const w = (globalThis as unknown as Window);
    globalThis.location?.assign('http://localhost:8080/ui/test-path');
    const baseHref = w.document.createElement('base');
    baseHref.setAttribute('href', '/ui/');
    w.document.head.appendChild(baseHref);

    const config = new Configuration({
        basePath: 'http://localhost:8080/polyfea',
    });


    const meta = w.document.createElement('meta');
    meta.setAttribute('name', 'polyfea-backend-retries');
    meta.setAttribute('content', '1');
    w.document.head.appendChild(meta);
    
    const metaTimer = w.document.createElement('meta');
    metaTimer.setAttribute('name', 'polyfea-backend-retry-timer');
    metaTimer.setAttribute('content', '200');
    w.document.head.appendChild(metaTimer);

    w.localStorage.setItem(`polyfea-context[raw-error,./test-path]`, "{}");

    // when
    const sut = new FetchBackend(config);
    const waserr = await lastValueFrom(
        sut.getContextArea('raw-error').pipe(
            map(() => true),
            catchError(() => of(false))
        )
    );
    // then 
    expect(waserr).toBe(true);
});