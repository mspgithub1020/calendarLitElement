import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element';
import { MonthHelper } from './month-helper.js';
import { config } from './config.js';
import { dateService } from './date-service.js'
import { WEEKDAY_LETTERS } from './date-constants.js'

import 'calendar-day.js';

const DAYS_PER_WEEK = 7;

/*
Componente x-calendar-month
- Tiene una propiedad date que incialmente tiene el valor del dateService
- Cuando el dateService lanza un evento del tipo  DAY_CHANGED se actualiza 
  la propiedad date
- Pinta los dias de la semana (x-calendar-weekday) desde config.startDay 
  hasta pintar los 7
- Pinta los dias del mes disponibles en MonthHelper.getDays, por cada pinta 
  un x-calendar-day
- Si el dia es el actual le pone la clase x-calendar-date--today
- Si el dia no pertenece a este mes le pone la clase x-calendar-date--outside
- Si se pincha en un dia le pone la clase x-calendar-date--selected y al elemento
  que ya tenia esa clase se le quita */

class XCalendarMonth extends LitElement{

    static get properties(){

        return{
            date: {type: Object};
        }

    }

    constructor(){

        super();
        this.date = dateService.date();

    }

    connectedCallback(){
        super.connectedCallback();
        
        dateService.on(dateService.DAY_CHANGED, this._onDayChanged);
    }

    _onDayChanged = (date) => {
        this.shadowRoot.querySelector('[data-today]').removeAttribute('data-today');
        this.shadowRoot.querySelector(`[data-date="${date.toDateString()}"`).setAttribute('data-today', '');
    }


}

window.customElements.define('x-calendar-month',XCalendarMonth);