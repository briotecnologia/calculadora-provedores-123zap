import { IMPROVEMENT_OPTIONS, PROFILE_OPTIONS } from '../utils/calculator.js';
import { icon } from '../icons.js';

function optionsMarkup(options, selectedValue) {
  return options
    .map(
      (option) =>
        `<option value="${option.value}" ${option.value === selectedValue ? 'selected' : ''}>${option.label}${
          option.value !== 'personalizado' ? ` — ${option.rate * 100}%` : ''
        }</option>`,
    )
    .join('');
}

export function InputsCalculator(values, validation) {
  return `
    <div class="inputs-grid">
      <label class="field">
        <span>Clientes recorrentes</span>
        <div class="input-shell">
          ${icon('users', 19)}
          <input type="number" min="1" step="1" value="${values.recurringCustomers}" data-field="recurringCustomers" aria-invalid="${!validation.isValid && Number(values.recurringCustomers) <= 0}" />
          <em>clientes</em>
        </div>
      </label>

      <label class="field">
        <span>Mensalidade média</span>
        <div class="input-shell">
          ${icon('banknote', 19)}
          <input type="number" min="0.01" step="1" value="${values.averageMonthlyFee}" data-field="averageMonthlyFee" aria-invalid="${!validation.isValid && Number(values.averageMonthlyFee) <= 0}" />
          <em>R$/mês</em>
        </div>
      </label>

      <label class="field">
        <span>Perfil do provedor</span>
        <div class="select-shell">
          <select data-field="providerProfile">
            ${optionsMarkup(PROFILE_OPTIONS, values.providerProfile)}
          </select>
        </div>
      </label>

      <label class="field">
        <span>Melhoria nos pagamentos</span>
        <div class="select-shell">
          <select data-field="paymentImprovement">
            ${optionsMarkup(IMPROVEMENT_OPTIONS, values.paymentImprovement)}
          </select>
        </div>
      </label>

      ${
        values.providerProfile === 'personalizado'
          ? `<label class="field">
              <span>Taxa própria sem 123zap</span>
              <div class="input-shell">
                ${icon('percent', 19)}
                <input type="number" min="0" max="100" step="0.1" value="${values.customProfileRate}" data-field="customProfileRate" />
                <em>%</em>
              </div>
            </label>`
          : ''
      }

      ${
        values.paymentImprovement === 'personalizado'
          ? `<label class="field">
              <span>Taxa própria com 123zap</span>
              <div class="input-shell">
                ${icon('percent', 19)}
                <input type="number" min="0" max="100" step="0.1" value="${values.customImprovementRate}" data-field="customImprovementRate" />
                <em>%</em>
              </div>
            </label>`
          : ''
      }
    </div>
  `;
}
