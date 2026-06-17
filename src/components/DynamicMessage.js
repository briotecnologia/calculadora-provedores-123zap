import { getProfileLabel } from '../utils/calculator.js';
import { formatCurrency, formatInteger } from '../utils/formatters.js';
import { icon } from '../icons.js';

export function DynamicMessage(inputs, results, isValid) {
  const profileLabel =
    inputs.providerProfile === 'personalizado' ? 'Personalizado' : getProfileLabel(inputs.providerProfile);

  return `
    <section class="dynamic-panel ${!isValid ? 'dynamic-invalid' : ''}" aria-labelledby="dynamic-title">
      <div class="dynamic-icon" aria-hidden="true">${icon('message', 74)}</div>
      <h2 id="dynamic-title">Ao usar a 123zap:</h2>
      <p>
        Com perfil de ${profileLabel}, a 123zap pode liberar aproximadamente
        <strong>${isValid ? formatCurrency(results.monthlyImprovement) : 'um valor válido'}</strong> por mês em
        atrasos e reduzir cerca de
        <strong>${isValid ? formatInteger(results.supportReduction) : '0'}</strong> contatos no suporte por mês,
        porque menos clientes precisam pedir segunda via ou perguntar por que a internet não funciona.
      </p>
    </section>
  `;
}
