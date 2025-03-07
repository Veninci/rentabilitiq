
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatter } from '@/lib/formatter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CityData } from './city-data';

interface TrendsChartProps {
  city: CityData;
  activeTab: "monthly" | "yearly";
  onTabChange: (tab: "monthly" | "yearly") => void;
}

const TrendsChart: React.FC<TrendsChartProps> = ({ city, activeTab, onTabChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="text-md font-medium">Évolution sur 5 ans - {city.name}</h3>
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as "monthly" | "yearly")} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-2 w-full sm:w-auto">
            <TabsTrigger value="yearly">Annuelle</TabsTrigger>
            <TabsTrigger value="monthly">Mensuelle</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="bg-white rounded-lg p-4 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activeTab === "yearly" ? city.yearlyTrends : city.monthlyTrends}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={activeTab === "yearly" ? "year" : "month"} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              tickFormatter={(value) => `${formatter.formatCurrency(value, { maximumFractionDigits: 0 })}`}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "Prix au m²") return formatter.formatCurrency(Number(value));
                if (name === "Rendement") return `${value}%`;
                return value;
              }}
              labelFormatter={(label) => activeTab === "yearly" ? `Année: ${label}` : `Mois: ${label}`}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="pricePerSqm" 
              name="Prix au m²" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="averageYield" 
              name="Rendement" 
              stroke="#82ca9d" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendsChart;
