
import React from 'react';
import { CityData } from '@/types/cityMarket';
import { formatter } from '@/lib/formatter';

interface MonthlyTrendsProps {
  city: CityData;
}

const MonthlyTrends: React.FC<MonthlyTrendsProps> = ({ city }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">Évolution mensuelle - {city.name}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-2">Mois</th>
              <th className="text-right py-2 px-2">Prix au m²</th>
              <th className="text-right py-2 px-2">Évolution</th>
              <th className="text-right py-2 px-2">Rendement</th>
              <th className="text-right py-2 px-2">Évolution</th>
            </tr>
          </thead>
          <tbody>
            {city.monthlyTrends.map((month, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-2 px-2">{month.month}</td>
                <td className="text-right py-2 px-2">{formatter.formatCurrency(month.pricePerSqm)}</td>
                <td className={`text-right py-2 px-2 ${month.pricePerSqmTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {month.pricePerSqmTrend >= 0 ? '+' : ''}{month.pricePerSqmTrend}%
                </td>
                <td className="text-right py-2 px-2">{month.averageYield}%</td>
                <td className={`text-right py-2 px-2 ${month.averageYieldTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {month.averageYieldTrend >= 0 ? '+' : ''}{month.averageYieldTrend}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyTrends;
