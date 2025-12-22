// this is the entry point bundle for the browser
import { Polyfea, PolyfeaContext } from '.';

function bootstrapPolyfea() {
  if (Polyfea.initialize()) {
    PolyfeaContext.define();

    if (!document.body.hasAttribute('polyfea')) {
      document.body.setAttribute('polyfea', 'initialized');

      const polyfeaContext = document.createElement('polyfea-context');
      polyfeaContext.setAttribute('name', 'shell');
      polyfeaContext.setAttribute('take', '1');
      document.body.appendChild(polyfeaContext);

      console.groupCollapsed('%c[Polyfea] Initialized  ', 'background-color: #12A;  font-weight: bold; padding: 2px; border-radius: 4px; color: white;');

      console.log('%cDocumentation:', 'font-weight: bold;', '  https://polyfea.github.io/documentation/');
      console.log('%cGitHub Repo:', 'font-weight: bold;', '    https://github.com/polyfea');

      console.groupEnd();
    }
  }
}

if (document.readyState === 'complete') {
  bootstrapPolyfea();
} 
globalThis.addEventListener('load', () => {
  bootstrapPolyfea();
});

