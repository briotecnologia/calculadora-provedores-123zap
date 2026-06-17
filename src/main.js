import { InputsCalculator } from './components/InputsCalculator.js';
import { SummaryCards } from './components/SummaryCards.js';
import { ResultsTable } from './components/ResultsTable.js';
import { DynamicMessage } from './components/DynamicMessage.js';
import { Charts } from './components/Charts.js';
import { calculateResults, DEFAULT_INPUTS, validateInputs } from './utils/calculator.js';
import { formatInteger, formatPercent } from './utils/formatters.js';
import { icon } from './icons.js';

const state = { ...DEFAULT_INPUTS };
const root = document.getElementById('root');

function render() {
  const validation = validateInputs(state);
  const results = calculateResults(state);

  root.innerHTML = `
    <main class="app-shell">
      <header class="topbar" aria-label="Cabeçalho principal">
        <a class="brand" href="#top" aria-label="123zap">
          <img src="./assets/logo-principal-escura.svg" alt="123zap" />
        </a>
        <nav class="nav-links" aria-label="Navegação">
          <a href="#calculadora">Calculadora</a>
          <a href="#resultados">Resultados</a>
          <a href="#graficos">Gráficos</a>
        </nav>
      </header>

      <section id="top" class="hero-section">
        <div class="hero-copy">
          <h1>
            Veja quanto a 123zap pode reduzir em atrasos de pagamento e contatos no suporte técnico.
          </h1>
          <p class="hero-support">
            A 123zap reduz atrasos no pagamento e diminui a pressão no suporte técnico,
            lembrando o assinante no WhatsApp antes do bloqueio.
          </p>
          <a class="button button-large" href="https://123zap.com.br/" target="_blank" rel="noreferrer">
            ${icon('message', 21)}
            Falar com a 123zap
          </a>
          <div class="trust-row" aria-label="Benefícios">
            <span>${icon('message', 20)} Lembretes via WhatsApp</span>
            <span>${icon('shield', 20)} Menos inadimplência</span>
            <span>${icon('headphones', 20)} Menos pressão no suporte</span>
          </div>
        </div>

        <section id="calculadora" class="calculator-panel" aria-labelledby="calculator-title">
          <div class="panel-heading">
            <h2 id="calculator-title">Simule os resultados para o seu provedor</h2>
            <p>Edite os dados e veja os impactos em tempo real.</p>
          </div>
          ${InputsCalculator(state, validation)}
          ${
            validation.messages.length
              ? `<div class="validation-alert" role="alert">${validation.messages
                  .map((message) => `<p>${message}</p>`)
                  .join('')}</div>`
              : ''
          }
          ${SummaryCards(results, validation.isValid)}
        </section>
      </section>

      <section id="resultados" class="results-section">
        ${ResultsTable(results, validation.isValid)}
      </section>

      <section class="message-and-charts">
        <div id="graficos" class="charts-wrap">
          ${Charts(results)}
        </div>
        ${DynamicMessage(state, results, validation.isValid)}
      </section>

      <section class="assumptions" aria-label="Premissas fixas da calculadora">
        <div>
          ${icon('calendar', 22)}
          <strong>Premissas fixas de suporte técnico</strong>
        </div>
        <p>
          Contato suporte sem 123zap: ${formatPercent(0.15)}. Contato suporte com 123zap:
          ${formatPercent(0.08)}.
        </p>
      </section>

      <footer class="footer">
        <div>
          <strong>Resumo da simulação atual</strong>
          <span>
            ${formatInteger(results.lateCustomersBefore)} clientes em atraso hoje podem cair para
            ${formatInteger(results.lateCustomersAfter)} com a 123zap.
          </span>
        </div>
        <a href="#calculadora">Recalcular ${icon('arrow', 16)}</a>
      </footer>
    </main>
  `;

  bindEvents();
}

function bindEvents() {
  root.querySelectorAll('[data-field]').forEach((field) => {
    field.addEventListener('input', (event) => {
      state[event.currentTarget.dataset.field] = event.currentTarget.value;
      render();
    });
    field.addEventListener('change', (event) => {
      state[event.currentTarget.dataset.field] = event.currentTarget.value;
      render();
    });
  });
}

render();
