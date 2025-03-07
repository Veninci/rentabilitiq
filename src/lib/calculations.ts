
import { PropertyData, PropertyResults } from '@/types/property';

export const calculateResults = (data: PropertyData): PropertyResults => {
  // Calcul de l'investissement total
  const totalInvestment = 
    data.purchasePrice + 
    data.renovationCost + 
    data.notaryFees + 
    data.otherCosts;
  
  // Calcul des revenus annuels selon le type de location
  let annualIncome = 0;
  if (data.rentalType === 'long-term') {
    annualIncome = data.monthlyRent * 12;
  } else {
    // Pour Airbnb : tarif par nuit * nombre de nuits occupées par an
    const daysPerYear = 365;
    const occupiedDays = Math.round(daysPerYear * (data.airbnbOccupancyRate / 100));
    annualIncome = data.airbnbNightlyRate * occupiedDays;
  }
  
  // Calcul de l'échéance mensuelle du prêt
  const monthlyInterestRate = data.interestRate / 100 / 12;
  const numberOfPayments = data.loanTerm * 12;
  
  let monthlyMortgage = 0;
  if (monthlyInterestRate > 0 && numberOfPayments > 0 && data.loanAmount > 0) {
    monthlyMortgage = 
      data.loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }
  
  // Calcul des frais de gestion annuels
  const managementCosts = (annualIncome * data.managementFees) / 100;
  
  // Calcul des dépenses annuelles
  const annualExpenses = 
    data.propertyTax + 
    data.insurance + 
    data.condoFees + 
    data.maintenanceCost + 
    data.otherExpenses + 
    managementCosts + 
    (monthlyMortgage * 12);
  
  // Calcul du cash-flow
  const annualCashFlow = annualIncome - annualExpenses;
  const monthlyCashFlow = annualCashFlow / 12;
  
  // Calcul des rendements
  // Éviter la division par zéro
  const grossYield = totalInvestment > 0 ? (annualIncome / totalInvestment) * 100 : 0;
  const netYield = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
  
  // ROI (Return On Investment) - Calculé sur l'apport personnel pour plus de précision
  // Éviter la division par zéro
  const roi = data.downPayment > 0 ? (annualCashFlow / data.downPayment) * 100 : 0;
  
  // Période de récupération de l'investissement (en années)
  // Si le cash flow est négatif ou nul, l'investissement ne sera jamais rentabilisé
  const paybackPeriod = (annualCashFlow > 0) ? (totalInvestment / annualCashFlow) : Infinity;
  
  // Calcul du prix au m²
  const pricePerSqm = data.propertySize > 0 ? data.purchasePrice / data.propertySize : 0;
  
  // Calcul du loyer au m²
  let rentPerSqm = 0;
  if (data.propertySize > 0) {
    if (data.rentalType === 'long-term') {
      rentPerSqm = data.monthlyRent / data.propertySize;
    } else {
      // Pour Airbnb, on calcule un loyer mensuel équivalent
      const monthlyEquivalent = annualIncome / 12;
      rentPerSqm = monthlyEquivalent / data.propertySize;
    }
  }
  
  return {
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    annualIncome: Math.round(annualIncome * 100) / 100,
    annualExpenses: Math.round(annualExpenses * 100) / 100,
    annualCashFlow: Math.round(annualCashFlow * 100) / 100,
    monthlyCashFlow: Math.round(monthlyCashFlow * 100) / 100,
    grossYield: Math.round(grossYield * 100) / 100,
    netYield: Math.round(netYield * 100) / 100,
    roi: Math.round(roi * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    monthlyMortgage: Math.round(monthlyMortgage * 100) / 100,
    pricePerSqm: Math.round(pricePerSqm * 100) / 100,
    rentPerSqm: Math.round(rentPerSqm * 100) / 100,
  };
};

export const calculateAirbnbResults = (data: PropertyData): PropertyResults => {
  // Créer une copie des données avec la location Airbnb forcée
  const airbnbData: PropertyData = {
    ...data,
    rentalType: 'airbnb',
  };
  
  return calculateResults(airbnbData);
};

export const calculateLongTermResults = (data: PropertyData): PropertyResults => {
  // Créer une copie des données avec la location longue durée forcée
  const longTermData: PropertyData = {
    ...data,
    rentalType: 'long-term',
  };
  
  return calculateResults(longTermData);
};
