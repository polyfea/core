// this is the entry point bundle for the browser 
import { Polyfea, PolyfeaContext } from '.';

globalThis.addEventListener('load', () => {
    Polyfea.initialize();
    PolyfeaContext.define();

    if (!document.body.hasAttribute('polyfea')) {
        document.body.setAttribute('polyfea', 'initialized');

        const polyfeaContext = document.createElement('polyfea-context');
        polyfeaContext.setAttribute('name', 'shell');
        polyfeaContext.setAttribute('take', '1');
        document.body.appendChild(polyfeaContext);
    }
});

