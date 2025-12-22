import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import {  expect, waitFor } from 'storybook/test';
import { within, within as withinShadow } from 'shadow-dom-testing-library';
import { PolyfeaContext } from '../src/polyfea-context.js';

interface props {
  contextName: string;
  take?: number;
}

function metaEditDecorator(meta: string, value: string) {
  return function (story: any) {
    var oldValue: string | null = null;

    let el = document.head.querySelector(`meta[name="${meta}"]`);
    if (el) {
      oldValue = el.getAttribute('content');
      el.setAttribute('content', value);
    } else {
      el = document.createElement('meta');
      el.setAttribute('name', meta);
      el.setAttribute('content', value);
      document.head.appendChild(el);
    }

    return story();
  };
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Polyfea Context',
  component: 'PolyfeaContext',
  tags: ['autodocs'],
  decorators: [metaEditDecorator('polyfea.backend', 'static://')],
  render: (args: props) => html` <polyfea-context context-name="${args.contextName}" .take="${args.take}"> </polyfea-context> `,
  argTypes: {
    contextName: { control: 'text' },
    take: { control: 'number' },
  },
  args: {
    contextName: 'welcome',
  },
  parameters: {
    docs: {
      subtitle: '<polyfea-context> is a web component that provides a context for Polyfea applications.</p>',
      description: {
        component:
          'The `<polyfea-context>` component is used to define a context within a Polyfea application. ' +
          'It allows you to specify a context name and configure how many items to take from the context. ' +
          'This component is the core component that enables composition of the polyfea microfrontend web components.',
      },
    },
  },
  beforeEach: async () => {
    (globalThis as any).polyfea = undefined;
  },
};

export default meta;
type Story = StoryObj<props>;

export const SimpleHello: Story = {
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;

    await step('it shall find the polyfea-context element', async () => {
      await waitFor(
        async () => {
          const contextElement = canvasElement.querySelector('polyfea-context');
          await expect(contextElement).toBeTruthy();
          contextElementShadow = contextElement?.shadowRoot || null;
          expect(contextElementShadow).toBeTruthy();
        },
        {
          timeout: 3000,
        },
      );
    });

    await step('it shall display style element', async () => {
      // style, welcome-element, input
      await waitFor(
        async () => {
          const style = contextElementShadow!.querySelector('style');
          await expect(style).toBeTruthy();
        },
        {
          timeout: 3000,
        },
      );
    });

    await step('it shall display the welcome-element', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;

      const welcomeElement = await withinShadow(contextElement!).findByShadowText('Ahoj polyfea');
      await expect(welcomeElement).toBeTruthy();
      await expect(welcomeElement?.getAttribute('welcome')).toBe('Ahoj');
      await expect(welcomeElement?.getAttribute('context')).toBe('welcome');
      await expect(welcomeElement?.getAttribute('id')).toBe('welcome-welcome-element-0');
      await expect(welcomeElement).toHaveStyle('background-color: rgb(0, 0, 255);');
      await expect(welcomeElement).toHaveTextContent('Ahoj polyfea');
    });

    await step('it shall display the  input element', async () => {
      const inputElement = contextElementShadow!.querySelector('input');
      await expect(inputElement).toBeTruthy();
      await expect(inputElement?.getAttribute('context')).toBe('welcome');
      await expect(inputElement).toHaveAttribute('value', 'This is a welcome context area rendered by Polyfea!');
      await expect(inputElement).toHaveStyle('color: rgb(0, 128, 0); font-size: 20px;');
    });

    await step('it shall reflect attributes to properties', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context');
      await expect(contextElement).toHaveProperty('contextName', 'welcome');
      await expect(contextElement).toHaveProperty('name', 'welcome');
      await expect(contextElement).toHaveProperty('take');
      await expect(contextElement).toHaveProperty('extraAttributes');
      await expect(contextElement).toHaveProperty('extraStyle');
    });
  },
};

export const Take1WithExtra: Story = {
  render: (args: props) =>
    html`
      <polyfea-context
        id="vitaj"
        context-name="${args.contextName}"
        take="1"
        extra-who="developer"
        extra-style="color: white;"
        extra-attributes='{"welcome": "Vitaj"}'
      ></polyfea-context>
    `,
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;

    await step('it shall find the polyfea-context element', async () => {
      await waitFor(
        async () => {
          const contextElement = canvasElement.querySelector('polyfea-context');
          await expect(contextElement).toBeTruthy();
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        {
          timeout: 5000,
        },
      );
    });

    await step('it shall display style element', async () => {
      // style, welcome-element, input
      await waitFor(
        async () => {
          const style = contextElementShadow!.querySelector('style');
          await expect(style).toBeTruthy();
        },
        {
          timeout: 5000,
        },
      );
    });

    await step('it shall display the welcome-element', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      await expect(contextElement).toBeTruthy();
      const welcomeElement = await withinShadow(contextElement!).findByShadowText('Vitaj developer');
      await expect(welcomeElement).toBeTruthy();
      await expect(welcomeElement?.getAttribute('id')).toBe('vitaj-welcome-element-0');
      await expect(welcomeElement?.getAttribute('welcome')).toBe('Vitaj');
      await expect(welcomeElement?.getAttribute('context')).toBe('welcome');
      await expect(welcomeElement?.getAttribute('who')).toBe('developer');
      await expect(welcomeElement).toHaveStyle('color: rgb(255, 255, 255);');
      await expect(welcomeElement).toHaveTextContent('Vitaj developer');
      await expect(welcomeElement).toHaveStyle('background-color: rgb(0, 0, 255);');
    });

    await step('it shall not display the input element', async () => {
      const input = contextElementShadow!.querySelector('input');
      await expect(input).toBeFalsy();
    });
  },
};

