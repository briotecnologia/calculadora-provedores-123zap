import { formatCurrency, formatInteger } from '../utils/formatters.js';

function BarChart({ title, before, after, beforeLabel, afterLabel, formatter }) {
  const max = Math.max(before, after, 1);
  const beforeHeight = Math.max((before / max) * 100, 4);
  const afterHeight = Math.max((after / max) * 100, 4);

  return `
    <article class="chart-card">
      <h2>${title}</h2>
      <div class="chart-area" aria-label="${title}">
        <div class="bar-column">
          <strong>${formatter(before)}</strong>
          <span class="bar bar-before" style="height: ${beforeHeight}%"></span>
          <em>${beforeLabel}</em>
        </div>
        <div class="bar-column">
          <strong>${formatter(after)}</strong>
          <span class="bar bar-after" style="height: ${afterHeight}%"></span>
          <em>${afterLabel}</em>
        </div>
      </div>
    </article>
  `;
}

export function Charts(results) {
  return `
    ${BarChart({
      title: 'Valor mensal em atraso',
      before: results.monthlyLateBefore,
      after: results.monthlyLateAfter,
      beforeLabel: 'Sem a 123zap',
      afterLabel: 'Com 123zap',
      formatter: formatCurrency,
    })}
    ${BarChart({
      title: 'Clientes que acionam suporte',
      before: results.supportCustomersBefore,
      after: results.supportCustomersAfter,
      beforeLabel: 'Sem a 123zap',
      afterLabel: 'Com 123zap',
      formatter: formatInteger,
    })}
  `;
}
