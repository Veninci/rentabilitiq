
export type RentalType = 'long-term' | 'airbnb';

export interface PropertyData {
  // Achat
  purchasePrice: number;
  renovationCost: number;
  notaryFees: number;
  otherCosts: number;
  propertySize: number; // Added property size in m²
  
  // Financement
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  
  // Location
  rentalType: RentalType;
  monthlyRent: number;
  airbnbNightlyRate: number;
  airbnbOccupancyRate: number;
  managementFees: number;
  city: string;
  
  // Charges
  propertyTax: number;
  insurance: number;
  condoFees: number;
  maintenanceCost: number;
  otherExpenses: number;
}

export interface PropertyResults {
  totalInvestment: number;
  annualIncome: number;
  annualExpenses: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  grossYield: number;
  netYield: number;
  paybackPeriod: number;
  monthlyMortgage: number;
  pricePerSqm: number; // Added price per m²
  rentPerSqm: number;  // Added rent per m²
}
