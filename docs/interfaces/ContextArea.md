[**@polyfea/core**](../README.md)

***

[@polyfea/core](../globals.md) / ContextArea

# Interface: ContextArea

Defined in: node\_modules/@polyfea/browser-api/lib/models/ContextArea.d.ts:23

Elements to be inserted into the microfrontend context area.
The context area refers to a section in the document flow, the content of which depends
on the system's configuration. For instance, the context area `top-level-application`
could be used to render the top-level application tiles.

## Export

ContextArea

## Properties

### elements

> **elements**: [`ElementSpec`](ElementSpec.md)[]

Defined in: node\_modules/@polyfea/browser-api/lib/models/ContextArea.d.ts:31

The elements to be incorporated into the context area.
These elements will be rendered in the sequence they appear in the array.

#### Memberof

ContextArea

***

### microfrontends?

> `optional` **microfrontends**: `object`

Defined in: node\_modules/@polyfea/browser-api/lib/models/ContextArea.d.ts:39

The microfrontends referenced by any of the elements. The browser triggers
the loading of microfrontend resources when the element is rendered.

#### Index Signature

\[`key`: `string`\]: `MicrofrontendSpec`

#### Memberof

ContextArea
