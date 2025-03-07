
export interface CityData {
  name: string;
  pricePerSqm: number;
  pricePerSqmTrend: number;
  averageYield: number;
  averageYieldTrend: number;
  monthlyTrends: Array<{
    month: string;
    pricePerSqm: number;
    pricePerSqmTrend: number;
    averageYield: number;
    averageYieldTrend: number;
  }>;
  yearlyTrends: Array<{
    year: string;
    pricePerSqm: number;
    averageYield: number;
  }>;
}

export const cityData: Record<string, CityData> = {
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
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 9800, averageYield: 4.2 },
      { year: "2020", pricePerSqm: 10200, averageYield: 4.0 },
      { year: "2021", pricePerSqm: 10600, averageYield: 3.9 },
      { year: "2022", pricePerSqm: 10900, averageYield: 3.8 },
      { year: "2023", pricePerSqm: 11250, averageYield: 3.8 }
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
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 4600, averageYield: 5.8 },
      { year: "2020", pricePerSqm: 4800, averageYield: 5.6 },
      { year: "2021", pricePerSqm: 5100, averageYield: 5.4 },
      { year: "2022", pricePerSqm: 5250, averageYield: 5.2 },
      { year: "2023", pricePerSqm: 5380, averageYield: 5.1 }
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
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 4600, averageYield: 4.5 },
      { year: "2020", pricePerSqm: 4800, averageYield: 4.5 },
      { year: "2021", pricePerSqm: 5100, averageYield: 4.4 },
      { year: "2022", pricePerSqm: 5050, averageYield: 4.6 },
      { year: "2023", pricePerSqm: 4950, averageYield: 4.8 }
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
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 2600, averageYield: 7.2 },
      { year: "2020", pricePerSqm: 2750, averageYield: 7.0 },
      { year: "2021", pricePerSqm: 2900, averageYield: 6.8 },
      { year: "2022", pricePerSqm: 3080, averageYield: 6.6 },
      { year: "2023", pricePerSqm: 3180, averageYield: 6.5 }
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
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 3100, averageYield: 6.3 },
      { year: "2020", pricePerSqm: 3200, averageYield: 6.1 },
      { year: "2021", pricePerSqm: 3300, averageYield: 6.0 },
      { year: "2022", pricePerSqm: 3400, averageYield: 5.9 },
      { year: "2023", pricePerSqm: 3450, averageYield: 5.8 }
    ]
  }
};
