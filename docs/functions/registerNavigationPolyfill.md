[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / registerNavigationPolyfill

# Function: registerNavigationPolyfill()

> **registerNavigationPolyfill**(`raiseHistoryPopState`): [`Navigation`](../interfaces/Navigation.md)

Defined in: [src/navigation.ts:254](https://github.com/polyfea/core/blob/main/src/navigation.ts#L254)

The `registerNavigationPolyfill` function is used to register the (Navigation API)[https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API] Polyfill
if it is not provided on the window.

## Parameters

### raiseHistoryPopState

`boolean` = `false`

A boolean indicating whether to raise the 'popstate' event on the window object when the history changes. Default is `false`.
It is useful if you want to get popstate notification on history.pushstate but is nonstandard behavior.

## Returns

[`Navigation`](../interfaces/Navigation.md)

## Remarks

The polyfill supports programmatic navigation via the Navigation or History API, but can't capture user-initiated navigation. It's a compromise between
a full polyfill and native implementation, allowing SPA developers to use Navigation API events for navigation logic, while augmenting elements with
programmatic handlers to capture navigation requests.
