import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element';

class XCalendarNavigation extends LitElement {

    static get styles(){

        return css`        
            .x-navigation {
                background-color: var(--x-color-text-primary); 
                cursor: pointer;
            } 
        `
    }
    //fill: red;
    //
    _onPrevious(){
        /*Para hacer que un evento personalizado pase a través de los límites 
         de DOM, debe establecerse composed y bubbles true. */
        const event = new CustomEvent ("previous",{
           bubbles: true,
           composed: true,
        });
        this.dispatchEvent(event);  

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
            <button class="x-navigation" @click=${this._onPrevious}><</button>
            <button class="x-navigation" @click=${this._onNext}>></button>
            </div>
        `;
        /*ponemos this para referirnos a su instancia de elemento dentro de
        cualquier controlador de eventos.
        /*Se puede usar @click dentro de la funcion render para agregar
        events a sus componentes*/
    }   
}       
customElements.define('x-calendar-navigation', XCalendarNavigation);