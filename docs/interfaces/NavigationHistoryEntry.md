[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / NavigationHistoryEntry

# Interface: NavigationHistoryEntry

Defined in: [src/navigation.ts:206](https://github.com/polyfea/core/blob/main/src/navigation.ts#L206)

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigationHistoryEntry )

## Extends

- `EventTarget`

## Properties

### id

> **id**: `string`

Defined in: [src/navigation.ts:207](https://github.com/polyfea/core/blob/main/src/navigation.ts#L207)

***

### index

> **index**: `number`

Defined in: [src/navigation.ts:208](https://github.com/polyfea/core/blob/main/src/navigation.ts#L208)

***

### key

> **key**: `string`

Defined in: [src/navigation.ts:209](https://github.com/polyfea/core/blob/main/src/navigation.ts#L209)

***

### sameDocument

> **sameDocument**: `boolean`

Defined in: [src/navigation.ts:210](https://github.com/polyfea/core/blob/main/src/navigation.ts#L210)

***

### url

> **url**: `string`

Defined in: [src/navigation.ts:211](https://github.com/polyfea/core/blob/main/src/navigation.ts#L211)

## Methods

### addEventListener()

> **addEventListener**(`type`, `callback`, `options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11569

The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

#### Parameters

##### type

`string`

##### callback

`EventListenerOrEventListenerObject` | `null`

##### options?

`boolean` | `AddEventListenerOptions`

#### Returns

`void`

#### Inherited from

`EventTarget.addEventListener`

***

### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11575

The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

#### Parameters

##### event

`Event`

#### Returns

`boolean`

#### Inherited from

`EventTarget.dispatchEvent`

***

### getState()

> **getState**(): `any`

Defined in: [src/navigation.ts:213](https://github.com/polyfea/core/blob/main/src/navigation.ts#L213)

#### Returns

`any`

***

### removeEventListener()

> **removeEventListener**(`type`, `callback`, `options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:11581

The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

#### Parameters

##### type

`string`

##### callback

`EventListenerOrEventListenerObject` | `null`

##### options?

`boolean` | `EventListenerOptions`

#### Returns

`void`

#### Inherited from

`EventTarget.removeEventListener`
