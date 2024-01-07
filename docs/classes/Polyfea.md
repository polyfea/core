[@polyfea/core](../README.md) / [Exports](../modules.md) / Polyfea

# Class: Polyfea

## Table of contents

### Constructors

- [constructor](Polyfea.md#constructor)

### Methods

- [getContextArea](Polyfea.md#getcontextarea)
- [loadMicrofrontend](Polyfea.md#loadmicrofrontend)
- [getOrCreate](Polyfea.md#getorcreate)
- [initialize](Polyfea.md#initialize)

## Constructors

### constructor

• **new Polyfea**(): [`Polyfea`](Polyfea.md)

#### Returns

[`Polyfea`](Polyfea.md)

#### Defined in

[src/core/polyfea.ts:61](https://github.com/polyfea/core/blob/1c60298/src/core/polyfea.ts#L61)

## Methods

### getContextArea

▸ **getContextArea**(`contextName`): `Observable`\<`ContextArea`\>

Get an observable for the context area. This provides the context area for the current document location path, 
relative to the `document.baseURI`.

The responses are cached in localStorage. They are first served from the cache and updated if the remote context area is different.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contextName` | `string` | Name of the context area. |

#### Returns

`Observable`\<`ContextArea`\>

#### Defined in

[src/core/polyfea.ts:45](https://github.com/polyfea/core/blob/1c60298/src/core/polyfea.ts#L45)

___

### loadMicrofrontend

▸ **loadMicrofrontend**(`ctx`, `name`): `Promise`\<`void`\>

Load microfrontend resources for the given context area and microfrontend name. This resolves dependencies recursively.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | `ContextArea` | Context area specification. |
| `name` | `string` | Name of the microfrontend to load. This must be present in the context area specification. |

#### Returns

`Promise`\<`void`\>

**`Throws`**

Error if the microfrontend specification is not found or if there is a circular dependency.

#### Defined in

[src/core/polyfea.ts:55](https://github.com/polyfea/core/blob/1c60298/src/core/polyfea.ts#L55)

___

### getOrCreate

▸ **getOrCreate**(`config?`): [`Polyfea`](Polyfea.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | `Configuration` | Configuration for the [`PolyfeaApi`](https://github.com/polyfea/browser-api/blob/main/docs/classes/PolyfeaApi.md). |

#### Returns

[`Polyfea`](Polyfea.md)

**`Static`**

Get or create a polyfea driver instance. If the instance is provided on the global context, it is returned. 
Otherwise, a new instance is created with the given configuration.

#### Defined in

[src/core/polyfea.ts:70](https://github.com/polyfea/core/blob/1c60298/src/core/polyfea.ts#L70)

___

### initialize

▸ **initialize**(): `void`

#### Returns

`void`

**`Static`**

Initialize the polyfea driver in the global context. 
This method is typically invoked by the polyfea controller script `boot.ts`.

**`Remarks`**

This method also initializes the Navigation polyfill if it's not already present.
It augments `window.customElements.define` to allow for duplicate registration of custom elements.
This is particularly useful when different microfrontends need to register the same dependencies.

#### Defined in

[src/core/polyfea.ts:88](https://github.com/polyfea/core/blob/1c60298/src/core/polyfea.ts#L88)
