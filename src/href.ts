/**
 * The `href` function can be used to augment anchor elements to programmatically invoke Navigation.navigate.
 * It returns an object with a `href` property and an `onclick` event handler.
 * 
 * The `href` property is set to the value of `url` parameter.
 * 
 * The `onclick` event handler prevents the default action, then checks if the global `navigation` object exists.
 
 * If it does exist, it uses the `navigate` method of the `navigation` API to navigate to the provided URL.
 * If it does not exist, it uses the History API's `pushState` method to change the current URL to the provided URL.
 * 
 * @remarks 
 * 
 * The (@see NavigationPolyfill ) class does not capture user initiated navigation by itself, and do not apply this function
 *  on all possible navigation elements. It is up to the application developer to decide which elements should be augmented with this function.
 * This function can be used to augment anchor elements in the way the Navigation.navigate is invoked programmatically. On the other hand this 
 * functionality should be obsolete if the browser supports Navigation API natively.
 *
 * @example
 * 
 * ```typescript
 * import { href } from "@polyfea/navigation";
 * 
 * render() { 
 *  return <a {...href("/some/url")}>link</a>
 * }
 * ```
 * 
 * @param url - The URL to navigate to when the `onclick` event is triggered.
 * @returns An object with a `href` property and an `onclick` event handler.
 */
export function href(url: string | URL): { href: string; onclick: (event: Event) => void } {
  return {
    href: document.location.href,
    onclick: (event: Event) => {
      event.preventDefault();
      if (!globalThis.navigation) {
        globalThis.history.pushState(undefined, '', url);
      } else {
        globalThis.navigation.navigate(url);
      }
    },
  };
}