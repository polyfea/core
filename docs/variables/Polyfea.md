[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / Polyfea

# Variable: Polyfea

> **Polyfea**: `object`

Defined in: [src/polyfea.ts:48](https://github.com/polyfea/core/blob/main/src/polyfea.ts#L48)

## Type Declaration

### getOrCreate()

> **getOrCreate**(`config?`): [`Polyfea`](../interfaces/Polyfea.md)

#### Parameters

##### config?

`Configuration`

Configuration for the [`PolyfeaApi`](https://github.com/polyfea/browser-api/blob/main/docs/classes/PolyfeaApi.md).

#### Returns

[`Polyfea`](../interfaces/Polyfea.md)

#### Static

Get or create a polyfea driver instance. If the instance is provided on the global context, it is returned.
Otherwise, a new instance is created with the given configuration.

### initialize()

> **initialize**(): `boolean`

#### Returns

`boolean`

`true` if the polyfea driver was initialized, `false` if it was already present.

#### Static

Initialize the polyfea driver in the global context.
This method is typically invoked by the polyfea controller script `boot.ts`.

#### Remarks

This method also initializes the Navigation polyfill if it's not already present.
It augments `window.customElements.define` to allow for duplicate registration of custom elements.
This is particularly useful when different microfrontends need to register the same dependencies.
