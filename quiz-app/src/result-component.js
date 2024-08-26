import { LitElement, html, css } from 'lit';

export class ResultComponent extends LitElement {


    static styles = css`

        .result-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .5rem;
            margin: 1rem;
        }

        button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #033538;
            font-size: 1rem;
            font-weight: 600;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
        }

        p{
            font-size: 1.2rem;
        }

    `;


    static properties = {
        score: { type: Number },
        total: { type: Number }
    };

    constructor() { 
        super();
        this.score = 0;
        this.total = 0;
    }

  render() {
    return html`
      <div class="result-container">
        <h2>Resultado</h2>
        <p>Has respondido correctamente ${this.score} de ${this.total} preguntas.</p>
        
        ${this.score === this.total ? html`<p>Epale, Has respondido correctamente todas las preguntas, felicitaciones</p>` : ''}
        ${this.score === 0 ? html`<p>¡Uy quiet@! No has respondido correctamente ninguna pregunta, vuelve a la escuela</p>` : ''}
        ${this.score > 0 && this.score < this.total ? html`<p>Echale ganas hijo! Sigue intentando</p>` : ''}
        
        ${this.score === this.total ? html`<img height="200" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGl4eWZlZzRhYTc3MjZucWE1dzd2eWZpdGgwYWpreTFkaDF1NGZkbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdfyKrN7HGTIY/giphy.gif" alt="Felicidades">` : ''}
        ${this.score === 0 ? html`<img height="200" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG43aWU4bnEwOHR0eWYweHh0cm12dnk0ZWZ5eTIzbGpic3dmam5ueiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XeLcgh8gT8o0F5SQ8i/giphy.gif" alt="Uy quieto">` : ''}
        ${this.score > 0 && this.score < this.total ? html`<img height="200" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzlwYWdneHhnMTdlcGhqM3FrNDJoZ3o3YTFiczNvM3Q0bGN4eGVpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3otPonhzPPFEoMxzVK/giphy.gif" alt="Echale ganas">` : ''}

        
        

        <button @click=${this.restartQuiz}>Reiniciar</button>
      </div>
    `;
  }

  restartQuiz() {
    this.dispatchEvent(new CustomEvent('restart-quiz'));
  }
}

customElements.define('result-component', ResultComponent);