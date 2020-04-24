import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element';
import { dateService } from './date-service.js';

import './calendar-month.js';
import './calendar-navigation.js';
import './calendar-summary.js';


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
            <x-calendar-summary .date=${this.selectedDate}></x-calendar-summary>
            <x-calendar-navigation @next=${this._onNext} @previous=${this._onPrevious}></x-calendar-navigation>
            <x-calendar-month .date=${this.selectedDate}></x-calendar-month>
        `
    }
}
customElements.define('x-calendar-body', XCalendarBody);