export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

export function formatInteger(value) {
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0,
  }).format(Math.round(Math.max(0, value)));
}

export function formatPercent(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.max(0, value));
}
