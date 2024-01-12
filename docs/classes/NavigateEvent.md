[@polyfea/core](../README.md) / [Exports](../modules.md) / NavigateEvent

# Class: NavigateEvent

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )

## Hierarchy

- `Event`

  ↳ **`NavigateEvent`**

## Table of contents

### Constructors

- [constructor](NavigateEvent.md#constructor)

### Properties

- [AT\_TARGET](NavigateEvent.md#at_target)
- [BUBBLING\_PHASE](NavigateEvent.md#bubbling_phase)
- [CAPTURING\_PHASE](NavigateEvent.md#capturing_phase)
- [NONE](NavigateEvent.md#none)
- [bubbles](NavigateEvent.md#bubbles)
- [canIntercept](NavigateEvent.md#canintercept)
- [cancelBubble](NavigateEvent.md#cancelbubble)
- [cancelable](NavigateEvent.md#cancelable)
- [composed](NavigateEvent.md#composed)
- [currentTarget](NavigateEvent.md#currenttarget)
- [defaultPrevented](NavigateEvent.md#defaultprevented)
- [destination](NavigateEvent.md#destination)
- [downloadRequest](NavigateEvent.md#downloadrequest)
- [eventPhase](NavigateEvent.md#eventphase)
- [formData](NavigateEvent.md#formdata)
- [hashChange](NavigateEvent.md#hashchange)
- [interceptPromises](NavigateEvent.md#interceptpromises)
- [isTrusted](NavigateEvent.md#istrusted)
- [returnValue](NavigateEvent.md#returnvalue)
- [srcElement](NavigateEvent.md#srcelement)
- [target](NavigateEvent.md#target)
- [timeStamp](NavigateEvent.md#timestamp)
- [transition](NavigateEvent.md#transition)
- [type](NavigateEvent.md#type)
- [userInitiated](NavigateEvent.md#userinitiated)
- [AT\_TARGET](NavigateEvent.md#at_target-1)
- [BUBBLING\_PHASE](NavigateEvent.md#bubbling_phase-1)
- [CAPTURING\_PHASE](NavigateEvent.md#capturing_phase-1)
- [NONE](NavigateEvent.md#none-1)

### Accessors

- [signal](NavigateEvent.md#signal)

### Methods

- [composedPath](NavigateEvent.md#composedpath)
- [initEvent](NavigateEvent.md#initevent)
- [intercept](NavigateEvent.md#intercept)
- [preventDefault](NavigateEvent.md#preventdefault)
- [stopImmediatePropagation](NavigateEvent.md#stopimmediatepropagation)
- [stopPropagation](NavigateEvent.md#stoppropagation)

## Constructors

### constructor

• **new NavigateEvent**(`transition`, `from`): [`NavigateEvent`](NavigateEvent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition` | `TransitionRequest` |
| `from` | [`NavigationHistoryEntry`](../interfaces/NavigationHistoryEntry.md) |

#### Returns

[`NavigateEvent`](NavigateEvent.md)

#### Overrides

Event.constructor

#### Defined in

[src/core/navigation.ts:116](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L116)

## Properties

### AT\_TARGET

• `Readonly` **AT\_TARGET**: ``2``

#### Inherited from

Event.AT\_TARGET

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8100

___

### BUBBLING\_PHASE

• `Readonly` **BUBBLING\_PHASE**: ``3``

#### Inherited from

Event.BUBBLING\_PHASE

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8101

___

### CAPTURING\_PHASE

• `Readonly` **CAPTURING\_PHASE**: ``1``

#### Inherited from

Event.CAPTURING\_PHASE

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8099

___

### NONE

• `Readonly` **NONE**: ``0``

#### Inherited from

Event.NONE

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8098

___

### bubbles

• `Readonly` **bubbles**: `boolean`

Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### Inherited from

Event.bubbles

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:7995

___

### canIntercept

• `Readonly` **canIntercept**: `boolean`

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )

#### Defined in

[src/core/navigation.ts:137](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L137)

___

### cancelBubble

• **cancelBubble**: `boolean`

**`Deprecated`**

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### Inherited from

Event.cancelBubble

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8001

___

### cancelable

• `Readonly` **cancelable**: `boolean`

Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### Inherited from

Event.cancelable

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8007

___

### composed

• `Readonly` **composed**: `boolean`

Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### Inherited from

Event.composed

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8013

___

### currentTarget

• `Readonly` **currentTarget**: `EventTarget`

Returns the object whose event listener's callback is currently being invoked.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### Inherited from

Event.currentTarget

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8019

___

### defaultPrevented

• `Readonly` **defaultPrevented**: `boolean`

Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### Inherited from

Event.defaultPrevented

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8025

___

### destination

• `Readonly` **destination**: [`NavigationDestination`](NavigationDestination.md)

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )

#### Defined in

[src/core/navigation.ts:133](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L133)

___

### downloadRequest

• `Readonly` **downloadRequest**: `string` = `null`

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
 always null in this polyfill

#### Defined in

[src/core/navigation.ts:142](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L142)

___

### eventPhase

• `Readonly` **eventPhase**: `number`

Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### Inherited from

Event.eventPhase

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8031

___

### formData

• `Readonly` **formData**: `FormData` = `null`

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
 always null in this polyfill

#### Defined in

[src/core/navigation.ts:147](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L147)

___

### hashChange

• `Readonly` **hashChange**: `boolean` = `false`

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
 always false in this polyfill

#### Defined in

[src/core/navigation.ts:152](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L152)

___

### interceptPromises

• **interceptPromises**: `Promise`\<`void`\>[] = `[]`

#### Defined in

[src/core/navigation.ts:114](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L114)

___

### isTrusted

• `Readonly` **isTrusted**: `boolean`

Returns true if event was dispatched by the user agent, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### Inherited from

Event.isTrusted

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8037

___

### returnValue

• **returnValue**: `boolean`

**`Deprecated`**

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### Inherited from

Event.returnValue

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8043

___

### srcElement

• `Readonly` **srcElement**: `EventTarget`

**`Deprecated`**

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### Inherited from

Event.srcElement

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8049

___

### target

• `Readonly` **target**: `EventTarget`

Returns the object to which event is dispatched (its target).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### Inherited from

Event.target

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8055

___

### timeStamp

• `Readonly` **timeStamp**: `number`

Returns the event's timestamp as the number of milliseconds measured relative to the time origin.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### Inherited from

Event.timeStamp

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8061

___

### transition

• `Private` **transition**: `TransitionRequest`

#### Defined in

[src/core/navigation.ts:117](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L117)

___

### type

• `Readonly` **type**: `string`

Returns the type of event, e.g. "click", "hashchange", or "submit".

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

#### Inherited from

Event.type

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8067

___

### userInitiated

• `Readonly` **userInitiated**: `boolean` = `false`

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
 always false in this polyfill

#### Defined in

[src/core/navigation.ts:157](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L157)

___

### AT\_TARGET

▪ `Static` `Readonly` **AT\_TARGET**: ``2``

#### Inherited from

Event.AT\_TARGET

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8109

___

### BUBBLING\_PHASE

▪ `Static` `Readonly` **BUBBLING\_PHASE**: ``3``

#### Inherited from

Event.BUBBLING\_PHASE

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8110

___

### CAPTURING\_PHASE

▪ `Static` `Readonly` **CAPTURING\_PHASE**: ``1``

#### Inherited from

Event.CAPTURING\_PHASE

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8108

___

### NONE

▪ `Static` `Readonly` **NONE**: ``0``

#### Inherited from

Event.NONE

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8107

## Accessors

### signal

• `get` **signal**(): `AbortSignal`

(@see https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent )
 this polyfill signals abort only on programatic navigation

#### Returns

`AbortSignal`

#### Defined in

[src/core/navigation.ts:162](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L162)

## Methods

### composedPath

▸ **composedPath**(): `EventTarget`[]

Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### Returns

`EventTarget`[]

#### Inherited from

Event.composedPath

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8073

___

### initEvent

▸ **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `bubbles?` | `boolean` |
| `cancelable?` | `boolean` |

#### Returns

`void`

**`Deprecated`**

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/initEvent)

#### Inherited from

Event.initEvent

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8079

___

### intercept

▸ **intercept**(`options?`): `void`

Prevents the browser from following the navigation request.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.focusReset?` | ``"manual"`` \| ``"after-transition"`` |
| `options.handler?` | (`event`: `Event`) => `Promise`\<`void`\> |
| `options.scroll?` | ``"manual"`` \| ``"after-transition"`` |

#### Returns

`void`

**`See`**

[https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/preventDefault)

#### Defined in

[src/core/navigation.ts:168](https://github.com/polyfea/core/blob/main/src/core/navigation.ts#L168)

___

### preventDefault

▸ **preventDefault**(): `void`

If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### Returns

`void`

#### Inherited from

Event.preventDefault

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8085

___

### stopImmediatePropagation

▸ **stopImmediatePropagation**(): `void`

Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### Returns

`void`

#### Inherited from

Event.stopImmediatePropagation

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8091

___

### stopPropagation

▸ **stopPropagation**(): `void`

When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### Returns

`void`

#### Inherited from

Event.stopPropagation

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:8097
