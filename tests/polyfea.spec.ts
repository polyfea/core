import { Configuration, MicrofrontendResourceKindEnum, type ContextArea, type StaticConfig } from '@polyfea/browser-api';
import { afterEach, assert, beforeEach, expect, test, beforeAll, afterAll } from 'vitest';

import { Polyfea } from '../src/polyfea';
import { firstValueFrom } from 'rxjs';
import { type Navigation } from '../src/navigation';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

interface TestFixture {
  expectedContextArea: ContextArea;
  staticConfig: StaticConfig;
  apiConfig: Configuration;
  originCustomElementsDefine: any;
}

let fixture = {} as TestFixture;

const server = setupServer(
  http.get('http://localhost:8080/polyfea/context-area/test', () => {
    return HttpResponse.json(fixture.expectedContextArea);
  }),

  http.get('http://localhost:8080/polyfea/static-config', () => {
    return HttpResponse.json(fixture.staticConfig);
  }),

  http.get('http://localhost:8080/some/module.js', () => {
    return new HttpResponse("console.log('test');", {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
      },
    });
  }),

  http.get('./some/style.css', () => {
    return new HttpResponse('body { background-color: red; }', {
      status: 200,
      headers: {
        'Content-Type': 'text/css',
      },
    });
  }),
  http.get('./some/nix.css', () => {
    return new HttpResponse(null, { status: 404 });
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  const w = (globalThis as unknown as Window);
  w.localStorage.clear();
});
afterAll(() => server.close());

beforeEach(() => {
  const w = globalThis as unknown as Window;
  globalThis.location?.assign('http://localhost:8080/ui/test-path');
  document.head.innerHTML = '';
  const baseHref = w.document.createElement('base');
  baseHref.setAttribute('href', '/ui/');
  w.document.head.appendChild(baseHref);

  fixture = {} as TestFixture;
  fixture.originCustomElementsDefine = w.customElements.define;

  fixture.apiConfig = new Configuration({
    basePath: 'http://localhost:8080/polyfea',
  });
  fixture.expectedContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        module: './some',
        dependsOn: undefined,
        resources: [
          {
            kind: 'script',
            href: './some',
            attributes: {
              some: 'value',
            },
            waitOnLoad: true,
          },
        ],
      },
    },
  };

  fixture.staticConfig = {
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
                some: 'value',
              },
              style: {
                some: 'value',
              },
            },
          ],
        },
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
                some: 'value',
              },
              style: {
                some: 'value',
              },
            },
          ],
        },
      },
    ],
    microfrontends: {
      some: {
        module: './some',
        dependsOn: undefined,
        resources: [
          {
            kind: 'script',
            href: './some',
            attributes: {
              some: 'value',
            },
            waitOnLoad: true,
          },
        ],
      },
    },
  };
});

afterEach(() => {
  const w = globalThis as unknown as Window;
  w.customElements.define = fixture.originCustomElementsDefine;
  (w as any).polyfea = undefined;
  (w as any).navigation = undefined;
});

test('getContextArea: default setup with fetch backend', async () => {
  // given

  // when
  const sut = Polyfea.getOrCreate(fixture.apiConfig);
  const contextArea = await firstValueFrom(sut.getContextArea('test'));
  // then
  expect(contextArea).toEqual(fixture.expectedContextArea);
});

test('getContextArea: static config setup', async () => {
  // given
  const metaDuplicity = document.createElement('meta');
  metaDuplicity.setAttribute('name', 'polyfea.duplicit-custom-elements');
  metaDuplicity.setAttribute('content', 'silent');
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
  expect((globalThis as any).polyfea).toBeDefined();
});

test('initialize: Initialize registers  navigation polyfill if it is not available', async () => {
  // given
  assert(!globalThis.navigation);
  // when
  Polyfea.initialize();
  // then
  expect((globalThis as any).navigation).toBeDefined();
});

test('getOrCreate: when initialized then getOrCreate returns registered instance', async () => {
  // given
  Polyfea.initialize();
  assert((globalThis as any).polyfea);
  (globalThis as any).polyfea.mark = 'test__mark';
  // when
  const polyfea = Polyfea.getOrCreate();
  // then
  expect((polyfea as any).mark).toEqual('test__mark');
});

