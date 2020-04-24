import { LitElement, html } from 'https://cdn.pika.dev/lit-element';
import { dateService } from './date-service.js';
import './calendar-header.js';
import './calendar-body.js';

class XCalendar extends LitElement {
    static get styles() {
      
    }
    connectedCallback() {
        super.connectedCallback();
        dateService.start();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        dateService.stop();
    }
    render() {
        return html`
            <x-calendar-header class="x-calendar__header"></x-calendar-header>
            <x-calendar-body class="x-calendar__body"></x-calendar-body>
        `;
    }
}
customElements.define('x-calendar', XCalendar);