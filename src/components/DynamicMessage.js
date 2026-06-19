import { formatCurrency, formatInteger, formatPercent } from '../utils/formatters.js';
import { icon } from '../icons.js';

export function DynamicMessage(inputs, results, isValid) {
  const customers = formatInteger(Number(inputs.recurringCustomers));
  const fee = formatCurrency(Number(inputs.averageMonthlyFee));
  const beforeRate = formatPercent(results.lateRateBefore);
  const afterRate = formatPercent(results.lateRateAfter);
  const improvement = isValid ? formatCurrency(results.monthlyImprovement) : 'um valor válido';
  const reduction = isValid ? formatInteger(results.supportReduction) : '0';
  const isPadraoMercado = inputs.providerProfile === 'media';

  return `
    <section class="dynamic-panel ${!isValid ? 'dynamic-invalid' : ''}" aria-labelledby="dynamic-title">
      <div class="dynamic-icon" aria-hidden="true">${icon('message', 74)}</div>
      <div class="dynamic-title-row">
        <h2 id="dynamic-title">Ao usar a 123zap:</h2>
        <button class="copy-btn" data-copy="dynamic-text" type="button" aria-label="Copiar texto">
          ${icon('clipboard', 18)}
        </button>
      </div>
      <div data-copy-text="dynamic-text">
        <p>Com <strong>${customers} clientes</strong> e mensalidade de <strong>${fee}</strong>, se você tiver <strong>${beforeRate}</strong> de atrasos${isPadraoMercado ? ' (padrão do mercado de provedores)' : ''}, em um cenário com a 123zap esse número pode cair para <strong>${afterRate}</strong>:</p>
        <ul><li>Você pode liberar aproximadamente <strong>${improvement}</strong> por mês em atrasos</li><li>Reduzir cerca de <strong>${reduction}</strong> contatos no suporte por mês</li><li>Porque menos clientes irão acionar o suporte</li></ul>
        <p class="dynamic-footer">Cálculo feito na Calculadora de Provedores 123zap — acesse:
https://provedores.123zap.com.br/</p>
      </div>
    </section>
  `;
}
