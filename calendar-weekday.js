import { LitElement, html } from 'https://cdn.pika.dev/lit-element';

class XWeekDay extends LitElement {

    //En este método creamos las propiedades del nuestro elemento
    static get properties(){

        return {
            //Propiedad de tipo String ... se le podrá asignar una Letra del día de la semana
            day: {type: String}
        };

    }   
    render() {  
        //Si la propiedad 'day'no tiene valor asignado se devuelve null y se sale           
        if(!this.day) {
            return null;
        }
        //En el caso que se le asigne un valor lo mostrará
        return html`<div>${this.day}</div>`;
    }
}

customElements.define('x-calendar-weekday', XWeekDay);