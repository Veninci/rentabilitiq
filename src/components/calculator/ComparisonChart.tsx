
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '../ui/GlassCard';
import { CircleDollarSign, Home, TrendingUp } from 'lucide-react';
import { PropertyResults } from '@/types/property';
import { formatter } from '@/lib/formatter';

interface ComparisonChartProps {
  longTerm: PropertyResults;
  airbnb: PropertyResults;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ longTerm, airbnb }) => {
  // Données pour le graphique en camembert des rendements
  const yieldData = [
    { name: 'Location longue durée', value: longTerm.netYield, color: '#3B82F6' },
    { name: 'Location Airbnb', value: airbnb.netYield, color: '#10B981' },
  ];
  
  // Données pour le graphique en camembert des cash-flows
  const cashFlowData = [
    { name: 'Location longue durée', value: longTerm.annualCashFlow, color: '#3B82F6' },
    { name: 'Location Airbnb', value: airbnb.annualCashFlow, color: '#10B981' },
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary">
            {data.value < 0 
              ? formatter.formatCurrency(data.value)
              : data.value > 100 
                ? formatter.formatCurrency(data.value) 
                : formatter.formatPercent(data.value)
            }
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <GlassCard className="animate-scale-in">
      <h3 className="text-lg font-semibold mb-6">Comparaison des stratégies de location</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-1">
            <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="font-medium">Rendement net</div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={yieldData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {yieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
              <span className="text-sm text-muted-foreground">Location longue durée</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
              <span className="text-sm text-muted-foreground">Location Airbnb</span>
            </div>
          </div>
          
          <div className="flex justify-between border-t border-gray-100 pt-4 mt-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Location longue durée</div>
              <div className="text-primary font-semibold">{formatter.formatPercent(longTerm.netYield)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Location Airbnb</div>
              <div className="text-primary font-semibold">{formatter.formatPercent(airbnb.netYield)}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-1">
            <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
              <CircleDollarSign className="h-4 w-4 text-primary" />
            </div>
            <div className="font-medium">Cash-flow annuel</div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cashFlowData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cashFlowData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
              <span className="text-sm text-muted-foreground">Location longue durée</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
              <span className="text-sm text-muted-foreground">Location Airbnb</span>
            </div>
          </div>
          
          <div className="flex justify-between border-t border-gray-100 pt-4 mt-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Location longue durée</div>
              <div className={`font-semibold ${longTerm.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formatter.formatCurrency(longTerm.annualCashFlow)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Location Airbnb</div>
              <div className={`font-semibold ${airbnb.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formatter.formatCurrency(airbnb.annualCashFlow)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-primary/5 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
            <Home className="h-4 w-4 text-primary" />
          </div>
          <div className="font-medium">Récapitulatif des stratégies</div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
              Location longue durée
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Revenus annuels</span>
                <span>{formatter.formatCurrency(longTerm.annualIncome)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Charges annuelles</span>
                <span>{formatter.formatCurrency(longTerm.annualExpenses)}</span>
              </li>
              <li className="flex justify-between font-medium">
                <span>Cash-flow mensuel</span>
                <span className={longTerm.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}>
                  {formatter.formatCurrency(longTerm.monthlyCashFlow)}
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
              Location Airbnb
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Revenus annuels</span>
                <span>{formatter.formatCurrency(airbnb.annualIncome)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Charges annuelles</span>
                <span>{formatter.formatCurrency(airbnb.annualExpenses)}</span>
              </li>
              <li className="flex justify-between font-medium">
                <span>Cash-flow mensuel</span>
                <span className={airbnb.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}>
                  {formatter.formatCurrency(airbnb.monthlyCashFlow)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ComparisonChart;
