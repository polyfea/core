# polyfea-context

This component uses Polyfea to load a context area, dynamically render its elements, and load associated microfrontend resources. If the context area is empty or cannot be retrieved, slotted content is displayed instead.

The component is styled with `display: contents`, so it doesn't create a new box.

For more on the `ContextArea` type, see the [@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md) documentation. Context area requests are relative to `document.baseURI`.

By default, the endpoint for [@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md) is `./polyfea`, relative to the document. You can change this with a meta tag:

```html
<meta name="polyfea-endpoint" content="https://example.com/polyfea">
```

If the endpoint starts with `static://`, the rest is used as the base path for [@polyfea/browser-api](https://github.com/polyfea/browser-api/blob/main/README.md). In this case, context areas are loaded only at document load using the [`PolyfeaApi.getStaticConfig`](https://github.com/polyfea/browser-api/blob/main/docs/classes/PolyfeaApi.md#getstaticconfig) API call.




<!-- Auto Generated Below -->


## Properties

| Property              | Attribute      | Description                                                                                                                                                                                                                                                                                                        | Type                                   | Default     |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ----------- |
| `contextName`         | `context-name` | The name of the context area to load. Either `context-name` or `name` shall be set. The property `context-name` takes priority if it is set                                                                                                                                                                        | `string`                               | `undefined` |
| `extraAttributes`     | --             | Defines additional attributes to be set on the rendered elements.   The attributes are set in the following order:  1. The `context` attribute, with its value set to the `name` property. 2. The attributes defined in the element specification of the context area. 3. The attributes defined in this property. | `{ [key: string]: string; }`           | `{}`        |
| `extraStyle`          | --             | Additional style properties to be set on the rendered elements.   The style properties are set in the following order:  1. Style properties defined in the element specification of the context area. 2. Style properties defined in this property.                                                                | `{ [key: string]: string \| number; }` | `{}`        |
| `name`                | `name`         | The name of the context area to load. Either `context-name` or `name` shall be set. The property `context-name` takes priority if it is set                                                                                                                                                                        | `string`                               | `undefined` |
| `polyfeaContextStack` | --             |                                                                                                                                                                                                                                                                                                                    | `string[]`                             | `undefined` |
| `take`                | `take`         | Specifies the number of context area elements to render.  If this property is unset or has a non-positive value, all elements will be rendered.                                                                                                                                                                    | `number`                               | `undefined` |


## Slots

| Slot | Description                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------- |
|      | The slotted content is displayed if the context area cannot be retrieved or it has no elements. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
