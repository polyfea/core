class WelcomeElement extends HTMLElement {

  static observedAttributes = ["welcome", "who"];
  attributeChangedCallback(name, oldValue, newValue) {
    this.connectedCallback();
  }
  
  connectedCallback() {
    const welcome = this.getAttribute('welcome') || 'hello';
    const who = this.getAttribute('who') || 'polyfea';
    this.textContent = `${welcome} ${who}`;
  }
}

customElements.define('welcome-element', WelcomeElement);
