[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / ElementSpec

# Interface: ElementSpec

Defined in: node\_modules/@polyfea/browser-api/lib/models/ElementSpec.d.ts:22

Specification of the element.
Elements serve as the building blocks of the application.
Each element should be a web component rendered by the browser.
When rendered in context, such as with the `polyfea-context` element,
the `context` attribute is set to the name of the context area.

## Export

ElementSpec

## Properties

### attributes?

> `optional` **attributes**: `object`

Defined in: node\_modules/@polyfea/browser-api/lib/models/ElementSpec.d.ts:46

Attributes to be assigned to the element during rendering.

#### Index Signature

\[`key`: `string`\]: `string`

#### Memberof

ElementSpec

***

### microfrontend?

> `optional` **microfrontend**: `string`

Defined in: node\_modules/@polyfea/browser-api/lib/models/ElementSpec.d.ts:32

The name of the microfrontend to which the element belongs. The browser
loads the microfrontend before rendering the element.
If this property is not provided, it's assumed that the browser has already
loaded all necessary resources for the element prior to rendering.

#### Memberof

ElementSpec

***

### style?

> `optional` **style**: `object`

Defined in: node\_modules/@polyfea/browser-api/lib/models/ElementSpec.d.ts:56

The styles of the element. Primarily intended as a fallback for specific cases,
such as setting CSS variables.

#### Index Signature

\[`key`: `string`\]: `string`

#### Memberof

ElementSpec

***

### tagName

> **tagName**: `string`

Defined in: node\_modules/@polyfea/browser-api/lib/models/ElementSpec.d.ts:39

The name of the element, which corresponds to its tag name used in the document flow.

#### Memberof

ElementSpec
