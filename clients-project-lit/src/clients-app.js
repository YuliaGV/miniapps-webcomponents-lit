import { LitElement, css, html } from 'lit';
import clientsStore from './clients/store/clients-store';
import './clients-table.js';
import './clients-buttons.js';


export class ClientsApp extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        padding: .5rem;
        margin: .5rem;
        max-width: 800px;
        font-size: .75rem;
        overflow-x:auto

      }

      button {
        background-color: #5a26ad;
        color: white;
        padding: .5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 1rem;
      }


    `
  }

  static get properties() {
    return {
      /*
          @type {Array}
      */
      clients : { type: Array},
      /*
          @type {Number}
      */
      totalPages: { type: Number }
    }
  }

  constructor() {
    super();
    this.clients = [];
    this.totalPages = 0;
  }

  async firstUpdated() {
    await clientsStore.loadNextPage();
    this.clients = clientsStore.getClients();
    this.totalPages = clientsStore.getNumOfPages();
    
  }

  async updatePage() {
    this.clients = clientsStore.getClients();

  }

  

  render() {
    return html`
      <div>
        <h1>Clients App</h1>
        <button>
        + Add Client
        </button>
        <clients-table .clients=${this.clients}></clients-table>
        <clients-buttons  @update-page=${this.updatePage} .totalPages=${this.totalPages}></clients-buttons>
        
      
      </div>
     
    `
  }
  
}

window.customElements.define('clients-app', ClientsApp)
