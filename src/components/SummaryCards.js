import { formatCurrency, formatInteger } from '../utils/formatters.js';
import { icon } from '../icons.js';

export function SummaryCards(results, isValid) {
  const cards = [
    {
      title: 'Valor mensal liberado',
      value: formatCurrency(results.monthlyImprovement),
      iconName: 'banknote',
      tone: 'purple',
    },
    {
      title: 'Redução no suporte',
      value: `${formatInteger(results.supportReduction)} contatos`,
      iconName: 'headphones',
      tone: 'slate',
    },
    {
      title: 'Valor anual potencial',
      value: formatCurrency(results.annualImprovement),
      iconName: 'trending',
      tone: 'purple',
    },
  ];

  return `
    <div class="summary-grid ${!isValid ? 'summary-muted' : ''}">
      ${cards
        .map(
          (card) => `
            <article class="summary-card" data-tone="${card.tone}">
              <div class="summary-icon">${icon(card.iconName, 26)}</div>
              <strong>${card.value}</strong>
              <span>${card.title}</span>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}
