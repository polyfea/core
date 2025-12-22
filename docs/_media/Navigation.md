[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / Navigation

# Interface: Navigation

Defined in: [src/navigation.ts:15](https://github.com/polyfea/core/blob/main/src/navigation.ts#L15)

The Navigation interface represents the state and the methods to manipulate the browser session history.

## See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation](https://developer.mozilla.org/en-US/docs/Web/API/Navigation)

## Extends

- `EventTarget`

## Properties

### canGoBack

> `readonly` **canGoBack**: `boolean`

Defined in: [src/navigation.ts:26](https://github.com/polyfea/core/blob/main/src/navigation.ts#L26)

Returns a Boolean indicating whether the session history contains a previous entry, meaning that the "back" method can be used.

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoBack](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoBack)

***

### canGoForward

> `readonly` **canGoForward**: `boolean`

Defined in: [src/navigation.ts:32](https://github.com/polyfea/core/blob/main/src/navigation.ts#L32)

Returns a Boolean indicating whether the session history contains a next entry, meaning that the "forward" method can be used.

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoForward](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/canGoForward)

***

### currentEntry

> `readonly` **currentEntry**: [`NavigationHistoryEntry`](NavigationHistoryEntry.md)

Defined in: [src/navigation.ts:20](https://github.com/polyfea/core/blob/main/src/navigation.ts#L20)

Represents the current entry in the session history.

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/currentEntry](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/currentEntry)

***

### transition

> `readonly` **transition**: [`NavigationTransistion`](NavigationTransistion.md)

Defined in: [src/navigation.ts:38](https://github.com/polyfea/core/blob/main/src/navigation.ts#L38)

Represents the current navigation transition.

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/transition](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/transition)

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

### back()

> **back**(): `object`

Defined in: [src/navigation.ts:64](https://github.com/polyfea/core/blob/main/src/navigation.ts#L64)

Navigates to the previous entry in the session history, if there is one.

#### Returns

`object`

##### commited

> **commited**: `Promise`\<`void`\>

##### finished

> **finished**: `Promise`\<`void`\>

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/back](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/back)

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

### entries()

> **entries**(): [`NavigationHistoryEntry`](NavigationHistoryEntry.md)[]

Defined in: [src/navigation.ts:44](https://github.com/polyfea/core/blob/main/src/navigation.ts#L44)

Returns an array of all entries in the session history.

#### Returns

[`NavigationHistoryEntry`](NavigationHistoryEntry.md)[]

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/entries](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/entries)

***

### forward()

> **forward**(`info?`): `object`

Defined in: [src/navigation.ts:70](https://github.com/polyfea/core/blob/main/src/navigation.ts#L70)

Navigates to the next entry in the session history, if there is one.

#### Parameters

##### info?

`any`

#### Returns

`object`

##### commited

> **commited**: `Promise`\<`void`\>

##### finished

> **finished**: `Promise`\<`void`\>

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/forward](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/forward)

***

### navigate()

> **navigate**(`destination`, `options?`): `object`

Defined in: [src/navigation.ts:50](https://github.com/polyfea/core/blob/main/src/navigation.ts#L50)

Navigates to the specified URL.

#### Parameters

##### destination

`string` | `URL`

##### options?

###### history?

`"push"` \| `"auto"` \| `"replace"`

###### info?

`any`

###### replace?

`boolean`

###### state?

`any`

#### Returns

`object`

##### commited

> **commited**: `Promise`\<`void`\>

##### finished

> **finished**: `Promise`\<`void`\>

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate)

***

### reload()

> **reload**(`info?`): `object`

Defined in: [src/navigation.ts:76](https://github.com/polyfea/core/blob/main/src/navigation.ts#L76)

Reloads the current entry in the session history.

#### Parameters

##### info?

`any`

#### Returns

`object`

##### commited

> **commited**: `Promise`\<`void`\>

##### finished

> **finished**: `Promise`\<`void`\>

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/reload](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/reload)

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

***

### traverseTo()

> **traverseTo**(`key`, `options?`): `object`

Defined in: [src/navigation.ts:82](https://github.com/polyfea/core/blob/main/src/navigation.ts#L82)

Navigates to a specific entry in the session history.

#### Parameters

##### key

`string`

##### options?

###### info

`any`

#### Returns

`object`

##### commited

> **commited**: `Promise`\<`void`\>

##### finished

> **finished**: `Promise`\<`void`\>

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/traverseTo](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/traverseTo)

***

### updateCurrentEntry()

> **updateCurrentEntry**(`options?`): `void`

Defined in: [src/navigation.ts:91](https://github.com/polyfea/core/blob/main/src/navigation.ts#L91)

Updates the current entry in the session history.

#### Parameters

##### options?

###### state

`any`

#### Returns

`void`

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/Navigation/updateCurrentEntry](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/updateCurrentEntry)
