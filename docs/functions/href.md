[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / href

# Function: href()

> **href**(`url`): `object`

Defined in: [src/href.ts:32](https://github.com/polyfea/core/blob/main/src/href.ts#L32)

The `href` function can be used to augment anchor elements to programmatically invoke Navigation.navigate.
It returns an object with a `href` property and an `onclick` event handler.

The `href` property is set to the value of `url` parameter.

The `onclick` event handler prevents the default action, then checks if the global `navigation` object exists.

If it does exist, it uses the `navigate` method of the `navigation` API to navigate to the provided URL.
If it does not exist, it uses the History API's `pushState` method to change the current URL to the provided URL.

## Parameters

### url

The URL to navigate to when the `onclick` event is triggered.

`string` | `URL`

## Returns

`object`

An object with a `href` property and an `onclick` event handler.

### href

> **href**: `string`

### onclick()

> **onclick**: (`event`) => `void`

#### Parameters

##### event

`Event`

#### Returns

`void`

## Remarks

The (@see NavigationPolyfill ) class does not capture user initiated navigation by itself, and do not apply this function
 on all possible navigation elements. It is up to the application developer to decide which elements should be augmented with this function.
This function can be used to augment anchor elements in the way the Navigation.navigate is invoked programmatically. On the other hand this 
functionality should be obsolete if the browser supports Navigation API natively.

## Example

```typescript
import { href } from "@polyfea/navigation";

render() { 
 return <a {...href("/some/url")}>link</a>
}
```