export const TEST_CyclicContext: Story = {
  tags: ['test'],
  name: '🧪 Cyclic Context',

  decorators: [metaEditDecorator('polyfea.backend', '/polyfea'), metaEditDecorator('polyfea-backend-retries', '1'), metaEditDecorator('polyfea-backend-retry-timer', '250')],
  render: (args: props) => html`
    <polyfea-context context-name="cyclic" verbosity="verbose">
      <div>Tested empty context is empty</div>
      <div slot="error">Testable Error while loading context</div>
    </polyfea-context>
  `,
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;

    await step(`it shall render cyclic error if context cycle is detected`, async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      await waitFor(
        async () => {
          await expect(contextElement).toHaveAttribute('context-name', 'cyclic');
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          let cyclic = contextElementShadow!.querySelector('cyclic-element');
          await expect(cyclic).toBeTruthy();
          const nested = cyclic!.shadowRoot!.querySelector('polyfea-context');
          await expect(nested).toBeTruthy();
          await expect(nested).toHaveAttribute('error');
          let slot = nested?.shadowRoot?.querySelector('slot[name="error"]');
          await expect(slot).toBeTruthy();
          const nodes = (slot! as any).assignedNodes();
          await expect(nodes).toHaveLength(1);
        },
        { timeout: 5000 },
      );
    });
  },
};

export const TEST_ContextLoadsWithError: Story = {
  tags: ['test'],
  name: '🧪 Context error and reload',

  decorators: [metaEditDecorator('polyfea.backend', '/polyfea'), metaEditDecorator('polyfea-backend-retries', '1'), metaEditDecorator('polyfea-backend-retry-timer', '250')],
  render: (args: props) => html`
    <polyfea-context context-name="error" verbosity="verbose">
      <div>Tested empty context is empty</div>
      <div slot="error">Testable Error while loading context</div>
    </polyfea-context>
  `,
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;

    await step(`it shall render error slot if context loading fails`, async () => {
      let contextElement: PolyfeaContext;
      await waitFor(
        async () => {
          contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
          await expect(contextElement).toBeTruthy();
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 3000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement!).toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeTruthy();
          const nodes = (slot! as any).assignedNodes();
          await expect(nodes).toHaveLength(1);
          await expect(nodes[0]).toHaveTextContent('Testable Error while loading context');
          slot = contextElementShadow!.querySelector('slot:not([name])');
          await expect(slot).toBeFalsy();
        },
        { timeout: 5000 },
      );
    });

    await step(`it shall render default slot if context loading succeeds and context is empty`, async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      contextElement.contextName = 'empty';
      await waitFor(
        async () => {
          await expect(contextElement).toHaveAttribute('context-name', 'empty');
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement).not.toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeFalsy();
        },
        { timeout: 2000 },
      );
      await waitFor(
        async () => {
          let slot = contextElementShadow!.querySelector('slot:not([name])');
          await expect(slot).toBeTruthy();
          const nodes = (slot! as any).assignedNodes();
          await expect(nodes.length).toBeGreaterThan(0);
          let found = false;
          for (const node of nodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              await expect(el).toHaveTextContent('Tested empty context is empty');
              found = true;
            }
          }
          await expect(found).toBe(true);
        },
        { timeout: 2000 },
      );
    });
  },
};

