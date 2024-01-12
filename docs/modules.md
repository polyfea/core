[@polyfea/core](README.md) / Exports

# @polyfea/core

## Table of contents

### Classes

- [NavigateEvent](classes/NavigateEvent.md)
- [NavigationCurrentEntryChangeEvent](classes/NavigationCurrentEntryChangeEvent.md)
- [NavigationDestination](classes/NavigationDestination.md)
- [Polyfea](classes/Polyfea.md)

### Interfaces

- [Navigation](interfaces/Navigation.md)
- [NavigationHistoryEntry](interfaces/NavigationHistoryEntry.md)
- [NavigationTransistion](interfaces/NavigationTransistion.md)

### Functions

- [href](modules.md#href)
- [registerNavigationPolyfill](modules.md#registernavigationpolyfill)
- [unregisterNavigationPolyfill](modules.md#unregisternavigationpolyfill)

## Functions

### href

▸ **href**(`url`): `Object`

The `href` function can be used to augment anchor elements to programmatically invoke Navigation.navigate.
It returns an object with a `href` property and an `onclick` event handler.

The `href` property is set to the value of `url` parameter.

The `onclick` event handler prevents the default action, then checks if the global `navigation` object exists.

If it does exist, it uses the `navigate` method of the `navigation` API to navigate to the provided URL.
If it does not exist, it uses the History API's `pushState` method to change the current URL to the provided URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` \| `URL` | The URL to navigate to when the `onclick` event is triggered. |

#### Returns

`Object`

An object with a `href` property and an `onclick` event handler.

| Name | Type |
| :------ | :------ |
| `href` | `string` |
| `onclick` | (`event`: `Event`) => `void` |

**`Remarks`**

The (@see NavigationPolyfill ) class does not capture user initiated navigation by itself, and do not apply this function
 on all possible navigation elements. It is up to the application developer to decide which elements should be augmented with this function.
This function can be used to augment anchor elements in the way the Navigation.navigate is invoked programmatically.

The (@see NavigationPolyfill ) class doesn't automatically capture user-initiated navigation. Application developers must decide 
which elements to augment with this function. It can be used to programmatically invoke `Navigation.navigate()` on anchor(-like) elements.

**`Example`**

```typescript
import { href } from "@polyfea/navigation";

render() { 
 return <a {...href("/some/url")}>link</a>
}
```

#### Defined in

[src/core/navigation.ts:254](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L254)

___

### registerNavigationPolyfill

▸ **registerNavigationPolyfill**(`raiseHistoryPopState?`): [`Navigation`](interfaces/Navigation.md)

The `registerNavigationPolyfill` function is used to register the (Navigation API)[https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API] Polyfill 
if it is not provided on the window.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `raiseHistoryPopState` | `boolean` | `false` | A boolean indicating whether to raise the 'popstate' event on the window object when the history changes. Default is `false`. It is useful if you want to get popstate notification on history.pushstate but is nonstandard behavior. |

#### Returns

[`Navigation`](interfaces/Navigation.md)

**`Remarks`**

The polyfill supports programmatic navigation via the Navigation or History API, but can't capture user-initiated navigation. It's a compromise between 
a full polyfill and native implementation, allowing SPA developers to use Navigation API events for navigation logic, while augmenting elements with 
programmatic handlers to capture navigation requests.

#### Defined in

[src/core/navigation.ts:283](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L283)

___

### unregisterNavigationPolyfill

▸ **unregisterNavigationPolyfill**(): `void`

The `unregisterNavigationPolyfill` function is used to remove  (Navigation API)[https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API] Polyfill 
if it is provided on the window. Used in tests to clean up the global state.

#### Returns

`void`

#### Defined in

[src/core/navigation.ts:291](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L291)
