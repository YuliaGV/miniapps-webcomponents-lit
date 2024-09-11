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
            button:disabled {
                background-color: #c2bebe;
                cursor: not-allowed;
            }
            span {
                font-weight: bold;
            }

            
        `
    }
        
    static get properties() {
        return { 
            currentPage: { type: Number },
            totalPages: { type: Number }
        }
    }

    
    constructor() {
        super();
        this.currentPage = 1;
        this.totalPages = 0;
    }
    
   
    async _loadNextPage() {
        await clientsStore.loadNextPage();
        this.currentPage = clientsStore.getCurrentPage();
        this.dispatchEvent(new CustomEvent('update-page'));
       
    }

    async _loadPreviousPage() {
        await clientsStore.loadPreviousPage();
        this.currentPage = clientsStore.getCurrentPage();
        this.dispatchEvent(new CustomEvent('update-page'));
       
    }
    
      
    
    render() {
        return html`
            <div class="buttons">
                <button @click=${this._loadPreviousPage} .disabled=${this.currentPage === 1}>< Previous</button>
                <span class="page">Page ${this.currentPage} of ${this.totalPages}</span>
                <button @click=${this._loadNextPage} .disabled=${this.currentPage === this.totalPages}>Next ></button>
            </div>
      
        `
      }
      
}

window.customElements.define('clients-buttons', ClientsButtons)

