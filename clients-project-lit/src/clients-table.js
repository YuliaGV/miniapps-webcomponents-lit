import { LitElement, css, html } from 'lit';


export class ClientsTable extends LitElement {

    static get styles() {
        return css`
        :host {
            display: block;
           
        }
        table {
            text-align: center;
            width: 100%;
            border-collapse: collapse;
            background-color: #c2bebe; 
            border-radius: 10px; 
    
        }


        th {
            background-color: #5a26ad;
            color: white;
            font-weight: bold;
            padding: .5rem;
        }

        td {
            padding: .5rem;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }


        `
    }
    
    static get properties() {
        /*
            @type {Array}
        */
        return {
            clients : { type: Array}
        }
    }
    
    constructor() {
        super();
        this.clients = []

    }
    
  
    render() {
        return html`
        <table>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Balance</th>
                    <th>First Name(s)</th>
                    <th>Last Name(s)</th>
                    <th>Gender</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${this.clients.map( client => html`
                <tr>
                    <td>${client.id}</td>
                    <td>$${client.balance}</td>
                    <td>${client.firstNames}</td>
                    <td>${client.lastNames}</td>
                    <td>${client.gender} </td>
                    <td>${client.isActive}</td>
                    <td>
                        <a href="#/" data-id=${client.id}>Select</a>
                        <a href="#/" data-id=${client.id}>Delete</a>
                    </td>

                    

                </tr>
                `)}
            </tbody>
        </table>
        `
    }

}

window.customElements.define('clients-table', ClientsTable)