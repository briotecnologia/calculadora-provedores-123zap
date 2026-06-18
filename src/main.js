import { InputsCalculator } from './components/InputsCalculator.js';
import { ResultsTable } from './components/ResultsTable.js';
import { DynamicMessage } from './components/DynamicMessage.js';
import { BillingRulerCTA, BillingRulerModal } from './components/BillingRuler.js';
import { calculateResults, DEFAULT_INPUTS, validateInputs, IMPROVEMENT_OPTIONS } from './utils/calculator.js';
import { formatCurrency, formatInteger, formatPercent } from './utils/formatters.js';
import { icon } from './icons.js';

const state = { ...DEFAULT_INPUTS };
const root = document.getElementById('root');

let activeField = null;
let activeCaret = 0;

let rulerStep = 0;

function bar(label, formatted, value, other, className) {
  const max = Math.max(value, other, 1);
  const height = Math.max((value / max) * 100, 4);
  return `
    <div class="bar-column">
      <strong>${formatted}</strong>
      <span class="bar ${className}" style="height: ${height}%"></span>
      <em>${label}</em>
    </div>
  `;
}

function mountRuler() {
  const old = document.querySelector('.ruler-overlay');
  if (old) old.remove();

  const html = BillingRulerModal(rulerStep);
  if (!html) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const overlay = wrapper.firstElementChild;
  if (!overlay) return;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeRuler();
  });

  overlay.querySelector('[data-ruler-close]')?.addEventListener('click', closeRuler);

  overlay.querySelector('[data-ruler-next]')?.addEventListener('click', () => {
    if (rulerStep < 4) { rulerStep++; mountRuler(); }
    else { closeRuler(); }
  });

  overlay.querySelector('[data-ruler-prev]')?.addEventListener('click', () => {
    if (rulerStep > 1) { rulerStep--; mountRuler(); }
  });

  overlay.querySelectorAll('[data-ruler-dot]').forEach((dot) => {
    dot.addEventListener('click', () => {
      rulerStep = Number(dot.dataset.rulerDot);
      mountRuler();
    });
  });
}

function closeRuler() {
  const overlay = document.querySelector('.ruler-overlay');
  if (overlay) overlay.remove();
  document.body.style.overflow = '';
  rulerStep = 0;
}

