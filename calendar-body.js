import { LitElement, html, css } from 'htps://cdn.pika.dev/lit-element';
//import { calendarNavigation } from './calendar-navigation.js';
import { dateService } from './date-service.js';
//import { calendarMonth } from './calendar-month.js';

import './calendar-month.js';
import './calendar-navigation.js';


class XCalendarBody extends LitElement{
    static get properties(){
        return{
            selectedDate:{type: Object}
        }
    }
    constructor(){
        super();
        this.selectedDate = dateService.date;
    }
    connectedCallback(){
     super.connectedCallback();
     dateService.on(dateService.DAY_CHANGED, this._onDayChanged);
    }
    disconnectedCallback(){
     super.disconnectedCallback();
     dateService.off(dateService.DAY_CHANGED, this._onDayChanged);
    }
    _onDayChanged = (newDate) => {
      this.selectedDate = newDate;
    }
    _onNext(){
     const newDate = new Date(this.selectedDate);
     newDate.setMonth(this.selectedDate.getMonth() + 1);
     this.selectedDate = newDate;
    }
    // this.selecetdDate = x;
    // selectedDate es un a property -> actualizo el componente
    // x-calendar-month tiene una propiedad .date que depende de this.selectedDate
    // como this.selectedDate ha cambio -> calendar-month.date = this.selectedDate
    _onPrevious(){
     const newDate = new Date(this.selectedDate);
     newDate.setMonth(this.selectedDate.getMonth() - 1);
     this.selectedDate = newDate;
    }
    render(){
        return html`
            <x-calendar-month .date=${this.selectedDate}></x-calendar-month>
            <x-calendar-navigation @next=${_onNext} @previous=${_onPrevious}></x-calendar-navigation>
        `
    }
}
customElements.define('x-calendar-body', XCalendarBody);