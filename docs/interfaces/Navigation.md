[@polyfea/core](../README.md) / [Exports](../modules.md) / Navigation

# Interface: Navigation

The Navigation interface represents the state and the methods to manipulate the browser session history.

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation](https://developer.mozilla.org/en-US/docs/Web/API/Navigation)

## Hierarchy

- `EventTarget`

  ↳ **`Navigation`**

## Table of contents

### Properties

- [canGoBack](Navigation.md#cangoback)
- [canGoForward](Navigation.md#cangoforward)
- [currentEntry](Navigation.md#currententry)
- [transition](Navigation.md#transition)

### Methods

- [addEventListener](Navigation.md#addeventlistener)
- [back](Navigation.md#back)
- [dispatchEvent](Navigation.md#dispatchevent)
- [entries](Navigation.md#entries)
- [forward](Navigation.md#forward)
- [navigate](Navigation.md#navigate)
- [reload](Navigation.md#reload)
- [removeEventListener](Navigation.md#removeeventlistener)
- [traverseTo](Navigation.md#traverseto)
- [updateCurrentEntry](Navigation.md#updatecurrententry)

## Properties

### canGoBack

• `Readonly` **canGoBack**: `boolean`

Returns a Boolean indicating whether the session history contains a previous entry, meaning that the "back" method can be used.

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoBack](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoBack)

#### Defined in

[src/core/navigation.ts:26](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L26)

___

### canGoForward

• `Readonly` **canGoForward**: `boolean`

Returns a Boolean indicating whether the session history contains a next entry, meaning that the "forward" method can be used.

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoForward](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoForward)

#### Defined in

[src/core/navigation.ts:32](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L32)

___

### currentEntry

• `Readonly` **currentEntry**: [`NavigationHistoryEntry`](NavigationHistoryEntry.md)

Represents the current entry in the session history.

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/currentEntry](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/currentEntry)

#### Defined in

[src/core/navigation.ts:20](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L20)

___

### transition

• `Readonly` **transition**: [`NavigationTransistion`](NavigationTransistion.md)

Represents the current navigation transition.

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/transition](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/transition)

#### Defined in

[src/core/navigation.ts:38](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L38)

## Methods

### addEventListener

▸ **addEventListener**(`type`, `callback`, `options?`): `void`

Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.

The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.

When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.

When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.

When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.

If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.

The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `callback` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

EventTarget.addEventListener

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8211

___

### back

▸ **back**(): `Object`

Navigates to the previous entry in the session history, if there is one.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `commited` | `Promise`\<`void`\> |
| `finished` | `Promise`\<`void`\> |

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/back](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/back)

#### Defined in

[src/core/navigation.ts:64](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L64)

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `boolean`

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`boolean`

#### Inherited from

EventTarget.dispatchEvent

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8217

___

### entries

▸ **entries**(): [`NavigationHistoryEntry`](NavigationHistoryEntry.md)[]

Returns an array of all entries in the session history.

#### Returns

[`NavigationHistoryEntry`](NavigationHistoryEntry.md)[]

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/entries](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/entries)

#### Defined in

[src/core/navigation.ts:44](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L44)

___

### forward

▸ **forward**(`info?`): `Object`

Navigates to the next entry in the session history, if there is one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `info?` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `commited` | `Promise`\<`void`\> |
| `finished` | `Promise`\<`void`\> |

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/forward](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/forward)

#### Defined in

[src/core/navigation.ts:70](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L70)

___

### navigate

▸ **navigate**(`destination`, `options?`): `Object`

Navigates to the specified URL.

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `string` \| `URL` |
| `options?` | `Object` |
| `options.history?` | ``"replace"`` \| ``"push"`` \| ``"auto"`` |
| `options.info?` | `any` |
| `options.replace?` | `boolean` |
| `options.state?` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `commited` | `Promise`\<`void`\> |
| `finished` | `Promise`\<`void`\> |

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate)

#### Defined in

[src/core/navigation.ts:50](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L50)

___

### reload

▸ **reload**(`info?`): `Object`

Reloads the current entry in the session history.

#### Parameters

| Name | Type |
| :------ | :------ |
| `info?` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `commited` | `Promise`\<`void`\> |
| `finished` | `Promise`\<`void`\> |

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/reload](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/reload)

#### Defined in

[src/core/navigation.ts:76](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L76)

___

### removeEventListener

▸ **removeEventListener**(`type`, `callback`, `options?`): `void`

Removes the event listener in target's event listener list with the same type, callback, and options.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `callback` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

EventTarget.removeEventListener

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8223

___

### traverseTo

▸ **traverseTo**(`key`, `options?`): `Object`

Navigates to a specific entry in the session history.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options?` | `Object` |
| `options.info` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `commited` | `Promise`\<`void`\> |
| `finished` | `Promise`\<`void`\> |

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/traverseTo](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/traverseTo)

#### Defined in

[src/core/navigation.ts:82](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L82)

___

### updateCurrentEntry

▸ **updateCurrentEntry**(`options?`): `any`

Updates the current entry in the session history.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.state` | `any` |

#### Returns

`any`

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/updateCurrentEntry](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/updateCurrentEntry)

#### Defined in

[src/core/navigation.ts:88](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L88)
