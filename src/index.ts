export { Polyfea } from "./polyfea";
export * from "./navigation";
export { PolyfeaContext } from "./polyfea-context";
export { href } from "./href";

// re-export browser-api types
export type { ContextArea, ElementSpec } from '@polyfea/browser-api';

declare global {
  interface CustomElementRegistry {
    /**
         * Register lazy custom element. The element module will be loaded when first used in DOM.
         * 
     * @param tagName tag name of the custom element
     * @param loadFn either URL string to the module to import dynamically 
     *   or function returning a Promise resolving when the module is loaded (typically dynamic import). 
     *   Use lambda function if you intend to use relative path.
     */
    defineLazy(tagName: string, loadFn: string | (() => Promise<unknown>)): void;
  }
}