# Polyfea microfrontend core library and browser driver

This package is the core library for the Polyfea microfrontend framework. It contains the core logic for loading and unloading microfrontends, as well as the browser driver for communicating with the polyfea microfrontend controller.

## Installation

```bash
npm install @polyfea/core
```

# Documentation

[_polyfea-context_](src\components\polyfea-context\readme.md) element is used to load microfrontends into the document. It is replaced with the content of the microfrontend elements in the document flow.

[_Polyfea_](docs\classes\Polyfea.md) class may be used for advanced use cases, when you need to be in control how the microfrontends and elements are loaded.

[Navigation polyfill](docs\classes\Navigation.md) is instantiated by the driver in browser that do not implement the [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) yet. It is used to intercept navigation events in browsers, and to programatically navigate to a new URL. 

## Usage

The core library is used by the polyfea microfrontend controller to load and unload microfrontends. Once loaded into the browser, you can use the `<polyfea-context name="my-context"></polyfea-context>` element to microfrontend resources and elements associated with the context area `"my-context"`.

### Example using boot script from npm package

Following example is usefull for development purpose when you want test your microfrontends with _Polyfea_ driver in standalone mode. 

Prepare your index.html file with the following content

```html
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <base href="/ui/">
  <title>Sample polyfea microfrontend</title>
  <meta name="polyfea-duplicit-custom-elements" content="verbose"><!-- allows for repeated registration of the same custom elements. Possible values are: verbose, silent, warn, error -->
  <!--  Microfrontend configuration is taken from the backend. You may specify the static configuration. 
        It will expect StaticConfig json resource to be available at document.baseURI relative path `./polyfea/static-config`
        See https://github.com/polyfea/browser-api/blob/main/docs/interfaces/StaticConfig.md
   -->
  <meta name="polyfea-backend" content="static://"> 
  
  <!-- Load polyfea driver-->
  <script type="module" src="node_modules/@polyfea/core/dist/boot.mjs"></script>
  <!-- you may also load from release assets, no installation needed then -->
  <!-- <script type="module" src="https://github.com/octo-org/octo-repo/releases/latest/download/boot.mjs"></script> -->
</head>
<body></body>
</html>
```html

The above will lead to loading of the polyfea driver and dynamic placing of the `<polyfea-context name="shell" take="1"></polyfea-context>` element into the body of the document. The element will be filled with the microfrontend content from the backend.

Provide your static configuration in the `/ui/polyfea/static-config` file - it needs to be served by your development server. See [StaticConfig](https://github.com/polyfea/browser-api/blob/main/docs/interfaces/StaticConfig.md) for details.

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

You may place a `polyfea-context` anywhere in your document to dynamically load elements and microfrontends as specified in your configuration. The `polyfea-context` element will be replaced with the content of the microfrontend elements in the document flow. Usage of the `polyfea-context` element is intended for loading other parties elements (other team, subproject, ...) or any other elements which development and release cycle is separated from your project. It is not recopmmended to use `polyfea-context` element for your own custom elements provided int the same repository.
