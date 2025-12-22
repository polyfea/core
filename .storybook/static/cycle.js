class CyclicElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <div>Cyclic context test:</div>
    <polyfea-context name="cyclic">
      <div slot="error" style="color: red; font-weight: bold;">Cyclic context detected!</div>
      <div slot="default">This should not appear due to cyclic context.</div>
    </polyfea-context>`;
  }
}

customElements.define('cyclic-element', CyclicElement);
