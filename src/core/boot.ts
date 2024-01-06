// this is the entry point bundle for the browser 
//  the stencil compilation must be exevuted before bundling polyfea boot loader
import { Polyfea } from './polyfea';
import { defineCustomElements } from '../../dist/components';

globalThis.addEventListener('load', () => {
    Polyfea.initialize();

    defineCustomElements();

    if (!document.body.hasAttribute('polyfea')) {
        document.body.setAttribute('polyfea', 'initialized');

        const polyfeaContext = document.createElement('polyfea-context');
        polyfeaContext.setAttribute('name', 'shell');
        polyfeaContext.setAttribute('take', '1');
        document.body.appendChild(polyfeaContext);
    }
});

