
export interface CityMonthlyTrend {
  month: string;
  pricePerSqm: number;
  pricePerSqmTrend: number;
  averageYield: number;
  averageYieldTrend: number;
}

export interface CityData {
  name: string;
  pricePerSqm: number;
  pricePerSqmTrend: number;
  averageYield: number;
  averageYieldTrend: number;
  monthlyTrends: CityMonthlyTrend[];
}

// List of major French cities
export const MAJOR_CITIES = [
  "Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nice", 
  "Nantes", "Strasbourg", "Montpellier", "Rennes", "Grenoble", "Toulon",
  "Dijon", "Angers", "Le Mans", "Reims", "Saint-Étienne", "Aix-en-Provence",
  "Brest", "Le Havre", "Clermont-Ferrand", "Tours", "Limoges", "Amiens"
];

// Default city data
export const DEFAULT_CITY_DATA: Record<string, CityData> = {
  "Paris": {
    name: "Paris",
    pricePerSqm: 11250,
    pricePerSqmTrend: 2.1,
    averageYield: 3.8,
    averageYieldTrend: -0.3,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 11050, pricePerSqmTrend: 0.8, averageYield: 3.9, averageYieldTrend: -0.1 },
      { month: "Février", pricePerSqm: 11100, pricePerSqmTrend: 0.5, averageYield: 3.9, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 11150, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: -0.1 },
      { month: "Avril", pricePerSqm: 11200, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: 0 },
      { month: "Mai", pricePerSqm: 11250, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 11250, pricePerSqmTrend: 0, averageYield: 3.8, averageYieldTrend: 0 }
    ]
  },
  "Lyon": {
    name: "Lyon",
    pricePerSqm: 5380,
    pricePerSqmTrend: 1.8,
    averageYield: 5.1,
    averageYieldTrend: 0.2,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 5250, pricePerSqmTrend: 0.6, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 5280, pricePerSqmTrend: 0.6, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 5320, pricePerSqmTrend: 0.8, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 5350, pricePerSqmTrend: 0.6, averageYield: 5.1, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 5370, pricePerSqmTrend: 0.4, averageYield: 5.1, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 5380, pricePerSqmTrend: 0.2, averageYield: 5.1, averageYieldTrend: 0 }
    ]
  },
  "Bordeaux": {
    name: "Bordeaux",
    pricePerSqm: 4950,
    pricePerSqmTrend: -0.3,
    averageYield: 4.8,
    averageYieldTrend: 0.5,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 4980, pricePerSqmTrend: -0.2, averageYield: 4.6, averageYieldTrend: 0.1 },
      { month: "Février", pricePerSqm: 4970, pricePerSqmTrend: -0.2, averageYield: 4.7, averageYieldTrend: 0.2 },
      { month: "Mars", pricePerSqm: 4960, pricePerSqmTrend: -0.2, averageYield: 4.7, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 4955, pricePerSqmTrend: -0.1, averageYield: 4.8, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 4950, pricePerSqmTrend: -0.1, averageYield: 4.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 4950, pricePerSqmTrend: 0, averageYield: 4.8, averageYieldTrend: 0 }
    ]
  },
  "Marseille": {
    name: "Marseille",
    pricePerSqm: 3180,
    pricePerSqmTrend: 3.2,
    averageYield: 6.5,
    averageYieldTrend: 0.1,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 3080, pricePerSqmTrend: 0.8, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 3100, pricePerSqmTrend: 0.6, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 3130, pricePerSqmTrend: 1.0, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 3160, pricePerSqmTrend: 1.0, averageYield: 6.5, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 3170, pricePerSqmTrend: 0.3, averageYield: 6.5, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 3180, pricePerSqmTrend: 0.3, averageYield: 6.5, averageYieldTrend: 0 }
    ]
  },
  "Strasbourg": {
    name: "Strasbourg",
    pricePerSqm: 3450,
    pricePerSqmTrend: 1.5,
    averageYield: 5.8,
    averageYieldTrend: 0.2,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 3390, pricePerSqmTrend: 0.3, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 3400, pricePerSqmTrend: 0.3, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 3420, pricePerSqmTrend: 0.6, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 3435, pricePerSqmTrend: 0.4, averageYield: 5.8, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 3445, pricePerSqmTrend: 0.3, averageYield: 5.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 3450, pricePerSqmTrend: 0.1, averageYield: 5.8, averageYieldTrend: 0 }
    ]
  }
};
