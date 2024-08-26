import { LitElement, css, html } from 'lit';
import clientsStore from './clients/store/clients-store';

export class ClientsButtons extends LitElement {
    
    static get styles() {
        return css`
            .buttons {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 1rem;
            }
            button {
                background-color: #5a26ad;
                color: white;
                padding: .5rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #7b3db0;
            }
            span {
                font-weight: bold;
            }

            
        `
    }
        
    static get properties() {
        return { 
            currentPage: { type: Number }
        }
    }

    
    constructor() {
        super();
        this.currentPage = 1;
    }
    
   
    async loadNextPage() {
        await clientsStore.loadNextPage();
        this.currentPage = clientsStore.getCurrentPage();
        this.dispatchEvent(new CustomEvent('update-page'));
       
    }

    async loadPreviousPage() {
        await clientsStore.loadPreviousPage();
        this.currentPage = clientsStore.getCurrentPage();
        this.dispatchEvent(new CustomEvent('update-page'));
       
    }
    
      
    
    render() {
        return html`
            <div class="buttons">
                <button @click=${this.loadPreviousPage}>< Prev</button>
                <span class="page">Page ${this.currentPage}</span>
                <button @click=${this.loadNextPage}>Next ></button>
            </div>
      
        `
      }
      
}

window.customElements.define('clients-buttons', ClientsButtons)

