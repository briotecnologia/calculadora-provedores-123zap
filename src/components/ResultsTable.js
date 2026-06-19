import { formatCurrency, formatInteger, formatPercent } from '../utils/formatters.js';

export function ResultsTable(results, isValid) {
  const rows = [
    {
      metric: 'Taxa de atraso',
      before: formatPercent(results.lateRateBefore),
      after: formatPercent(results.lateRateAfter),
      improvement: formatPercent(results.lateRateBefore - results.lateRateAfter),
    },
    {
      metric: 'Clientes em atraso',
      before: formatInteger(results.lateCustomersBefore),
      after: formatInteger(results.lateCustomersAfter),
      improvement: formatInteger(results.improvedLateCustomers),
    },
    {
      metric: 'Valor mensal em atraso',
      before: formatCurrency(results.monthlyLateBefore),
      after: formatCurrency(results.monthlyLateAfter),
      improvement: formatCurrency(results.monthlyImprovement),
    },
    {
      metric: 'Valor anual em atraso',
      before: formatCurrency(results.annualLateBefore),
      after: formatCurrency(results.annualLateAfter),
      improvement: formatCurrency(results.annualImprovement),
    },
    {
      metric: 'Clientes que acionam suporte',
      before: formatInteger(results.supportCustomersBefore),
      after: formatInteger(results.supportCustomersAfter),
      improvement: formatInteger(results.supportReduction),
    },
  ];

  return `
    <div class="table-panel table-desktop">
      <h2>Impacto estimado no seu provedor</h2>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Sem a 123zap</th>
              <th>Com 123zap</th>
              <th>Melhoria</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <th scope="row">${row.metric}</th>
                    <td>${row.before}</td>
                    <td>${row.after}</td>
                    <td class="${isValid ? 'improvement-cell' : 'muted-cell'}">${row.improvement}</td>
                  </tr>
                `,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="table-panel table-mobile">
      <h2>Impacto estimado no seu provedor</h2>
      <div class="results-cards">
        ${rows
          .map(
            (row) => `
              <div class="result-card">
                <h3>${row.metric}</h3>
                <div class="result-card-row"><span>Sem a 123zap</span><span>${row.before}</span></div>
                <div class="result-card-row"><span>Com 123zap</span><span>${row.after}</span></div>
                <div class="result-card-row result-card-improvement ${isValid ? '' : 'result-card-muted'}"><span>Melhoria</span><span>${row.improvement}</span></div>
              </div>
            `,
          )
          .join('')}
      </div>
    </div>
  `;
}
