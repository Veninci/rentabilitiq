
export const formatter = {
  formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      ...options,
    }).format(value);
  },
  
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 2,
      ...options,
    }).format(value);
  },
  
  formatPercent: (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'percent',
      maximumFractionDigits: 2,
      ...options,
    }).format(value / 100);
  },
};
