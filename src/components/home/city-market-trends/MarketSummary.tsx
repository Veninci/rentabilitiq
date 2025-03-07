
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatter } from '@/lib/formatter';
import { CityData } from './city-data';

interface MarketSummaryProps {
  city: CityData;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({ city }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm text-muted-foreground mb-1">Prix moyen au m²</div>
        <div className="text-xl font-semibold">{formatter.formatCurrency(city.pricePerSqm)}</div>
        <div className={`text-sm flex items-center mt-1 ${city.pricePerSqmTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {city.pricePerSqmTrend >= 0 ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {city.pricePerSqmTrend >= 0 ? '+' : ''}{city.pricePerSqmTrend}% ce mois
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm text-muted-foreground mb-1">Rendement moyen</div>
        <div className="text-xl font-semibold">{city.averageYield}%</div>
        <div className={`text-sm flex items-center mt-1 ${city.averageYieldTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {city.averageYieldTrend >= 0 ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {city.averageYieldTrend >= 0 ? '+' : ''}{city.averageYieldTrend}% ce mois
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
