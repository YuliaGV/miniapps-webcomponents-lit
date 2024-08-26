import { LitElement, html, css} from 'lit';

import './question-component.js';
import './result-component.js';

class QuizApp extends LitElement {

   static styles = css`

    :host {
      font-family: 'Roboto', sans-serif;
      display: block;
      box-sizing: border-box;
      overflow-x: hidden;
      width: 100%;
    }

    .main-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex-grow: 1;
      background-color: #e0dada;
      width: 100%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }

    .quiz-app-header {
      background-color: #965d13;
      color: white;
      padding: 1rem;
      width: 100%;
      box-sizing: border-box;
    }

    .quiz-app-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
      
    }
   
   `;


  static properties = {
    questions: { type: Array },
    currentQuestionIndex: { type: Number },
    score: { type: Number }
  };

  constructor() {

    super();
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this._quizCompleted = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadQuestions();
  }


  async _loadQuestions() {
    try {
      const response = await fetch('../questions.json');
      this.questions = await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al cargar las preguntas', error);
    }
  }

  _handleAnswerSelected(e) {
    const { isCorrect } = e.detail;
    if (isCorrect) {
      this.score += 1;
    }
  }

  _handleNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex += 1;
    } else {
      this.quizCompleted = true;
      this.requestUpdate();
    }
  }


  _restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizCompleted = false;
  }
 

  render() {
    return html`
      <section class="main-container">

        <div class="quiz-app-header">
          <h1>Quiz App</h1>
          <p>Prueba tus conocimientos</p>
        </div>

        <div class="quiz-app-body">
          ${this.quizCompleted
            ? html`
              <result-component 
                .score=${this.score} 
                .total=${this.questions.length} 
                @restart-quiz=${this._restartQuiz}></result-component>
              `
            : html`
                  ${this.questions.length === 0
                  ? html`<p>Cargando preguntas...</p>`
                  : html`
                    <question-component 
                      .question=${this.questions[this.currentQuestionIndex]}
                      @answer-selected=${this._handleAnswerSelected}
                      @next-question=${this._handleNextQuestion}>
                    </question-component>
                  `
                  }
                `
          }
        </div>
  
      </section>

    `;
  }
}

customElements.define('quiz-app-component', QuizApp);