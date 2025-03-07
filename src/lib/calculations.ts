
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
  if (monthlyInterestRate > 0 && numberOfPayments > 0) {
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
  const grossYield = (annualIncome / totalInvestment) * 100;
  const netYield = (annualCashFlow / totalInvestment) * 100;
  
  // ROI (Return On Investment)
  const roi = (annualCashFlow / data.downPayment) * 100;
  
  // Période de récupération de l'investissement (en années)
  const paybackPeriod = annualCashFlow > 0 ? totalInvestment / annualCashFlow : 999;
  
  return {
    totalInvestment,
    annualIncome,
    annualExpenses,
    annualCashFlow,
    monthlyCashFlow,
    grossYield,
    netYield,
    roi,
    paybackPeriod,
    monthlyMortgage,
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
