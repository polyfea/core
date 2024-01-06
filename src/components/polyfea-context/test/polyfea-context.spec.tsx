import { newSpecPage } from '@stencil/core/testing';
import { PolyfeaContext } from '../polyfea-context';
import { ContextArea } from '@polyfea/browser-api';
import * as FetchMock from 'fetch-mock';

describe('polyfea-context', () => {

  let fetchMock = (FetchMock as any).default as FetchMock.FetchMockStatic;
  const area: ContextArea = {
    elements: [
      {
        microfrontend: 'some',
        tagName: 'my-element-one',
        attributes: {
          'one': 'value'
        },
        style: {
          'some': 'value'
        }
      },
      {
        microfrontend: 'some',
        tagName: 'my-element-two',
        attributes: {
          'two': 'value'
        },
      }
    ],
    microfrontends: {
      some: {
      }
    }
  };

  beforeAll(() => {

  });

  beforeEach(() => {
    window.fetch = fetchMock as any;
    fetchMock.mock(new RegExp("/context-area/shell"), area);
  });

  afterEach(() => {
    fetchMock = fetchMock.reset();
  });

  it('renders shell context with single children', async () => {
    const page = await newSpecPage({
      url: 'http://test.polyfea.github.io/',
      components: [PolyfeaContext],
    });

    page.doc.head.innerHTML = `<base href="/ui/"/>`;
    await page.waitForChanges();
    await page.setContent('<polyfea-context name="shell" take="1"></polyfea-context>');
    await setTimeout(() => { }, 250); // async refresh of context retrieval

    expect(page.root).toEqualHtml(`
      <polyfea-context name="shell" take="1">
        <mock:shadow-root>
          <my-element-one one="value" class="shell-context" context="shell" style="some: value;"></my-element-one>
        </mock:shadow-root>
      </polyfea-context>
    `);
  });

  it('renders all elements if take is not provided', async () => {
    const page = await newSpecPage({
      url: 'http://test.polyfea.github.io/',
      components: [PolyfeaContext],
    });

    page.doc.head.innerHTML = `<base href="/ui/"/>`;
    await page.waitForChanges();
    await page.setContent('<polyfea-context name="shell" ></polyfea-context>');
    await setTimeout(() => { }, 250); // async refresh of context retrieval

    expect(page.root).toEqualHtml(`
      <polyfea-context name="shell" >
        <mock:shadow-root>
          <my-element-one one="value" class="shell-context" context="shell" style="some: value;"></my-element-one>
          <my-element-two two="value" class="shell-context" context="shell"></my-element-two>
        </mock:shadow-root>
      </polyfea-context>
    `);
  });
});


it('renders slot elements if no context name is provided', async () => {
  const page = await newSpecPage({
    url: 'http://test.polyfea.github.io/',
    components: [PolyfeaContext],
  });

  page.doc.head.innerHTML = `<base href="/ui/"/>`;
  await page.waitForChanges();
  await page.setContent('<polyfea-context><div slot="a2">no context</div></polyfea-context>');
  await setTimeout(() => { }, 350); // async refresh of context retrieval

  expect(page.root).toEqualHtml(`
  <polyfea-context>
    <mock:shadow-root>
      <slot></slot>
    </mock:shadow-root>
    <div slot="a2">
      no context
    </div>
  </polyfea-context>
  `);
});
