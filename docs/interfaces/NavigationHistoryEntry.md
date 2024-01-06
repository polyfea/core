[@polyfea/core](../README.md) / [Exports](../modules.md) / NavigationHistoryEntry

# Interface: NavigationHistoryEntry

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigationHistoryEntry )

## Hierarchy

- `EventTarget`

  ↳ **`NavigationHistoryEntry`**

## Table of contents

### Properties

- [id](NavigationHistoryEntry.md#id)
- [index](NavigationHistoryEntry.md#index)
- [key](NavigationHistoryEntry.md#key)
- [sameDocument](NavigationHistoryEntry.md#samedocument)
- [url](NavigationHistoryEntry.md#url)

### Methods

- [addEventListener](NavigationHistoryEntry.md#addeventlistener)
- [dispatchEvent](NavigationHistoryEntry.md#dispatchevent)
- [getState](NavigationHistoryEntry.md#getstate)
- [removeEventListener](NavigationHistoryEntry.md#removeeventlistener)

## Properties

### id

• **id**: `string`

#### Defined in

[src/core/navigation.ts:192](https://github.com/polyfea/core/blob/b395591/src/core/navigation.ts#L192)

___

### index

• **index**: `number`

#### Defined in

[src/core/navigation.ts:193](https://github.com/polyfea/core/blob/b395591/src/core/navigation.ts#L193)

___

### key

• **key**: `string`

#### Defined in

[src/core/navigation.ts:194](https://github.com/polyfea/core/blob/b395591/src/core/navigation.ts#L194)

___

### sameDocument

• **sameDocument**: `boolean`

#### Defined in

[src/core/navigation.ts:195](https://github.com/polyfea/core/blob/b395591/src/core/navigation.ts#L195)

___

### url

• **url**: `string`

#### Defined in

[src/core/navigation.ts:196](https://github.com/polyfea/core/blob/b395591/src/core/navigation.ts#L196)

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

### getState

▸ **getState**(): `any`

#### Returns

`any`

#### Defined in

[src/core/navigation.ts:198](https://github.com/polyfea/core/blob/b395591/src/core/navigation.ts#L198)

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
