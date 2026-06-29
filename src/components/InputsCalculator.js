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
        <span>Clientes recorrentes</span><small>Total de assinantes ativos que pagam mensalmente.</small>
        <div class="input-shell">
          ${icon('users', 19)}
          <input type="text" inputmode="numeric" value="${values.recurringCustomers}" data-field="recurringCustomers" aria-invalid="${!validation.isValid && Number(values.recurringCustomers) <= 0}" />
          <em>clientes</em>
        </div>
      </label>

      <label class="field">
        <span>Mensalidade média dos seus clientes</span><small>Quanto cada assinante paga, em média, por mês ao seu provedor.</small>
        <div class="input-shell">
          ${icon('banknote', 19)}
          <input type="text" inputmode="decimal" value="${values.averageMonthlyFee}" data-field="averageMonthlyFee" aria-invalid="${!validation.isValid && Number(values.averageMonthlyFee) <= 0}" />
          <em>R$/mês</em>
        </div>
      </label>

      <label class="field">
        <span>Atrasos hoje</span><small>Perfil do seu provedor</small>
        <div class="select-shell">
          <select data-field="providerProfile">
            ${optionsMarkup(PROFILE_OPTIONS, values.providerProfile)}
          </select>
        </div>
      </label>

      <label class="field">
        <span>Atrasos com a 123zap</span><small>Cenários ao usar a 123zap</small>
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
                <input type="text" inputmode="decimal" value="${values.customProfileRate}" data-field="customProfileRate" />
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
                <input type="text" inputmode="decimal" value="${values.customImprovementRate}" data-field="customImprovementRate" />
                <em>%</em>
              </div>
            </label>`
          : ''
      }
    </div>
  `;
}
