import { LitElement, html, css} from 'lit';

export class QuestionComponent extends LitElement {
    
    static styles = css`

        .question-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
       
        .options {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }

        button {
            padding: 0.5rem 1rem;
            background-color: #965d13;
            font-size: 1rem;
            font-weight: 600;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            
        }

        button:disabled {
            background-color: #7c7b7b;
            
        }

        button.next {
            background-color: #033538;
            color: white;
            
        }

        .right {
            color: #097a3a;
        }

        .wrong {
            color: #8b2e2e;

        }

        p, h2{
            font-weight: 600;
            max-width: 100%;
            
        }

        .img {
            margin-top: 1rem;
            border-radius: 0.5rem;
        }

    `
    
    static properties = {
        question: { type: Object }
    };
    
    constructor() {
        super();
        this.question = {};
        this._showAnswer = false;
        this._selectedOption = null;
    }
    

    _selectAnswer(index) {
        const isCorrect = index === this.question.correctAnswer;
        this._selectedOption = index;
        this._showAnswer = true;
        
        this.requestUpdate();
    
        this.dispatchEvent(new CustomEvent('answer-selected', {
          detail: { isCorrect }
        }));
    }
    
    _nextQuestion() {
        this._showAnswer = false;
        this.requestUpdate(); 
        this.dispatchEvent(new CustomEvent('next-question'));
    }
    

  render() {
    return html`
      <div class="question-container">
        <h2>${this.question.question}</h2>
        <div class="options">
          ${this.question.options.map((option, index) => html`
            <button @click=${() => this._selectAnswer(index)} ?disabled=${this._showAnswer}>${option}</button>
          `)}
        </div>

    
   
        ${this._showAnswer 
            ? html`

                ${this.question.image ? html`<img src="${this.question.image}" class="img" alt="Pregunta" height="200">` : ''}
    
                ${this._selectedOption === this.question.correctAnswer

                    ? html`
                        <p class="right">Respuesta correcta :)</p>
                        <p>Explicación:</p>
                        <p>${this.question.explanation}</p>
                    `

                    : html`
                        <p class="wrong">Respuesta incorrecta :C</p>
                        <p>Explicación:</p>
                        <p>${this.question.explanation}</p>
                    `
                }
                 
                <div class="answer-container">
                    <button @click=${this._nextQuestion} class="next">Siguiente</button>
                </div>

            ` 
            : ''
            }
            
      </div>
    `;
  }
}

customElements.define('question-component', QuestionComponent);