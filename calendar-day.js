import { LitElement, html } from 'https://cdn.pika.dev/lit-element';


class XCalendarDay extends LitElement {

    //En este método creamos las propiedades del nuestro elemento
    static get properties(){

        return {
            //propiedad de tipo Object
            date: {type: Object}
        };

    }

    constructor(){
        //Invocamos a constructor del super de nuestro padre .... LitElement
        super();
        //Inicializamos la propiedad date con la fecha actual
        this.date = new Date;

    }    
    
    //Implementamos el método que mostrará lo que contiene mi elemento 'x-calendar-day'
    render() { 

        //Devolvemos un template string con el día del valor de nuestra propiedad date 
        return html`<div>${this.date.getDate()}</div>`;
    }
}

customElements.define('x-calendar-day', XCalendarDay);