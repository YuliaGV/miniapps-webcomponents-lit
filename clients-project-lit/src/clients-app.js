import { LitElement, css, html } from 'lit';
import clientsStore from './clients/store/clients-store';
import './clients-table.js';
import './clients-buttons.js';
import './clients-modal.js';


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
      totalPages: { type: Number },
      /*
          @type {Boolean}
      */
      showModal: { type: Boolean },
    }
  }

  constructor() {
    super();
    this.clients = [];
    this.totalPages = 0;
    this.showModal = false;
  }

  async firstUpdated() {
    await clientsStore.loadNextPage();
    this.clients = clientsStore.getClients();
    this.totalPages = clientsStore.getNumOfPages();
    
  }

  async _updatePage() {
    this.clients = clientsStore.getClients();
    

  }

  async _openModal() {
    this.showModal = true;
  }

  _handleCloseModal() {
    this.showModal = false;
  }

  async _updateList() {
    // await clientsStore.reloadPage();
    
    
  }

  

  render() {
    return html`
      <div>
        <h1>Clients App</h1>
        <button @click=${this._openModal}>
        + Add Client
        </button>
        <clients-table .clients=${this.clients}></clients-table>
        <clients-buttons  .totalPages=${this.totalPages}   @update-page=${this._updatePage}></clients-buttons>
        <clients-modal .showModal=${this.showModal} @close-modal=${this._handleCloseModal} @update-list=${this._updateList}></clients-modal>

        
      
      </div>
     
    `
  }
  
}

window.customElements.define('clients-app', ClientsApp)
