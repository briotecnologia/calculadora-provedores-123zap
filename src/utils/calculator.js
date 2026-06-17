export const PROFILE_OPTIONS = [
  { label: 'Muitos atrasos', value: 'muitos', rate: 0.5 },
  { label: 'Atrasos na média', value: 'media', rate: 0.4 },
  { label: 'Poucos atrasos', value: 'poucos', rate: 0.3 },
  { label: 'Personalizado', value: 'personalizado', rate: 0.4 },
];

export const IMPROVEMENT_OPTIONS = [
  { label: 'Otimista', value: 'otimista', rate: 0.08 },
  { label: 'Moderado', value: 'moderado', rate: 0.12 },
  { label: 'Pessimista', value: 'pessimista', rate: 0.2 },
  { label: 'Personalizado', value: 'personalizado', rate: 0.12 },
];

export const SUPPORT_WITHOUT_123ZAP = 0.15;
export const SUPPORT_WITH_123ZAP = 0.08;

export const DEFAULT_INPUTS = {
  recurringCustomers: 500,
  averageMonthlyFee: 98,
  providerProfile: 'media',
  customProfileRate: 40,
  paymentImprovement: 'moderado',
  customImprovementRate: 12,
};

export function getProfileLabel(value) {
  return PROFILE_OPTIONS.find((option) => option.value === value)?.label ?? 'Personalizado';
}

export function getRateFromSelection(options, selected, customRate) {
  if (selected === 'personalizado') {
    return Number(customRate) / 100;
  }

  return options.find((option) => option.value === selected)?.rate ?? 0;
}

export function calculateResults(inputs) {
  const lateRateBefore = getRateFromSelection(
    PROFILE_OPTIONS,
    inputs.providerProfile,
    inputs.customProfileRate,
  );
  const lateRateAfter = getRateFromSelection(
    IMPROVEMENT_OPTIONS,
    inputs.paymentImprovement,
    inputs.customImprovementRate,
  );

  const customers = Number(inputs.recurringCustomers) || 0;
  const fee = Number(inputs.averageMonthlyFee) || 0;

  const lateCustomersBefore = customers * lateRateBefore;
  const lateCustomersAfter = customers * lateRateAfter;
  const improvedLateCustomers = lateCustomersBefore - lateCustomersAfter;
  const monthlyLateBefore = lateCustomersBefore * fee;
  const monthlyLateAfter = lateCustomersAfter * fee;
  const monthlyImprovement = monthlyLateBefore - monthlyLateAfter;
  const annualLateBefore = monthlyLateBefore * 12;
  const annualLateAfter = monthlyLateAfter * 12;
  const annualImprovement = monthlyImprovement * 12;
  const supportCustomersBefore = lateCustomersBefore * SUPPORT_WITHOUT_123ZAP;
  const supportCustomersAfter = lateCustomersAfter * SUPPORT_WITH_123ZAP;
  const supportReduction = supportCustomersBefore - supportCustomersAfter;

  return {
    lateRateBefore,
    lateRateAfter,
    lateCustomersBefore,
    lateCustomersAfter,
    improvedLateCustomers,
    monthlyLateBefore,
    monthlyLateAfter,
    monthlyImprovement,
    annualLateBefore,
    annualLateAfter,
    annualImprovement,
    supportCustomersBefore,
    supportCustomersAfter,
    supportReduction,
  };
}

export function validateInputs(inputs) {
  const messages = [];
  const customers = Number(inputs.recurringCustomers);
  const fee = Number(inputs.averageMonthlyFee);
  const profileRate = getRateFromSelection(PROFILE_OPTIONS, inputs.providerProfile, inputs.customProfileRate);
  const improvementRate = getRateFromSelection(
    IMPROVEMENT_OPTIONS,
    inputs.paymentImprovement,
    inputs.customImprovementRate,
  );

  if (!Number.isFinite(customers) || customers <= 0) {
    messages.push('Clientes recorrentes deve ser maior que zero.');
  }

  if (!Number.isFinite(fee) || fee <= 0) {
    messages.push('Mensalidade média deve ser maior que zero.');
  }

  if (!Number.isFinite(profileRate) || profileRate < 0 || profileRate > 1) {
    messages.push('A taxa de atraso sem 123zap deve estar entre 0% e 100%.');
  }

  if (!Number.isFinite(improvementRate) || improvementRate < 0 || improvementRate > 1) {
    messages.push('A taxa de atraso com 123zap deve estar entre 0% e 100%.');
  }

  if (Number.isFinite(profileRate) && Number.isFinite(improvementRate) && improvementRate >= profileRate) {
    messages.push('A taxa com 123zap deve ser menor que a taxa sem 123zap.');
  }

  return {
    isValid: messages.length === 0,
    messages,
  };
}
