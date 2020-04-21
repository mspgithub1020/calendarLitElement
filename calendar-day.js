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
    
    /*
    get date() {
        return new Date(this.dataset.date);
    }*/


    render() {        
        return html`<div>${this.date.getDate()}</div>`;
    }
}

customElements.define('x-calendar-day', XCalendarDay);