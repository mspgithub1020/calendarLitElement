import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element';
import { MonthHelper } from './month-helper.js';
import { config } from './config.js';
import { dateService } from './date-service.js'
import { WEEKDAY_LETTERS } from './date-constants.js'

import './calendar-day.js';

import './calendar-weekday.js';

const DAYS_PER_WEEK = 7;

/*
Componente x-calendar-month
1- Tiene una propiedad date que incialmente tiene el valor del dateService
2- Cuando el dateService lanza un evento del tipo  DAY_CHANGED se actualiza 
   la propiedad date
3- Pinta los dias de la semana (x-calendar-weekday) desde config.startDay 
   hasta pintar los 7
4- Pinta los dias del mes disponibles en MonthHelper.getDays, por cada pinta 
   un x-calendar-day
5- Si el dia es el actual le pone la clase x-calendar-date--today
6- Si el dia no pertenece a este mes le pone la clase x-calendar-date--outside
7- Si se pincha en un dia le pone la clase x-calendar-date--selected y al elemento
   que ya tenia esa clase se le quita */

class XCalendarMonth extends LitElement {
    //1
    static get styles(){
        return css`
            .calendar-day {
                color: red;
                width: 20px:
                height: 20px;
            }
            .calendar-day--today{
                background-color: blue;
            }
            .calendar-day--outside{
                color: grey;
            }
        `
        // <div class="clase1 clase clase3">
    }
    static get properties() {
        return {
            date: { type: Object }
        }
    }
    constructor() {
        super();
        this.date = dateService.date;
    }
    //2
    connectedCallback() {
        super.connectedCallback();
        dateService.on(dateService.DAY_CHANGED, this._onDayChanged);
    }
    diconnectedCallback() {
        super.diconnectedCallback();
        dateService.off(dateService.DAY_CHANGED, this._onDayChanged);

    }
    _onDayChanged = (date) => {
        this.date = date;
    }
    //3
    _getWeekDays() {
        const days = [];
        for (let delante = config.startDay; delante < WEEKDAY_LETTERS.length; delante++) {
            days.push(WEEKDAY_LETTERS[delante]);
        }
        for (let detras = 0; detras < config.startDay; detras++) {
            days.push(WEEKDAY_LETTERS[detras])
        }
        return days;
    }
    _renderWeekdays() {
        return this._getWeekDays().map((wd) => {
           return html`<x-calendar-weekday .day=${wd}></x-calendar-weekday>`
        });
    }
    _renderDays() {
        const daysToShow = MonthHelper.getDays(this.date, config.startDay, config.monthRows * DAYS_PER_WEEK);
        return daysToShow.map(this._renderDay.bind(this));
    }
    _renderDay(day) {
        const classForDay = this._getClassesForDay(day);
        return html`<x-calendar-day class="${classForDay}" .date="${day}"></x-calendar-day>`;
    }
    _getClassesForDay(day){
        
        let classes = 'x-calendar-day';
        if(dateService.isToday(day)){
            classes += ' x-calendar-day--today';
        }
        if(day.getMonth() !== this.date.getMonth()){
            classes += ' x-calendar-day--outside';
        }
        
        /* CON ARRAY
        let classes = ['x-calendar-day'];
        if(dateService.isToday(day)){
            classes.push(' x-calendar-day--today');
        }
        if(day.getMonth() !== this.date.getMonth()){
            classes.push(' x-calendar-day--outside');
        }
        */

        return classes;
    }
    render(){
        return html`
            <div>
                ${this._renderWeekdays()}
                ${this._renderDays()}
            </div>
        `
    }
}

window.customElements.define('x-calendar-month', XCalendarMonth);