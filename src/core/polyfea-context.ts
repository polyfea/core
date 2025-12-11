
import { Polyfea } from '.';
import { switchMap } from 'rxjs';
import { ContextArea } from '@polyfea/browser-api';


/**
 * @name polyfea-context
 * @description This component uses the Polyfea interface to load a context area, dynamically render its elements, 
 * and load the resources for the associated microfrontend before rendering the elements. 
 * If the context area cannot be retrieved or it has no elements, the slotted content is displayed instead.
 * 
 * @remarks For more details on the ContextArea type, refer to the @polyfea/browser-api package documentation. 
 * The path for context area requests is relative to document.baseURI.
 * 
 * @slot - The slotted content is displayed if the context area cannot be retrieved or it has no elements. 
 * @slot error - If an error occurs during context area retrieval, the error message is displayed in the slot named "error". 
 *      You may disable this behavior by empty slot "error" to hide the error message.
 *   
 */

export class PolyfeaContext extends HTMLElement {

  static define() {
    if (!customElements.get('polyfea-context')) {
      customElements.define('polyfea-context', PolyfeaContext);
    }
  }

  observedAttributes = [
    "context-name",
    "name",
    "take",
    "extra-attributes",
    "extra-style"
  ];

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set 
   **/
  set contextName(name: string) {
    this.setAttribute("context-name", name);
  }

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set 
   **/
  get contextName(): string {
    let name =  this.getAttribute("context-name");
    if (!name) {
      name = this.getAttribute("name");
    }
    return name;
  }

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set 
   **/
  set name(name: string) {
    this.setAttribute("context-name", name);
  }

  /** The name of the context area to load. Either `context-name` or `name` shall be set.
   *  The property `context-name` takes priority if it is set 
   **/
  get name(): string {
    let name =  this.getAttribute("context-name");
    if (!name) {
      name = this.getAttribute("name");
    }
    return name;
  }

  /**
   * Specifies the number of context area elements to render. 
   * If this property is unset or has a non-positive value, all configured 
   * elements will be rendered.
   */
  get take(): number {
    const takeStr = this.getAttribute("take");
    if (takeStr) {
      return parseInt(takeStr);
    }
    return 0;
  }
  
  /**
   * Specifies the number of context area elements to render. 
   * If this property is unset or has a non-positive value, all configured 
   * elements will be rendered.
   */
  set take(take: number) {
    this.setAttribute("take", take.toString());
  }

  /**
   * Defines additional attributes to be set on the rendered elements. 
   * 
   * The attributes are set in the following order:
   * 
   * 1. The `context` attribute, with its value set to the `name` property.
   * 2. The attributes defined in the element specification of the context area.
   * 3. The attributes defined in this property.
   */
  get extraAttributes(): { [key: string]: string } {
    const attrStr = this.getAttribute("extra-attributes");
    if (attrStr) {
      return JSON.parse(attrStr);
    }
    return {};
  }

  /**
   * Defines additional attributes to be set on the rendered elements. 
   * 
   * The attributes are set in the following order:
   * 
   * 1. The `context` attribute, with its value set to the `name` property.
   * 2. The attributes defined in the element specification of the context area.
   * 3. The attributes defined in this property.
   */
  set extraAttributes(attrs: { [key: string]: string }) {
    this.setAttribute("extra-attributes", JSON.stringify(attrs));
  }

  /**
   * Additional style properties to be set on the rendered elements. 
   * 
   * The style properties are set in the following order:
   * 
   * 1. Style properties defined in the element specification of the context area.
   * 2. Style properties defined in this property.
   */
  set extraStyle(style: { [key: string]: string | number }) {
    this.setAttribute("extra-style", JSON.stringify(style));
  }

  /**
   * Additional style properties to be set on the rendered elements. 
   * 
   * The style properties are set in the following order:
   * 1. Style properties defined in the element specification of the context area.
   * 2. Style properties defined in this property.
   */
  get extraStyle(): { [key: string]: string | number } {
    const styleStr = this.getAttribute("extra-style");
    if (styleStr) {
      return JSON.parse(styleStr);
    }
    return {};
  }

  // used internally to detect cyclic context areas
  public polyfeaContextStack: string[] 

  #polyfea: Polyfea;
  #cyclicAreas: string = "none";
  #cyclicErrorMsg: string = "";
  #scheduled: boolean = false;

  #extraPrefixedAttributes: { [key: string]: string } = {};

