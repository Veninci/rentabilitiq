
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import GlassCard from '../ui/GlassCard';
import { CircleDollarSign, Home, TrendingUp, BarChart3, Sigma } from 'lucide-react';
import { PropertyResults } from '@/types/property';
import { formatter } from '@/lib/formatter';

interface ComparisonChartProps {
  longTerm: PropertyResults;
  airbnb: PropertyResults;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ longTerm, airbnb }) => {
  // Format data for charts to avoid NaN
  const yieldData = [
    { 
      name: 'Location longue durée', 
      value: isNaN(longTerm.netYield) ? 0 : longTerm.netYield,
      color: '#3B82F6' 
    },
    { 
      name: 'Location Airbnb', 
      value: isNaN(airbnb.netYield) ? 0 : airbnb.netYield,
      color: '#10B981' 
    },
  ];
  
  const cashFlowData = [
    { 
      name: 'Location longue durée', 
      value: isNaN(longTerm.annualCashFlow) ? 0 : longTerm.annualCashFlow,
      color: '#3B82F6' 
    },
    { 
      name: 'Location Airbnb', 
      value: isNaN(airbnb.annualCashFlow) ? 0 : airbnb.annualCashFlow,
      color: '#10B981' 
    },
  ];
  
  // Data for revenue comparison chart
  const revenueData = [
    { name: 'Revenus', longTerm: longTerm.annualIncome, airbnb: airbnb.annualIncome },
    { name: 'Charges', longTerm: longTerm.annualExpenses, airbnb: airbnb.annualExpenses },
    { name: 'Cash-flow', longTerm: longTerm.annualCashFlow, airbnb: airbnb.annualCashFlow },
  ];
  
  // Data for monthly income comparison
  const monthlyData = [
    { 
      name: 'Cash-flow mensuel', 
      'Location longue durée': longTerm.monthlyCashFlow, 
      'Location Airbnb': airbnb.monthlyCashFlow 
    },
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary">
            {data.value < 0 || data.value > 100 
              ? formatter.formatCurrency(data.value)
              : formatter.formatPercent(data.value)
            }
          </p>
        </div>
      );
    }
    return null;
  };
  
  const BarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow-sm border border-gray-100 text-sm">
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}: </span>
              {formatter.formatCurrency(entry.value)}
            </p>
          ))}
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
              <div className="text-primary font-semibold">
                {isNaN(longTerm.netYield) ? "0 %" : formatter.formatPercent(longTerm.netYield)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Location Airbnb</div>
              <div className="text-primary font-semibold">
                {isNaN(airbnb.netYield) ? "0 %" : formatter.formatPercent(airbnb.netYield)}
              </div>
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
                {isNaN(longTerm.annualCashFlow) ? "0 €" : formatter.formatCurrency(longTerm.annualCashFlow)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Location Airbnb</div>
              <div className={`font-semibold ${airbnb.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {isNaN(airbnb.annualCashFlow) ? "0 €" : formatter.formatCurrency(airbnb.annualCashFlow)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Added Bar Chart for Revenue Comparison */}
      <div className="mt-8 bg-primary/5 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div className="font-medium">Comparaison des flux financiers</div>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => formatter.formatCurrency(value)} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip content={<BarTooltip />} />
              <Legend />
              <Bar dataKey="longTerm" name="Location longue durée" fill="#3B82F6" />
              <Bar dataKey="airbnb" name="Location Airbnb" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Monthly Cash Flow Bar Chart */}
      <div className="mt-8 bg-primary/5 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
            <Sigma className="h-4 w-4 text-primary" />
          </div>
          <div className="font-medium">Cash-flow mensuel</div>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatter.formatCurrency(value)} />
              <Tooltip content={<BarTooltip />} />
              <Legend />
              <Bar dataKey="Location longue durée" fill="#3B82F6" />
              <Bar dataKey="Location Airbnb" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
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
                <span>{isNaN(longTerm.annualIncome) ? "0 €" : formatter.formatCurrency(longTerm.annualIncome)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Charges annuelles</span>
                <span>{isNaN(longTerm.annualExpenses) ? "0 €" : formatter.formatCurrency(longTerm.annualExpenses)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Rendement net</span>
                <span>{isNaN(longTerm.netYield) ? "0 %" : formatter.formatPercent(longTerm.netYield)}</span>
              </li>
              <li className="flex justify-between font-medium">
                <span>Cash-flow mensuel</span>
                <span className={longTerm.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}>
                  {isNaN(longTerm.monthlyCashFlow) ? "0 €" : formatter.formatCurrency(longTerm.monthlyCashFlow)}
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
                <span>{isNaN(airbnb.annualIncome) ? "0 €" : formatter.formatCurrency(airbnb.annualIncome)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Charges annuelles</span>
                <span>{isNaN(airbnb.annualExpenses) ? "0 €" : formatter.formatCurrency(airbnb.annualExpenses)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Rendement net</span>
                <span>{isNaN(airbnb.netYield) ? "0 %" : formatter.formatPercent(airbnb.netYield)}</span>
              </li>
              <li className="flex justify-between font-medium">
                <span>Cash-flow mensuel</span>
                <span className={airbnb.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}>
                  {isNaN(airbnb.monthlyCashFlow) ? "0 €" : formatter.formatCurrency(airbnb.monthlyCashFlow)}
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
