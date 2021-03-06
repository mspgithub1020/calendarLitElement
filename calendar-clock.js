import { LitElement, html ,css } from 'https://cdn.pika.dev/lit-element';
import { dateService } from './date-service.js';
import { DateFormatter } from './date-formatter.js';    
 
//se crea la clase XcalendarClock con BaseElement
class XCalendarClock extends LitElement {

    static get styles(){    //tatic get styles(){

        return css`
            .x-clock {
                margin: 0;
                font-size: var(--x-font-small);
            }
        
        `
    }

    static get properties() {
        return {
            date: { type: Object }
        };
    }

    constructor() {
        super();
        this.date = dateService.date;
        
    }

    get timeString(){
        return DateFormatter.timeString(dateService.date);
    }

    //cada segundo hace una callback para actualizar los segundos
    connectedCallback() {
        super.connectedCallback();
        dateService.on(dateService.SECOND_CHANGED, this._onSecondChanged);
    }

    //salta cuando se elimina el componente
    disconnectedCallback() {
        super.disconnectedCallback();
        dateService.off(dateService.SECOND_CHANGED, this._onSecondChanged);
    }

    _onSecondChanged = (date) => {
        this.date = date;
    }

    render() {
        return html`
            <p class="x-clock">${this.timeString}</p>
        `;
    }
}
 
window.customElements.define('x-calendar-clock', XCalendarClock);