  get #areaName(): string {
    return this.contextName || this.name;
  }  
  
  #contextObj: ContextArea;
  #error: any = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // load immutable extra- attributes
    Array.from(this.attributes).forEach(attr => {
      if (attr.name.startsWith('extra-') && attr.name != 'extra-attributes' && attr.name != 'extra-style') {
        this.#extraPrefixedAttributes[attr.name.replace('extra-', '')] = attr.value;
      }
    });

    this.#checkCyclicContext();
    this.#loadContextElements();
  }

  disconnectedCallback() {
    this.polyfeaContextStack = null;
    this.#polyfea = null;
    this.#contextObj = null;
    this.#error = null;
  }

  #loadContextElements() {
    if (this.#areaName) {
      this.#polyfea = Polyfea.getOrCreate();
      this.#polyfea.getContextArea(this.#areaName)
        .pipe(
          // load microfrontends
          switchMap(ctx => {
            if(!ctx) {
              return Promise.resolve(ctx);
            }
            let loaders = (ctx.elements || [])
              .slice(0, this.take)
              .map(el => {
                if (el.microfrontend) {
                  return this.#polyfea.loadMicrofrontend(ctx, el.microfrontend);
                } else {
                  return Promise.resolve();
                }
              });
            return Promise.all(loaders).then(_ => ctx);
          })
        )
        .subscribe({
          next: _ => {
            this.#contextObj = _;
            this.#error = null;
            this.#scheduleRender();
          },

          error: _ => {
            console.warn(`<polyfe-context name="${this.#areaName}">: Using slotted content because of error: ${_}`);
            this.#error = _;
            this.#scheduleRender();
          }
        });
    }
  }

  #scheduleRender() {   
    if (this.#scheduled) return;
    this.#scheduled = true;
    requestAnimationFrame(() => {
      this.#render();
      this.#scheduled = false;
    });
  }

  #checkCyclicContext() {
    if (this.polyfeaContextStack) return;

    // find closest parent with property polyfeaContextStack to avoid cyclic context
    let currentEl: HTMLElement = this;
    let stack: string[] = null;
    while( stack === null && currentEl && currentEl.tagName !== "BODY" ) {
      currentEl = currentEl.parentElement;
      stack = (currentEl as any)?.polyfeaContextStack || null;
    }
    stack = stack || [];
    if (stack.indexOf(this.#areaName) >= 0) {
      this.#cyclicAreas = "error"
      this.#cyclicErrorMsg = "";
      // check requested behavior from meta tag
      let meta = document.head.querySelector("meta[name='polyfea.cyclic-context-areas']");
      if (meta) {
        const metaFlag = meta.getAttribute("content")
        if (metaFlag == "allow" || metaFlag == "silent") {
          this.#cyclicAreas = metaFlag;
        }
      }

      meta = document.head.querySelector("meta[name='polyfea.cyclic-context-message']");
      if (meta) {
        this.#cyclicErrorMsg = meta.getAttribute("content");
      }
      this.#cyclicErrorMsg ||= "Cyclic rendering of context areas detected: <br/>{stack}</br> Area ignored to avoid infinite recursion.";
      this.#cyclicErrorMsg = this.#cyclicErrorMsg.replace(
        "{stack}", 
        stack
          .map(_=> _===this.#areaName ?  `<b>${_}</b>`: _)
          .join(" -> ") + " ==> <b>" + this.#areaName + "</b>");
    }
    stack.push(this.#areaName)
    this.polyfeaContextStack = stack;
  }

  #render() {    
    if( this.#cyclicAreas == "error") {
      this.shadowRoot.innerHTML = `
      <style>:host { display: contents; }</style>
      <slot name="error">${this.#cyclicErrorMsg}</slot>`;
    }
    if( this.#cyclicAreas == "silent" ) {
      return this.shadowRoot.innerHTML = 
      `<style>:host { display: contents; }</style><slot name="error">${this.#cyclicErrorMsg}</slot>`;
    }

    let elements = this.#contextObj?.elements || [];
    if (this.take > 0) {
      elements = elements.slice(0, this.take);
    }
    let innerHTML = `<style>:host { display: contents; }</style>`;
    elements.forEach(element => {

      let attrs = {
        context: `${this.#areaName}`,
      };
      // element spec attributes
      for (let key in element.attributes) {
          attrs[key] = element.attributes[key];
      }

      for (let key in this.#extraPrefixedAttributes) {
        attrs[key] = this.#extraPrefixedAttributes[key];
      }

      // extraAttributes property
      for (let key in this.extraAttributes) {
        let value = this.extraAttributes[key];
        attrs[key] = value;
      }
      
      let styleObj = Object.assign(
        {},
        element.style,
        this.extraStyle,
      );
      let styleStr = Object.entries(styleObj)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');

      let attrStr = Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      innerHTML += `<${element.tagName} ${attrStr} style="${styleStr}"></${element.tagName}>`;
    });

    if (!elements.length) {
      innerHTML += `<slot></slot>`;
      if (this.#error) {
        innerHTML += `<slot name="error">${this.#error}</slot>`;
      }
    }

    this.shadowRoot.innerHTML = innerHTML;        
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      if (name === "context-name" || name === "name" ) {
        this.#checkCyclicContext();
        this.#loadContextElements();
      } else if (name === "take" || name === "extra-attributes" || name === "extra-style") {
        this.#scheduleRender();
      } else if (name.startsWith('extra-') && name != 'extra-attributes' && name != 'extra-style') {
        this.#extraPrefixedAttributes[name.replace('extra-', '')] = newValue;
        this.#scheduleRender();
      }
    }
  }

}
