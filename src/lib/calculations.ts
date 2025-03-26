
import { PropertyData, PropertyResults } from '@/types/property';

export const calculateResults = (data: PropertyData): PropertyResults => {
  // Ensure all numeric values are valid, replace NaN with 0
  const safeValue = (value: number): number => {
    return isNaN(value) || value === null || value === undefined ? 0 : value;
  };
  
  // Clean input data
  const purchasePrice = safeValue(data.purchasePrice);
  const renovationCost = safeValue(data.renovationCost);
  const notaryFees = safeValue(data.notaryFees);
  const otherCosts = safeValue(data.otherCosts);
  const propertySize = safeValue(data.propertySize);
  const downPayment = safeValue(data.downPayment);
  const loanAmount = safeValue(data.loanAmount);
  const interestRate = safeValue(data.interestRate);
  const loanTerm = safeValue(data.loanTerm);
  const monthlyRent = safeValue(data.monthlyRent);
  const airbnbNightlyRate = safeValue(data.airbnbNightlyRate);
  const airbnbOccupancyRate = safeValue(data.airbnbOccupancyRate);
  const managementFees = safeValue(data.managementFees);
  const propertyTax = safeValue(data.propertyTax);
  const insurance = safeValue(data.insurance);
  const condoFees = safeValue(data.condoFees);
  const maintenanceCost = safeValue(data.maintenanceCost);
  const otherExpenses = safeValue(data.otherExpenses);
  
  // Calcul de l'investissement total - somme exacte des valeurs entrées par l'utilisateur
  const totalInvestment = 
    purchasePrice + 
    renovationCost + 
    notaryFees + 
    otherCosts;
  
  // Calcul des revenus annuels selon le type de location
  let annualIncome = 0;
  if (data.rentalType === 'long-term') {
    // Loyer mensuel * 12 mois
    annualIncome = monthlyRent * 12;
  } else {
    // Pour Airbnb : tarif par nuit * nombre de nuits occupées par an
    const daysPerYear = 365;
    const occupiedDays = Math.round(daysPerYear * Math.min(Math.max(airbnbOccupancyRate, 0), 100) / 100);
    annualIncome = airbnbNightlyRate * occupiedDays;
  }
  
  // Calcul de l'échéance mensuelle du prêt
  let monthlyMortgage = 0;
  
  if (loanAmount > 0) {
    const monthlyInterestRate = interestRate > 0 ? (interestRate / 100) / 12 : 0;
    const numberOfPayments = loanTerm > 0 ? loanTerm * 12 : 0;
    
    if (monthlyInterestRate > 0 && numberOfPayments > 0) {
      // Formule standard pour le calcul d'un prêt à taux fixe
      monthlyMortgage = 
        loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        
      // Protection contre des valeurs infinies ou NaN
      monthlyMortgage = isFinite(monthlyMortgage) ? monthlyMortgage : 0;
    } else if (numberOfPayments > 0) {
      // Si le taux d'intérêt est 0, c'est un simple calcul de division
      monthlyMortgage = loanAmount / numberOfPayments;
    }
  }
  
  // Calcul des frais de gestion annuels - pourcentage des revenus annuels
  const managementCosts = (annualIncome * Math.min(Math.max(managementFees, 0), 100)) / 100;
  
  // Calcul des dépenses annuelles - somme exacte des charges annuelles entrées par l'utilisateur
  const annualExpenses = 
    propertyTax + 
    insurance + 
    condoFees + 
    maintenanceCost + 
    otherExpenses + 
    managementCosts + 
    (monthlyMortgage * 12);
  
  // Calcul du cash-flow - différence entre revenus et dépenses
  const annualCashFlow = annualIncome - annualExpenses;
  const monthlyCashFlow = annualCashFlow / 12;
  
  // Calcul des rendements - correctement calculés par rapport à l'investissement total
  const grossYield = totalInvestment > 0 ? (annualIncome / totalInvestment) * 100 : 0;
  const netYield = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
  
  // Période de récupération de l'investissement (en années)
  // Si le cash flow est négatif ou nul, l'investissement ne sera jamais rentabilisé
  const paybackPeriod = (annualCashFlow > 0) ? (totalInvestment / annualCashFlow) : Infinity;
  
  // Calcul du prix au m² - correctement calculé par rapport à la taille de la propriété
  const pricePerSqm = propertySize > 0 ? purchasePrice / propertySize : 0;
  
  // Calcul du loyer au m² - correctement calculé selon le type de location
  let rentPerSqm = 0;
  if (propertySize > 0) {
    if (data.rentalType === 'long-term') {
      rentPerSqm = monthlyRent / propertySize;
    } else {
      // Pour Airbnb, on calcule un loyer mensuel équivalent
      const monthlyEquivalent = annualIncome / 12;
      rentPerSqm = monthlyEquivalent / propertySize;
    }
  }
  
  // Arrondir les résultats à 2 décimales pour plus de précision
  const roundToTwoDecimals = (value: number): number => {
    return Math.round(value * 100) / 100;
  };
  
  return {
    totalInvestment: roundToTwoDecimals(totalInvestment),
    annualIncome: roundToTwoDecimals(annualIncome),
    annualExpenses: roundToTwoDecimals(annualExpenses),
    annualCashFlow: roundToTwoDecimals(annualCashFlow),
    monthlyCashFlow: roundToTwoDecimals(monthlyCashFlow),
    grossYield: roundToTwoDecimals(grossYield),
    netYield: roundToTwoDecimals(netYield),
    paybackPeriod: roundToTwoDecimals(paybackPeriod),
    monthlyMortgage: roundToTwoDecimals(monthlyMortgage),
    pricePerSqm: roundToTwoDecimals(pricePerSqm),
    rentPerSqm: roundToTwoDecimals(rentPerSqm),
    
    // Add the additional properties needed for charts
    notaryFees: notaryFees,
    renovationCost: renovationCost,
    otherCosts: otherCosts,
    purchasePrice: purchasePrice
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