export const TEST_EmptyContext: Story = {
  tags: ['test'],
  name: '🧪 Context with no elements',

  decorators: [metaEditDecorator('polyfea.backend', '/polyfea'), metaEditDecorator('polyfea-backend-retries', '1'), metaEditDecorator('polyfea-backend-retry-timer', '250')],
  render: (args: props) => html`
    <polyfea-context context-name="empty" verbosity="verbose">
      <div>Tested empty context is empty</div>
      <div slot="error">Testable Error while loading context</div>
    </polyfea-context>
  `,
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;

    await step(`it shall render default slot if context loading succeeds and context is empty`, async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      contextElement.contextName = 'empty';
      await waitFor(
        async () => {
          await expect(contextElement).toHaveAttribute('context-name', 'empty');
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement).not.toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeFalsy();
        },
        { timeout: 2000 },
      );
      await waitFor(
        async () => {
          let slot = contextElementShadow!.querySelector('slot:not([name])');
          await expect(slot).toBeTruthy();
          const nodes = (slot! as any).assignedNodes();
          await expect(nodes.length).toBeGreaterThan(0);
          let found = false;
          for (const node of nodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              await expect(el).toHaveTextContent('Tested empty context is empty');
              found = true;
            }
          }
          await expect(found).toBe(true);
        },
        { timeout: 2000 },
      );
    });
  },
};

export const TEST_Navigation: Story = {
  tags: ['test'],
  name: '🧪 Navigation',

  decorators: [metaEditDecorator('polyfea.backend', '/polyfea'), metaEditDecorator('polyfea-backend-retries', '1'), metaEditDecorator('polyfea-backend-retry-timer', '250')],
  render: (args: props) => html`
    <polyfea-context context-name="navigate" verbosity="verbose">
      <div>I feel alone</div>
      <div slot="error">Navigated to error</div>
    </polyfea-context>
  `,
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;
    const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;

    await step(`it shall render "somewhere" if path is not specific`, async () => {
      await waitFor(
        async () => {
          await expect(contextElement).toHaveAttribute('context-name', 'navigate');
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement).not.toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeFalsy();
        },
        { timeout: 2000 },
      );
      await waitFor(
        async () => {
          await within(contextElement!).findByShadowText('Welcome to somewhere');
          let el = contextElementShadow!.querySelector('welcome-element');
          await expect(el).toBeTruthy();
        },
        { timeout: 2000 },
      );
    });

    await step(`it shall render "Paris" if pushed state is france`, async () => {
      globalThis.history.pushState({}, '', '/france');
      await waitFor(
        async () => {
          await expect(contextElement).toHaveAttribute('context-name', 'navigate');
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement).not.toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeFalsy();
        },
        { timeout: 2000 },
      );
      await waitFor(
        async () => {
          await within(contextElement!).findByShadowText('Welcome to Paris');
          let el = contextElementShadow!.querySelector('welcome-element');
          await expect(el).toBeTruthy();
        },
        { timeout: 2000 },
      );
    });

    await step(`it shall render "Paris" if replaced state is germany`, async () => {
      globalThis.history.replaceState({}, '', '/germany');
      await waitFor(
        async () => {
          await expect(contextElement).toHaveAttribute('context-name', 'navigate');
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement).not.toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeFalsy();
        },
        { timeout: 2000 },
      );
      await waitFor(
        async () => {
          await within(contextElement!).findByShadowText('Welcome to Berlin');
          let el = contextElementShadow!.querySelector('welcome-element');
          await expect(el).toBeTruthy();
        },
        { timeout: 2000 },
      );
    });

    await step(`it shall render "somewhere" if going back`, async () => {
      globalThis.history.back();
      await waitFor(
        async () => {
          await expect(contextElement).toHaveAttribute('context-name', 'navigate');
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement).not.toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeFalsy();
        },
        { timeout: 2000 },
      );
      await waitFor(
        async () => {
          await within(contextElement!).findByShadowText('Welcome to somewhere');
          let el = contextElementShadow!.querySelector('welcome-element');
          await expect(el).toBeTruthy();
        },
        { timeout: 2000 },
      );
    });

    if (globalThis.navigation) {
      await step(`it shall render "Bratislava" if navigated state is germany`, async () => {
        globalThis.navigation!.navigate('/slovakia');
        await waitFor(
          async () => {
            await expect(contextElement).toHaveAttribute('context-name', 'navigate');
            contextElementShadow = contextElement?.shadowRoot || null;
            await expect(contextElementShadow).toBeTruthy();
          },
          { timeout: 5000 },
        );
        await waitFor(
          async () => {
            await expect(contextElement).not.toHaveAttribute('error');
            let slot = contextElementShadow!.querySelector('slot[name="error"]');
            await expect(slot).toBeFalsy();
          },
          { timeout: 2000 },
        );
        await waitFor(
          async () => {
            await within(contextElement!).findByShadowText('Welcome to Bratislava');
            let el = contextElementShadow!.querySelector('welcome-element');
            await expect(el).toBeTruthy();
          },
          { timeout: 2000 },
        );
      });
    }

    // reset location
    await step(`it shall reset location to /`, async () => {
      globalThis.history.replaceState({}, '/', '/');
      await waitFor(
        async () => {
          await expect(contextElement).not.toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeFalsy();
        },
        { timeout: 2000 },
      );
      await waitFor(
        async () => {
          await within(contextElement!).findByShadowText('Welcome to somewhere');
          let el = contextElementShadow!.querySelector('welcome-element');
          await expect(el).toBeTruthy();
        },
        { timeout: 2000 },
      );
    });
  },
};

