import { LitElement, html } from 'lit-element';
import {calendarClock} from './calendar-clock.js';
import {calendarDate} from  './calendar-date.js';

class XCalendarHeader extends LitElement  {

    render(){ html`
    <x-calendar-clock></x-calendar-clock>
    <x-calendar-date></x-calendar-date>
    `;
    }
}
customElements.define('x-calendar-header', XCalendarHeader);