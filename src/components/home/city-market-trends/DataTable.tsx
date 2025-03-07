
import React from 'react';
import { formatter } from '@/lib/formatter';
import { CityData } from './city-data';

interface DataTableProps {
  city: CityData;
  activeTab: "monthly" | "yearly";
}

const DataTable: React.FC<DataTableProps> = ({ city, activeTab }) => {
  return (
    <>
      {/* Monthly data table */}
      {activeTab === "monthly" && (
        <div className="space-y-4">
          <h3 className="text-md font-medium">Données mensuelles - {city.name}</h3>
          
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
      )}
      
      {/* Yearly data table */}
      {activeTab === "yearly" && (
        <div className="space-y-4">
          <h3 className="text-md font-medium">Données annuelles - {city.name}</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Année</th>
                  <th className="text-right py-2 px-2">Prix au m²</th>
                  <th className="text-right py-2 px-2">Rendement</th>
                </tr>
              </thead>
              <tbody>
                {city.yearlyTrends.map((year, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-2 px-2">{year.year}</td>
                    <td className="text-right py-2 px-2">{formatter.formatCurrency(year.pricePerSqm)}</td>
                    <td className="text-right py-2 px-2">{year.averageYield}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
