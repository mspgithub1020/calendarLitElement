import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element';
import './calendar-clock.js';
import './calendar-date.js';

class XCalendarHeader extends LitElement  {

    render(){
        return html`
            <x-calendar-clock></x-calendar-clock>
            <x-calendar-date></x-calendar-date>
    `;
    }
}
customElements.define('x-calendar-header', XCalendarHeader);