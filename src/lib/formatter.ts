
export const formatter = {
  formatCurrency: (value: number | null | undefined, options?: Intl.NumberFormatOptions) => {
    // Protection contre les valeurs null ou undefined
    if (value === null || value === undefined || isNaN(value)) {
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
    // Protection contre les valeurs null ou undefined
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }
    
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 2,
      ...options,
    }).format(value);
  },
  
  formatPercent: (value: number | null | undefined, options?: Intl.NumberFormatOptions) => {
    // Protection contre les valeurs null ou undefined
    if (value === null || value === undefined || isNaN(value)) {
      return '0 %';
    }
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'percent',
      maximumFractionDigits: 2,
      ...options,
    }).format(value / 100);
  },
  
  formatSavings: (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyCost = monthlyPrice * 12;
    const savings = monthlyCost - yearlyPrice;
    const savingsPercent = Math.round((savings / monthlyCost) * 100);
    
    return {
      amount: savings,
      percent: savingsPercent
    };
  }
};
