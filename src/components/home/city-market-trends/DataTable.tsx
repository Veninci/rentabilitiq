
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
          
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-2 px-2 font-medium">Mois</th>
                  <th className="text-right py-2 px-2 font-medium">Prix au m²</th>
                  <th className="text-right py-2 px-2 font-medium">Évolution</th>
                  <th className="text-right py-2 px-2 font-medium">Rendement</th>
                  <th className="text-right py-2 px-2 font-medium">Évolution</th>
                </tr>
              </thead>
              <tbody>
                {city.monthlyTrends.map((month, index) => (
                  <tr key={index} className="border-t hover:bg-muted/20">
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
          
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-2 px-2 font-medium">Année</th>
                  <th className="text-right py-2 px-2 font-medium">Prix au m²</th>
                  <th className="text-right py-2 px-2 font-medium">Rendement</th>
                </tr>
              </thead>
              <tbody>
                {city.yearlyTrends.map((year, index) => (
                  <tr key={index} className="border-t hover:bg-muted/20">
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
