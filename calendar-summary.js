import { LitElement, html, css} from 'https://cdn.pika.dev/lit-element';
import { DateFormatter } from './date-formatter.js';

/*
Summary
1- x-calendar-summary
2- propiedad date
3- pinta mes de año

*/

class XCalendarSummary extends LitElement {
    
    static get styles(){

        return css`        
            .x-summary {
                font-size: var(--x-font-tiny);
            }            
        
        `
    }

    static get properties(){

        return {
            date:{type: Object}
        };
    }    
        
    render() {
        return html`
            <span class="x-summary" id="text">${DateFormatter.monthString(this.date)}</span>
        `;
    }
}
customElements.define('x-calendar-summary', XCalendarSummary);