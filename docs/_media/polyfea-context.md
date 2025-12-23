# `src/polyfea-context.ts`:

## class: `PolyfeaContext`, `polyfea-context`

### Superclass

| Name          | Module | Package |
| ------------- | ------ | ------- |
| `HTMLElement` |        |         |

### Static Fields

| Name                | Privacy | Type     | Default     | Description             | Inherited From |
| ------------------- | ------- | -------- | ----------- | ----------------------- | -------------- |
| `VERBOSITY_SILENT`  |         | `string` | `'silent'`  | Verbosity level silent  |                |
| `VERBOSITY_ERROR`   |         | `string` | `'error'`   | Verbosity level error   |                |
| `VERBOSITY_VERBOSE` |         | `string` | `'verbose'` | Verbosity level verbose |                |

### Static Methods

| Name     | Privacy | Description                                                            | Parameters | Return | Inherited From |
| -------- | ------- | ---------------------------------------------------------------------- | ---------- | ------ | -------------- |
| `define` |         | Defines the custom element 'polyfea-context' if not already defined \* |            |        |                |

### Fields

| Name              | Privacy | Type                                  | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Inherited From |
| ----------------- | ------- | ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `contextName`     |         | `string`                              |         | The name of the context area to load. Either \`context-name\` or \`name\` shall be set.&#xD;&#xA;The property \`context-name\` takes priority if it is set                                                                                                                                                                                                                                                                                                                                                                            |                |
| `name`            |         | `string`                              |         | The name of the context area to load. Either \`context-name\` or \`name\` shall be set.&#xD;&#xA;The property \`context-name\` takes priority if it is set                                                                                                                                                                                                                                                                                                                                                                            |                |
| `take`            |         | `number`                              |         | Specifies the number of context area elements to render.&#xD;&#xA;If this property is unset or has a non-positive value, all configured&#xD;&#xA;elements will be rendered.                                                                                                                                                                                                                                                                                                                                                           |                |
| `extraAttributes` |         | `{ [key: string]: string }`           |         | Defines additional attributes to be set on the rendered elements.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                |
| `extraStyle`      |         | `{ [key: string]: string \| number }` |         | Additional style properties to be set on the rendered elements.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                |
| `verbosity`       |         | `string`                              |         | The verbosity level of the component.&#xD;&#xA;&#xD;&#xA;- \`silent\`: No logs or warnings are produced.&#xD;&#xA;- \`error\`: Only warnings about errors during context area loading are produced. This is the default level.&#xD;&#xA;- \`verbose\`: Detailed logs about context area loading and microfrontend loading are produced.&#xD;&#xA;&#xD;&#xA;The verbosity level can also be set globally using a meta tag in the document head:&#xD;&#xA;\`\<meta name="polyfea.context-verbosity" content="silent\|error\|verbose">\` |                |
| `error`           |         | `string \| null`                      |         | If an error occurs during context area retrieval or loading of dependencies,&#xD;&#xA;this attribute is set with the error message. Otherwise, it is null.                                                                                                                                                                                                                                                                                                                                                                            |                |

### Attributes

| Name               | Field           | Inherited From |
| ------------------ | --------------- | -------------- |
| `context-name`     | contextName     |                |
| `name`             | name            |                |
| `take`             | take            |                |
| `extra-attributes` | extraAttributes |                |
| `extra-style`      | extraStyle      |                |
| `verbosity`        | verbosity       |                |
| `error`            | error           |                |

### Slots

| Name    | Description                                                                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         | The slotted content is displayed if the context area  has no elements.                                                                                                 |
| `error` | This slot is present if an error occurs during context area retrieval or loading of dependencies, together with setting error attribute on the polyfea-context element |

<hr/>

## Exports

| Kind                        | Name              | Declaration    | Module                 | Package |
| --------------------------- | ----------------- | -------------- | ---------------------- | ------- |
| `js`                        | `PolyfeaContext`  | PolyfeaContext | src/polyfea-context.ts |         |
| `custom-element-definition` | `polyfea-context` | PolyfeaContext | src/polyfea-context.ts |         |