test('initialize: Initialize does not overrides existing navigation API', async () => {
  // given
  assert(!globalThis.navigation);
  globalThis.navigation = new EventTarget() as Navigation;
  (globalThis.navigation as any).mark = 'test__mark';
  // when
  Polyfea.initialize();
  // then
  expect((globalThis.navigation as any).mark).toEqual('test__mark');
});

test('loadMicrofrontend: Empty module is ignored', async () => {
  // given
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'polyfea.duplicit-custom-elements');
  meta.setAttribute('content', 'verbose');
  document.head.appendChild(meta);
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'nix',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        module: './some/module.js',
      },
    },
  };

  // when
  const sut = Polyfea.getOrCreate();
  try {
    await sut.loadMicrofrontend(contextArea, '');
  } catch (error) {
    assert(false, 'Loading empty module should not throw an error');
  } 
  assert(true);
});

test('loadMicrofrontend: Module is loaded as es type module script', async () => {
  // given
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'polyfea.duplicit-custom-elements');
  meta.setAttribute('content', 'verbose');
  document.head.appendChild(meta);
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        module: './some/module.js',
      },
    },
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
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        resources: [
          {
            kind: 'script',
            href: './some/module.js',
            attributes: {
              type: 'module',
              defer: '',
            },
          },
        ],
      },
    },
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

  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        module: './some/module.js',
        resources: [
          {
            kind: 'script',
            href: './some/module.js',
            attributes: {
              type: 'module',
              defer: '',
            },
          },
        ],
      },
    },
  };

  const cspMeta = document.createElement('meta');
  cspMeta.setAttribute('name', 'csp-nonce');
  cspMeta.setAttribute('content', 'some-nonce-value');
  document.head.appendChild(cspMeta);

  // when
  const sut = Polyfea.getOrCreate();
  await sut.loadMicrofrontend(contextArea, 'some');
  const errs =await sut.loadMicrofrontend(contextArea, 'some');

  // then
  let count = 0;
  document.head.querySelectorAll('script').forEach(script => {
    if (script.getAttribute('type') === 'module' && script.getAttribute('src') === './some/module.js') {
      expect(script.getAttribute('nonce')).toBe('some-nonce-value');
      count++;
    }
  });
  expect(count).toEqual(1);
  expect(errs.length).toBe(0);
});

test.each([
  ["nix.css", true, 1, MicrofrontendResourceKindEnum.Stylesheet],
  ["style.css", true, 0, MicrofrontendResourceKindEnum.Stylesheet],
  ["style.css", false, 0, MicrofrontendResourceKindEnum.Stylesheet],
  ["nix.css", false, 0, MicrofrontendResourceKindEnum.Link],
  
])('loadMicrofrontend %s, with waitOnLoad ==  %s: stylesheet load adds the head element', async (style, waitOnLoad, errors, kind) => {
  // given
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        resources: [
          {
            kind,
            href: './some/' + style,
            waitOnLoad,
          },
        ],
      },
    },
  };

  const cspMeta = document.createElement('meta');
  cspMeta.setAttribute('name', 'csp-nonce');
  cspMeta.setAttribute('content', 'some-nonce-value');
  document.head.appendChild(cspMeta);
  // when
  const sut = Polyfea.getOrCreate();
  const errs = await sut.loadMicrofrontend(contextArea, 'some');

  // then
  let count = 0;
  document.head.querySelectorAll('link').forEach(script => {
    if (script.getAttribute('href') === './some/' + style) {
      expect(script.getAttribute('nonce')).toBe('some-nonce-value');
      count++;
    }
  });
  expect(count).toEqual(1);
  expect(errs.length).toBe(errors);
});

