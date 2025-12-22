[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / Polyfea

# Interface: Polyfea

Defined in: [src/polyfea.ts:48](https://github.com/polyfea/core/blob/main/src/polyfea.ts#L48)

Polyfea driver for loading microfrontends.

This interface is primarily used internally by the `<polyfea-context>` element. It loads context area and microfrontend resources.
The `boot.ts` script is used by the polyfea controller to initialize the polyfea driver.

## Remarks

For standalone purposes and development, you can use the `boot.ts` script or call `Polyfea.initialize()`.
This initializes the polyfea driver in the global context.

For more details on the `ContextArea` type, refer to the
[@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md) package documentation.

The default endpoint of the [@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md) is `./polyfea`.
This is relative to the `document`. You can change it using the document meta tag. For example:

```html
<meta name="polyfea-endpoint" content="https://example.com/polyfea">
```

If the endpoint is prefixed with `static://`, the remaining part is used as the base path for the
[@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md).

In this case, context areas are loaded only at document load using the
[`PolyfeaApi.getStaticConfig`](https://github.com/polyfea/browser-api/blob/main/docs/classes/PolyfeaApi.md#getstaticconfig) API call.

## Methods

### getContextArea()

> **getContextArea**(`contextName`): `Observable`\<[`ContextArea`](ContextArea.md)\>

Defined in: [src/polyfea.ts:57](https://github.com/polyfea/core/blob/main/src/polyfea.ts#L57)

Get an observable for the context area. This provides the context area for the current document location path,
relative to the `document.baseURI`.

The responses are cached in localStorage. They are first served from the cache and updated if the remote context area is different.

#### Parameters

##### contextName

`string`

Name of the context area.

#### Returns

`Observable`\<[`ContextArea`](ContextArea.md)\>

***

### loadMicrofrontend()

> **loadMicrofrontend**(`ctx`, `name`): `Promise`\<`Error`[]\>

Defined in: [src/polyfea.ts:72](https://github.com/polyfea/core/blob/main/src/polyfea.ts#L72)

Load microfrontend resources for the given context area and microfrontend name. This resolves dependencies recursively.

#### Parameters

##### ctx

[`ContextArea`](ContextArea.md)

Context area specification.

##### name

`string`

Name of the microfrontend to load. This must be present in the context area specification.

#### Returns

`Promise`\<`Error`[]\>

A promise that resolves to an array of errors or nulls for each resource load.
Loading errors does not results in rejection as order of loading is not critical for the application and some elements and resources  may be optional
for the microfrontend to function.
Fully successful loads are represented as empty array.

#### Throws

Never
