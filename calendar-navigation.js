import { LitElement, html } from 'https://cdn.pika.dev/lit-element';

class XCalendarNavigation extends LitElement {

    _onPrevious(){
        /*Para hacer que un evento personalizado pase a través de los límites 
         de DOM, debe establecerse composed y bubbles true. */
        const event = new CustomEvent ("previous",{
           bubbles: true,
           composed: true,
        });
        this.dispatchEvent(Event);

    }

    _onNext(){
        const event = new CustomEvent("next",{
            bubbles: true,
            composed: true,
            
        });
        this.dispatchEvent(event);

    }
    
    render(){
        return html`
        <div>
        <button @click=${this._onPrevious}>-</button>
        <button @click=${this._onNext}>+</button>
        </div>
        `;
        /*ponemos this para referirnos a su instancia de elemento dentro de
        cualquier controlador de eventos.
        /*Se puede usar @click dentro de la funcion render para agregar
        events a sus componentes*/
    }   
}       
customElements.define('x-calendar-navigation', XCalendarNavigation);