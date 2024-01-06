@polyfea/core / [Exports](modules.md)

# Polyfea microfrontend core library and browser driver

This package is the backbone of the Polyfea microfrontend framework. It manages the lifecycle of microfrontends. It also includes a browser driver for interfacing with the Polyfea microfrontend controller.

## Installation

```bash
npm install @polyfea/core
```

# Documentation

- The [_polyfea-context_](src/components/polyfea-context/readme.md) element loads microfrontends into the document, _replacing_ itself (by `display: contents`) with the microfrontend's content.
- The [_Polyfea_](docs/classes/Polyfea.md) class is for advanced use cases, providing control over the loading of microfrontends and elements.
- The [Navigation polyfill](docs/interfaces/Navigation.md) intercepts navigation events and enables programmatic navigation in browsers that don't yet support the [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API).
- The [href](https://github.com/polyfea/core/blob/main/docs/modules.md#href) function helps with navigation in the single page application.

## Usage

The core library enables the Polyfea microfrontend controller to manage microfrontends. Use the `<polyfea-context name="my-context"></polyfea-context>` element to load resources and elements for a specific context.

### Example: Using Boot Script from NPM Package

This example is useful for testing microfrontends with the standalone _Polyfea_ driver during development. Set up your index.html file as follows:

```html
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <base href="/ui/">
  <title>Sample polyfea microfrontend</title>
   <!-- Alows for repeated registration of the same custom elements. 
        Possible values are: verbose, silent, warn, error -->
  <meta name="polyfea-duplicit-custom-elements" content="verbose">
 
  <!--  Microfrontend configuration is taken from the backend. 
        You may specify the static configuration. 
        It will expect StaticConfig json resource to be available 
        at document.baseURI relative path ./polyfea/static-config
        See https://github.com/polyfea/browser-api/blob/main/docs/interfaces/StaticConfig.md
   -->
  <meta name="polyfea-backend" content="static://"> 
  
  <!-- Load polyfea driver-->
  <script type="module" src="node_modules/@polyfea/core/dist/boot.mjs"></script>
  <!-- you may replace above line with a a loading from release assets -->
  <!-- <script type="module" src="https://github.com/octo-org/octo-repo/releases/latest/download/boot.mjs"></script> -->
</head>
<body></body>
</html>
```

The code above loads the Polyfea driver and dynamically inserts the `<polyfea-context name="shell" take="1"></polyfea-context>` element into the document body. This element is populated with microfrontend content from the backend.

Your static configuration should be in the `/ui/polyfea/static-config` JSON file, served by your development server. For more information, see [StaticConfig](https://github.com/polyfea/browser-api/blob/main/docs/interfaces/StaticConfig.md).

```json
{
    "microfrontends": {
        "my-fea": {
            "module": "./dist/myfea.esm.js",
            "resources": [
                {
                    "kind": "stylesheet",
                    "href": "./build/material-shell-webc.css"
                }
            ]
        },
        "my-other-fea": {
            "dependsOn": [
                "my-fea"
            ],
            "module": "./build/material-shell-webc.esm.js",
            "resources": [
                {
                    "kind": "stylesheet",
                    "href": "./build/material-shell-webc.css"
                }
            ]
        }
    },
    "contextAreas": [
        { 
            "name": "shell",
            "contextArea": {
                "elements": [
                    {
                        "tagName": "my-shell-element",
                        "microfrontend": "my-fea"
                    }
                ]
            }
        },
        {
            "name": "my-context",
            "contextArea": {
                "elements": [
                    {
                        "tagName": "my-other-element",
                        "microfrontend": "my-other-fea"
                    }
                ]
            }
        }]
}
```

Use the `polyfea-context` element in your document to dynamically load elements and microfrontends based on your configuration. This element will be replaced with the loaded microfrontend content. It's ideal for loading elements developed by other teams or subprojects with separate development and release cycles. Avoid using `polyfea-context` for custom elements in the same repository.
