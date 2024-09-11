import { LitElement, css, html } from 'lit';
import { saveClient } from './clients/client-cases/save-clientjs';

export class ClientsModal extends LitElement {


    static get styles() {
        return css`

        .modal-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        form {
            display: flex;
            flex-direction: column;
            background-color: white;
            padding: 1rem;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .form-group {
            display: flex;
            flex-direction: column;
            justify-content:  center;
            align-items: center;
            margin: .5rem 0;
            gap: .5rem;
        }

       

        input, select {
         
            padding: .5rem;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

   

        button {
            margin-top: 1rem;
            background-color: #5a26ad;
            color: white;
            padding: .5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }



        `
    }

    static get properties() {
        return {
            showModal: { type: Boolean },
            clientNames: { type: String },
            clientLastNames: { type: String },
            clientBalance: { type: Number },
            clientGender: { type: String },
            clientIsActive: { type: Boolean }

        }
    }


    constructor() {
        super();
        this.showModal = false;
        this.clientNames = '';
        this.clientLastNames = '';
        this.clientBalance = 0;
        this.clientGender = '';
        this.clientIsActive = false;
    }

    _stopPropagation(event) {
        event.stopPropagation();
    }

    get _noClientData() {
        return !this.clientNames || !this.clientLastNames || !this.clientBalance || !this.clientGender 
    }

   async _addClient(e) {

        e.preventDefault();
        let client = {
            firstNames: this.clientNames,
            lastNames: this.clientLastNames,
            balance: this.clientBalance,
            gender: this.clientGender,
            isActive: this.clientIsActive
        }

        try {
            let newUser = await saveClient(client);
            this.dispatchEvent(new CustomEvent('update-list'));
            this.clearForm();

        }
        catch (error) {
            console.error(error);
        }

    }

    clearForm() {
        this.clientNames = '';
        this.clientLastNames = '';
        this.clientBalance = 0;
        this.clientGender = '';
        this.clientIsActive = false;
    }






    _closeModal() {
        this.showModal = false;
        this.dispatchEvent(new CustomEvent('close-modal', {
            detail: { showModal: this.showModal }
        }));
    }

    getModalTemplate() {
        return html`
        <div class="modal-dialog" @click=${this._closeModal}>
            <form novalidate @click=${this._stopPropagation}>
                <h3>Add Client</h3>

                <div class="form-group">
                    <label for="firstName">First Names</label>
                    <input type="text" name="firstName"  @input=${(e) => this.clientNames = e.target.value} .value=${this.clientNames} />
                </div>
                <div class="form-group">
                    <label for="lastName">Last Names</label>
                    <input type="text" name="lastName" @input=${(e) => this.clientLastNames = e.target.value} .value=${this.clientLastNames} />
                </div>

                <div class="form-group
                ">
                    <label for="balance">Balance</label>
                    <input type="number" name="balance" step="0.01"  @input=${(e) => this.clientBalance = Number(e.target.value)} .value=${String(this.clientBalance)} />
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender" name="gender" @change=${(e) => this.clientGender = e.target.value} .value=${this.clientGender}>
                        <option value="" selected disabled>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group checkbox">
                   
                   
                    <label for="isActive">Is Active</label>
                    <input type="checkbox" name="isActive" id="isActive"   @change=${(e) => this.clientIsActive = e.target.checked} />
                </div>

                <button type="submit" ?disabled=${this._noClientData} @click=${this._addClient}>
                    Save
                </button>

            </form>

        </div>
        `
    }


    render() {
        return html`
        ${this.showModal ? this.getModalTemplate() : ''}

        
        `
    }


  
}

customElements.define('clients-modal', ClientsModal);