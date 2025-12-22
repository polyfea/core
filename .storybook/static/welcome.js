class WelcomeElement extends HTMLElement {
  connectedCallback() {
    const welcome = this.getAttribute('welcome') || 'hello';
    const who = this.getAttribute('who') || 'polyfea';
    this.textContent = `${welcome} ${who}`;
  }
}

customElements.define('welcome-element', WelcomeElement);
