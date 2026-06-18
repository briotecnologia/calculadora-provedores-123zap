import { icon } from '../icons.js';

export const RULER_STEPS = [
  {
    key: 'd-2',
    image: './assets/d-2.png',
    title: 'D-2 | Dois dias antes do vencimento',
    description: 'Primeiro lembrete amigável sobre o vencimento que se aproxima.',
    tag: 'Lembrete preventivo',
  },
  {
    key: 'd-0',
    image: './assets/d-0.png',
    title: 'D-0 | Dia do vencimento',
    description: 'Notificação no dia do vencimento para evitar o atraso.',
    tag: 'Vencimento',
  },
  {
    key: 'd+1',
    image: './assets/d+1.png',
    title: 'D+1 | Um dia após o vencimento',
    description: 'Alerta de atraso com instruções para regularização.',
    tag: 'Atraso leve',
  },
  {
    key: 'd+7',
    image: './assets/d+7.png',
    title: 'D+7 | Sete dias após o vencimento',
    description: 'Cobrança com aviso de bloqueio dos serviços.',
    tag: 'Cobrança final',
  },
];

export function BillingRulerCTA() {
  return `
    <a class="button button-large ruler-cta" role="button" data-ruler-open>
      <span class="ruler-cta-inner">
        ${icon('message', 21)}
        Exemplo de régua de cobrança via WhatsApp
      </span>
    </a>
  `;
}

export function BillingRulerModal(step) {
  if (!step || step < 1 || step > 4) return '';

  const current = RULER_STEPS[step - 1];
  const total = RULER_STEPS.length;

  return `
    <div class="ruler-overlay" data-ruler-overlay>
      <div class="ruler-modal">
        <button class="ruler-close" type="button" data-ruler-close aria-label="Fechar">
          ${icon('x', 24)}
        </button>

        <div class="ruler-header">
          <span class="ruler-tag">${current.tag}</span>
          <span class="ruler-step-indicator">${step} / ${total}</span>
        </div>

        <h3 class="ruler-title">${current.title}</h3>

        <div class="ruler-image-wrapper">
          <img src="${current.image}" alt="${current.title}" class="ruler-image" />
        </div>

        <p class="ruler-description">${current.description}</p>

        <div class="ruler-nav">
          <div class="ruler-dots">
            ${RULER_STEPS.map((_, i) => `
              <span class="ruler-dot ${i + 1 === step ? 'ruler-dot--active' : ''}" data-ruler-dot="${i + 1}"></span>
            `).join('')}
          </div>

          <div class="ruler-nav-buttons">
            <button class="button button-small button-secondary ruler-nav-btn" type="button" data-ruler-prev ${step === 1 ? 'disabled' : ''}>
              ${icon('arrow-left', 18)}
              <span class="ruler-nav-label">Anterior</span>
            </button>

            <button class="button button-small ruler-nav-btn" type="button" data-ruler-next>
              <span class="ruler-nav-label">${step === total ? 'Finalizar' : 'Próximo'}</span>
              ${step < total ? icon('arrow-right', 18) : icon('check', 18)}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
