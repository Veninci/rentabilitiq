
export const formatter = {
  formatCurrency: (value: number | null | undefined, options?: Intl.NumberFormatOptions) => {
    // Protection contre les valeurs null, undefined, NaN ou Infinity
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
      return '0 €';
    }
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      ...options,
    }).format(value);
  },
  
  formatNumber: (value: number | null | undefined, options?: Intl.NumberFormatOptions) => {
    // Protection contre les valeurs null, undefined, NaN ou Infinity
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
      return '0';
    }
    
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 2,
      ...options,
    }).format(value);
  },
  
  formatPercent: (value: number | null | undefined, options?: Intl.NumberFormatOptions) => {
    // Protection contre les valeurs null, undefined, NaN ou Infinity
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
      return '0 %';
    }
    
    // Diviser par 100 seulement si nécessaire - la valeur est déjà en pourcentage
    return new Intl.NumberFormat('fr-FR', {
      style: 'percent',
      maximumFractionDigits: 2,
      ...options,
    }).format(value / 100);
  },
  
  formatSavings: (monthlyPrice: number, yearlyPrice: number) => {
    // Protection contre les valeurs null ou undefined
    const safeMonthly = monthlyPrice || 0;
    const safeYearly = yearlyPrice || 0;
    
    const monthlyCost = safeMonthly * 12;
    const savings = monthlyCost - safeYearly;
    const savingsPercent = monthlyCost > 0 ? Math.round((savings / monthlyCost) * 100) : 0;
    
    return {
      amount: savings,
      percent: savingsPercent
    };
  }
};
