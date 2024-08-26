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


    `
  }

  static get properties() {
    return {
      /*
          @type {Array}
      */
      clients : { type: Array}
    }
  }

  constructor() {
    super();
    this.clients = []
  }

  async firstUpdated() {
    await clientsStore.loadNextPage();
    this.clients = clientsStore.getClients();
    
  }

  async updatePage() {
    this.clients = clientsStore.getClients();

  }

  

  render() {
    return html`
      <div>
        <h1>Clients App</h1>
        <clients-table .clients=${this.clients}></clients-table>
        <clients-buttons  @update-page=${this.updatePage}></clients-buttons>
        
      
      </div>
     
    `
  }
  
}

window.customElements.define('clients-app', ClientsApp)
