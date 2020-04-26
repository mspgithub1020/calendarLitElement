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

            :host {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(7, 1fr);
                gap: var(--x-margin-small);
                justify-items: stretch;
                font-size: var(--x-font-tiny);                
            }

            .x-calendar-day {
                box-sizing: border-box;               
                cursor: pointer;                
            }
            
            x-calendar-day:hover {                
                border: 1px solid white;
            }
            
            .x-calendar-day--outside {
                color: var(--x-color-primary--light);
            }
            
            .x-calendar-day--today {
                background-color: var(--x-color-secondary);
            }
            
            .x-calendar-day--selected {
                border: 1px solid var(--x-color-secondary);
            }

            .x-calendar-day ,.x-weekday{
                display: flex;
                justify-content: center;
                align-items: center;
            }

        `        
    }
    static get properties() {
        return {
            date: { type: Object }  //para pintar .. datos de entrada de mis componentes          
        }
    }
     //2
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._onClick);
        //dateService.on(dateService.DAY_CHANGED, this._onDayChanged);
    }
    diconnectedCallback() {
        super.diconnectedCallback();
        this.removeEventLstener('click',this._onClick);
        //dateService.off(dateService.DAY_CHANGED, this._onDayChanged);
    }

    /*
    _onDayChanged = (date) => {
        this.date = date;
    }
    */

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
           return html`<x-calendar-weekday class="x-weekday" .day=${wd}></x-calendar-weekday>`
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
            classes += ' x-calendar-day--today x-calendar-day--selected';
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

    //7- Si se pincha en un dia le pone la clase x-calendar-date--selected y al elemento
    //   que ya tenia esa clase se le quita

    // donde esta el listener?
    _onClick = (ev) => {
        const newSelectedDay = this._findCalendarDay(ev.path);
        if(!newSelectedDay){
            return;
        }
        // https://developer.mozilla.org/es/docs/Web/API/Element/classList
        const selectedDay = this.renderRoot.querySelector('.x-calendar-day--selected');
        selectedDay && selectedDay.classList.remove('x-calendar-day--selected');
        newSelectedDay.classList.add('x-calendar-day--selected');
    }
    _findCalendarDay(path){
        return path.find((el) => el.localName === 'x-calendar-day');
    }
    render(){
        return html`
                ${this._renderWeekdays()}
                ${this._renderDays()}
        `
    }
}

window.customElements.define('x-calendar-month', XCalendarMonth);