function render() {
  const validation = validateInputs(state);
  const results = calculateResults(state);

  const restoreField = activeField;
  const restoreCaret = activeCaret;

  root.innerHTML = `
    <main class="app-shell">
      <header class="topbar" aria-label="Cabeçalho principal">
        <a class="brand" href="#top" aria-label="123zap">
          <img src="./assets/logo-principal-escura.svg" alt="123zap" />
        </a>
        <a class="button button-small header-cta" href="https://123zap.com.br/" target="_blank" rel="noreferrer">
          ${icon('external-link', 15)}
          Conheça a 123zap
        </a>
      </header>

      <section id="top" class="hero-section">
        <div class="hero-copy">
          <h1>
            Reduza atrasos e alivie o suporte técnico do seu provedor.
          </h1>
          <p class="hero-support">
            Muitos assinantes não pagam por descuido — esquecem ou priorizam outra conta porque foram lembrados dela. Se esse for o caso, a 123zap resolve: um lembrete no WhatsApp antes do bloqueio reduz a inadimplência e diminui os contatos no suporte.
          </p>
          <div class="hero-actions">
            ${BillingRulerCTA()}
            <a
              class="button button-large button-secondary"
              href="https://youtu.be/aGFc7bdCrCw?si=3p8E9xBlfSG-8NHN"
              target="_blank"
              rel="noreferrer"
            >
              ${icon('play', 21)}
              Assistir demo
            </a>
          </div>
          <a class="hero-link" href="https://123zap.com.br/" target="_blank" rel="noreferrer">
            ${icon('external-link', 16)}
            Conheça a 123zap
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
          <div class="summary-charts">
            <article class="chart-card">
              <h2>Valor mensal em atraso</h2>
              <div class="chart-area">
                ${bar('Sem a 123zap', formatCurrency(results.monthlyLateBefore), results.monthlyLateBefore, results.monthlyLateAfter, 'bar-before')}
                ${bar('Com 123zap', formatCurrency(results.monthlyLateAfter), results.monthlyLateAfter, results.monthlyLateBefore, 'bar-after')}
              </div>
            </article>
            <article class="chart-card">
              <h2>Clientes que acionam suporte</h2>
              <div class="chart-area">
                ${bar('Sem a 123zap', formatInteger(results.supportCustomersBefore), results.supportCustomersBefore, results.supportCustomersAfter, 'bar-before')}
                ${bar('Com 123zap', formatInteger(results.supportCustomersAfter), results.supportCustomersAfter, results.supportCustomersBefore, 'bar-after')}
              </div>
            </article>
          </div>

          <div class="summary-notes">
            <div class="summary-notes-header">
              ${icon('thumbs-up', 20)}
              <strong>Resumo da simulação atual</strong>
            </div>
            <span>
              ${formatInteger(results.lateCustomersBefore)} clientes em atraso hoje podem cair para
              ${formatInteger(results.lateCustomersAfter)} com a 123zap com o cenário
              "${IMPROVEMENT_OPTIONS.find(o => o.value === state.paymentImprovement)?.label ?? state.paymentImprovement}".
            </span>
          </div>
        </section>
      </section>

      <section id="resultados" class="results-section">
        ${ResultsTable(results, validation.isValid)}
      </section>

      <section class="message-and-charts">
        ${DynamicMessage(state, results, validation.isValid)}
      </section>

      <section class="benefits-section">
        <div class="summary-grid ${!validation.isValid ? 'summary-muted' : ''}">
          <article class="summary-card" id="card-valor-mensal-liberado" data-tone="purple">
            <div class="summary-icon">${icon('trending', 26)}</div>
            <strong>${formatCurrency(results.monthlyImprovement)}</strong>
            <span>Valor mensal liberado</span>
          </article>
          <article class="summary-card" id="card-reducao-no-suporte" data-tone="slate">
            <div class="summary-icon">${icon('headphones', 26)}</div>
            <strong>${formatInteger(results.supportReduction)} contatos</strong>
            <span>Redução no suporte</span>
          </article>
          <article class="summary-card" id="card-valor-anual-potencial" data-tone="purple">
            <div class="summary-icon">${icon('trending', 26)}</div>
            <strong>${formatCurrency(results.annualImprovement)}</strong>
            <span>Valor anual potencial</span>
          </article>
        </div>
      </section>

      <section class="assumptions" aria-label="Premissas fixas da calculadora">
        <div>
          ${icon('calendar', 22)}
          <strong>Premissas fixas de suporte técnico</strong>
        </div>
        <p>
          Contato suporte: ${formatPercent(0.15)} dos inadimplentes.
        </p>
      </section>

      <footer class="footer">
        <span>123zap, uma empresa da Brio Soluções em Tecnologia LTDA, CNPJ 49.701.005/0001-30</span>
      </footer>
    </main>
  `;

  bindEvents();

  activeField = null;

  if (restoreField) {
    const el = root.querySelector(`[data-field="${restoreField}"]`);
    if (el) {
      el.focus();
      if (el.tagName !== 'SELECT') el.setSelectionRange(restoreCaret, restoreCaret);
    }
  }
}

function handleFieldEvent(event) {
  const el = event.currentTarget;
  activeField = el.dataset.field;
  const value = el.tagName === 'SELECT' ? el.value : el.value.replace(el.inputmode === 'numeric' ? /[^0-9]/g : /[^0-9.]/g, '');
  activeCaret = el.selectionStart || value.length;
  if (el.tagName !== 'SELECT' && value !== el.value) {
    el.value = value;
  }
  state[activeField] = value;
  render();
}

function bindEvents() {
  root.querySelectorAll('[data-field]').forEach((field) => {
    field.addEventListener('input', handleFieldEvent);
    field.addEventListener('change', handleFieldEvent);
  });

  root.querySelector('[data-copy]')?.addEventListener('click', (event) => {
    const key = event.currentTarget.dataset.copy;
    const source = root.querySelector(`[data-copy-text="${key}"]`);
    if (!source) return;

    const parts = [];
    for (const child of source.children) {
      if (child.tagName === 'P') {
        parts.push(child.textContent.trim());
      } else if (child.tagName === 'UL') {
        for (const li of child.children) {
          parts.push('• ' + li.textContent.trim());
        }
      }
    }
    const text = parts.join('\n\n');
    navigator.clipboard.writeText(text).catch(() => {});

    const btn = event.currentTarget;
    btn.innerHTML = icon('check', 18);
    btn.classList.add('copy-btn--done');

    const tooltip = document.createElement('span');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Copiado!';
    btn.appendChild(tooltip);
    requestAnimationFrame(() => tooltip.classList.add('copy-tooltip--visible'));

    setTimeout(() => {
      btn.innerHTML = icon('clipboard', 18);
      btn.classList.remove('copy-btn--done');
    }, 2000);
  });

}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.querySelector('.ruler-overlay');
    if (overlay) closeRuler();
  }
});

root.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-ruler-open]');
  if (btn) {
    rulerStep = 1;
    mountRuler();
  }
});

render();