export const TEST_PropertyChange: Story = {
  tags: ['test'],
  name: '🧪 Property Change',
  render: (args: props) =>
    html`
      <polyfea-context id="vitaj" context-name="welcome" take="1" extra-who="engineer" extra-style="color: white;" extra-attributes='{"welcome": "Zdravím"}'></polyfea-context>
    `,
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;

    await step('it shall find the polyfea-context element', async () => {
      await waitFor(
        async () => {
          const contextElement = canvasElement.querySelector('polyfea-context');
          await expect(contextElement).toBeTruthy();
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        {
          timeout: 5000,
        },
      );
    });

    await step('it shall display the welcome-element but not input ', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      await expect(contextElement).toBeTruthy();
      const welcomeElement = await withinShadow(contextElement!).findByShadowText('Zdravím engineer');
      await expect(welcomeElement).toBeTruthy();
      const input = contextElementShadow!.querySelector('input');
      await expect(input).toBeFalsy();
    });

    await step('it shall display also input element if take is changed to 5', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      await expect(contextElement).toBeTruthy();
      contextElement!.take = 5;
      await waitFor(
        async () => {
          const input = contextElementShadow!.querySelector('input');
          await expect(input).toBeTruthy();
        },
        {
          timeout: 5000,
        },
      );
      contextElement.take = 1;
    });

    await step('☂️ reflect change of name property', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      await expect(contextElement).toBeTruthy();
      contextElement!.name = 'welcome';
      contextElement!.removeAttribute('context-name');
      await expect(contextElement.name).toEqual('welcome');
    });
    await step('☂️ reflect change of extra-attributes property', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      await expect(contextElement).toBeTruthy();
      contextElement!.extraAttributes = { welcome: 'Hello' };
      const welcomeElement = await withinShadow(contextElement!).findByShadowText('Hello engineer');
      await expect(welcomeElement).toBeTruthy();
    });

    await step('☂️ reflect change of extra-style property', async () => {
      const contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
      await expect(contextElement).toBeTruthy();
      contextElement!.extraStyle = { color: 'rgb(255, 125, 255);' };
      const welcome = await withinShadow(contextElement!).findByShadowText('Hello engineer');
      await expect(welcome).toBeTruthy();
      await waitFor(async() => {
        let welcomeElement =contextElementShadow?.querySelector('welcome-element');
        await expect(welcomeElement).toHaveStyle('color: rgb(255, 125, 255);');
      }, {timeout: 3000});
    });
  },
};

export const TEST_ModuleResourceError: Story = {
  tags: ['test'],
  name: '🧪 Module Resource Error',

  decorators: [
    metaEditDecorator('polyfea.backend', '/polyfea'), 
    metaEditDecorator('polyfea-backend-retries', '1'), 
    metaEditDecorator('polyfea-backend-retry-timer', '250'),
  ],
  render: (args: props) => html`
    <polyfea-context context-name="module-error" verbosity="silent">
      <div>empty</div>
      <div slot="error">Testable error while loading context</div>
    </polyfea-context>
  `,
  play: async ({ canvasElement, userEvent, step }) => {
    const screen = within(canvasElement);
    let contextElementShadow: ShadowRoot | null = null;

    await step(`it shall render error slot if module loading report errors`, async () => {
      // microfrontends may be loaded in batches, we need to avoid one microfrontend is blocks loading of other ones
      // the errors are only logged to console
      let contextElement: PolyfeaContext;
      await waitFor(
        async () => {
          contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
          await expect(contextElement).toBeTruthy();
          contextElementShadow = contextElement?.shadowRoot || null;
          await expect(contextElementShadow).toBeTruthy();
        },
        { timeout: 3000 },
      );
      await waitFor(
        async () => {
          await expect(contextElement!).toHaveAttribute('error');
          let slot = contextElementShadow!.querySelector('slot[name="error"]');
          await expect(slot).toBeTruthy();  
        },
        { timeout: 5000 },
      );
    });
      await step(`it shall render context elements even if module fails `, async () => {
      let contextElement: PolyfeaContext;
      await waitFor(
        async () => {
          contextElement = canvasElement.querySelector('polyfea-context') as PolyfeaContext;
          await expect(contextElement).toBeTruthy();
          contextElementShadow = contextElement?.shadowRoot || null;
          const nix = contextElementShadow!.querySelector('nix-element');
          await expect(nix).toBeTruthy();
          const input = contextElementShadow!.querySelector('input');
          await expect(input).toBeTruthy();
        },
        { timeout: 3000 },
      );
      contextElement!.verbosity = PolyfeaContext.VERBOSITY_SILENT;
    });
  },
};
