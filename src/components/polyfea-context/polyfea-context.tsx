import { Build, Component, Host, Prop, State, h } from '@stencil/core';
import {  Polyfea } from '../../core';
import { switchMap } from 'rxjs';
import { ContextArea, ElementSpec } from '@polyfea/browser-api';


/**
 * @name polyfea-context
 * 
/**
 * @description This component uses the Polyfea interface to load a context area, dynamically render its elements, 
 * and load the resources for the associated microfrontend before rendering the elements. 
 * If the context area cannot be retrieved or it has no elements, the slotted content is displayed instead.
 * 
 * @remarks For more details on the ContextArea type, refer to the @polyfea/browser-api package documentation. 
 * The path for context area requests is relative to document.baseURI.
 * 
 * @slot - The slotted content is displayed if the context area cannot be retrieved or it has no elements.
 */
@Component({
  tag: 'polyfea-context',
  styleUrl: 'polyfea-context.css',
  shadow: true,
})
export class PolyfeaContext {

  /** name of the context area to load.  */
  @Prop({ attribute: "name"}) name: string;

  /**
   * Specifies the number of context area elements to render. 
   * If this property is unset or has a non-positive value, all elements will be rendered.
   */
  @Prop({ attribute: "take"}) take: number;

  /**
   * Defines additional attributes to be set on the rendered elements. 
   * 
   * The attributes are set in the following order:
   * 
   * 1. The `context` attribute, with its value set to the `name` property.
   * 2. The attributes defined in the element specification of the context area.
   * 3. The attributes defined in this property.
   */
  @Prop({ attribute: "extra-attributes"}) extraAttributes: { [key: string]: string } = {};

  /**
   * Additional style properties to be set on the rendered elements. 
   * 
   * The style properties are set in the following order:
   * 
   * 1. Style properties defined in the element specification of the context area.
   * 2. Style properties defined in this property.
   */
  @Prop({ attribute: "extra-style"}) extraStyle: { [key: string]: string | number } = {};

  private polyfea: Polyfea;

  @State()
  private contextObj: ContextArea;

  async componentWillLoad() {
    if (this.name) {
      this.polyfea = Polyfea.getOrCreate();
      this.polyfea.getContextArea(this.name)
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
                  return this.polyfea.loadMicrofrontend(ctx, el.microfrontend);
                } else {
                  return Promise.resolve();
                }
              });
            return Promise.all(loaders).then(_ => ctx);
          })
        )
        .subscribe({
          next: _ => this.contextObj = _,
          error: _ => {
            console.warn(`<polyfe-context name="${this.name}">: Using slotted content because of error: ${_}`);
            
            if(  Build.isDev) {
              throw _;
            }
          }

        });
    }
  }

  render() {
    let elements = this.contextObj?.elements || [];
    if (this.take > 0) {
      elements = elements.slice(0, this.take);
    }
    return (
      <Host>
        {elements.map(_ => this.renderElement(_))}
        {!elements.length ? <slot></slot> : ''}
      </Host>
    );
  }

  private renderElement(element: ElementSpec) {

    const El = element.tagName;

    const attr = Object.assign(
      {
        context: this.name
      },
      element.attributes,
      this.extraAttributes,
      {
        class: this.name + '-' + 'context'
      }
    );

    const style = Object.assign(
      {},
      element.style,
      this.extraStyle,
    );

    return (<El style={style} ref={( (el:HTMLElement) => {
      if(el) {
        for(let key in attr) {
          el.setAttribute(key, attr[key]);
        }
      }
    })}></El>)
  }

}
