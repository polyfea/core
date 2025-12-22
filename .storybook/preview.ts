import type { Preview } from "@storybook/web-components-vite";
import "./browser-test-setup";
import { initialize, mswLoader } from "msw-storybook-addon";
import { within as withinShadow } from "shadow-dom-testing-library";

import { globalHandlers } from "./msw-handlers/index.js";
import { setupWorker } from "msw/browser";
import "./canvas.css";

import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";

initialize();

setCustomElementsManifest(customElements);

if (
  typeof globalThis.process === "undefined" ||
  globalThis.process.env.STORYBOOK_ENV !== "nodejs"
) {
  const worker = setupWorker(...globalHandlers);
  worker
    .start({
      onUnhandledRequest: "bypass",
    })
    .then(() => console.log("MSW Worker started globally."));
}


const preview: Preview = {
  beforeEach({ canvasElement, canvas }) {
    Object.assign(canvas, { ...withinShadow(canvasElement) });
    import("../src/boot");
  },
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: globalHandlers,
    },
  },
  loaders: [mswLoader],
};

export default preview;
export type ShadowQueries = ReturnType<typeof withinShadow>;

declare module "storybook/internal/csf" {
  interface Canvas extends ShadowQueries {}
}