test.each([
  ["style.css", true, 0, MicrofrontendResourceKindEnum.Stylesheet],
  ["style.css", false, 0, MicrofrontendResourceKindEnum.Stylesheet],
  ["nix.css", false, 0, MicrofrontendResourceKindEnum.Link],
  ["nix.css", true, 1, MicrofrontendResourceKindEnum.Stylesheet],
])('loadMicrofrontend %s, with waitOnLoad ==  %s: stylesheet load adds the head element', async (style, waitOnLoad, errors, kind) => {
  // given
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        resources: [
          {
            kind,
            href: './some/' + style,
            waitOnLoad,
          },
        ],
      },
    },
  };

  const cspMeta = document.createElement('meta');
  cspMeta.setAttribute('name', 'csp-nonce');
  cspMeta.setAttribute('content', 'some-nonce-value');
  document.head.appendChild(cspMeta);
  // when
  const sut = Polyfea.getOrCreate();
  const errs = await sut.loadMicrofrontend(contextArea, 'some');

  // then
  let count = 0;
  document.head.querySelectorAll('link').forEach(script => {
    if (script.getAttribute('href') === './some/' + style) {
      expect(script.getAttribute('nonce')).toBe('some-nonce-value');
      count++;
    }
  });
  expect(count).toEqual(1);
  expect(errs.length).toBe(errors);
});


test.each([
  ["./some/style.css", "css" as any as MicrofrontendResourceKindEnum],
  [undefined, MicrofrontendResourceKindEnum.Stylesheet],
])('loadMicrofrontend %s, with kind ==  %s shall report an error', async (href, kind) => {
  // given
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        resources: [
          {
            kind,
            href,
          },
        ],
      },
    },
  };

  
  // when
  const sut = Polyfea.getOrCreate();
  const errs = await sut.loadMicrofrontend(contextArea, 'some');

  // then
  expect(errs.length).toBeGreaterThan(0);
});

test('loadMicrofrontend: cyclic dependency produces error in result', async () => {
  // given
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {
      some: {
        dependsOn: ['cyclic'],
        resources: [
          {
            kind: 'script',
            href: './some/module.js',
            attributes: {
              type: 'module',
              defer: '',
            },
          },
        ],
      },
      cyclic: {
        dependsOn: ['some'],
        resources: [
          {
            kind: 'script',
            href: './some/module.js',
            attributes: {
              type: 'module',
              defer: '',
            },
          },
        ],
      },
    },
  };

  // when
  const sut = Polyfea.getOrCreate();
  const errs = await sut.loadMicrofrontend(contextArea, 'some');

  // then
  let count = 0;
  document.head.querySelectorAll('script').forEach(script => {
    if (script.getAttribute('type') === 'module' && script.getAttribute('src') === './some/module.js') {
      count++;
    }
  });
  expect(errs.length).toBeGreaterThan(0);
});



test('loadMicrofrontend: mising mfe produces error', async () => {
  // given
  const contextArea: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element',
        attributes: {
          some: 'value',
        },
        style: {
          some: 'value',
        },
      },
    ],
    microfrontends: {},
  };

  // when
  const sut = Polyfea.getOrCreate();
  const errs = await sut.loadMicrofrontend(contextArea, 'some');

  // then
  expect(errs.length).toBeGreaterThan(0);
});
test.each([
  ['silent'],
  ['verbose']
])('initialization with %s: enable duplicate custom element registration', async (verbosity) => {
  // given
  document.head.querySelectorAll('meta[name="polyfea.duplicit-custom-elements"]').forEach(el => el.remove());
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'polyfea.duplicit-custom-elements');
  meta.setAttribute('content', verbosity);
  document.head.appendChild(meta);

  // when
  Polyfea.initialize();
  globalThis.customElements.define('test-el-'+verbosity, class extends HTMLDivElement {});
  globalThis.customElements.define('test-el-'+verbosity, class extends HTMLDivElement {});

  // then
  globalThis.customElements.get('test-el-'+verbosity);
  expect(globalThis.customElements.get('test-el-'+verbosity)).toBeDefined();
});

test('initialization: it is possible to configure error behavior for duplicate custom element registration', async () => {
  // given
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'polyfea.duplicit-custom-elements');
  meta.setAttribute('content', 'error');
  document.head.appendChild(meta);

  let errorObject: any;
  if (!globalThis.customElements.get('test-el-error')) {
    globalThis.customElements.define('test-el-error', class extends HTMLDivElement {});
  }

  (customElements.define as any).overrider = undefined;

  // when
  Polyfea.initialize();

  try {
    globalThis.customElements.define('test-el-error', class extends HTMLDivElement {});
  } catch (err) {
    errorObject = err || true;
  }

  // then
  expect(errorObject).toBeDefined();
});
