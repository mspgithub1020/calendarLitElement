import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element';
import { dateService } from './date-service.js';
import { DateFormatter } from './date-formatter.js';

class XCalendarDay extends LitElement {

    static get properties(){

        return {
            date: {type: Object}
        };

    }

    constructor(){

        super();
        this.date = new Date;

    }    
    
    render() {        
        return html`<div>${this.date.getDate()}</div>`;
    }
}

customElements.define('x-calendar-day', XCalendarDay);