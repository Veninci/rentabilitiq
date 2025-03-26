import React, { useRef } from 'react';
import { PropertyResults } from '@/types/property';
import GlassCard from '../ui/GlassCard';
import { ArrowDownUp, CalendarDays, CircleDollarSign, LineChart, TrendingUp, SquareIcon, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatter } from '@/lib/formatter';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { exportResultsToPDF } from '@/lib/pdfExport';
import { useToast } from '@/hooks/use-toast';

interface ResultsCardProps {
  results: PropertyResults;
  cityName?: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ results, cityName }) => {
  const {
    totalInvestment,
    annualIncome,
    annualExpenses,
    annualCashFlow,
    monthlyCashFlow,
    grossYield,
    netYield,
    paybackPeriod,
    monthlyMortgage,
    pricePerSqm,
    rentPerSqm
  } = results;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const investmentBreakdownData = [
    { name: 'Prix d\'achat', value: results.purchasePrice, color: '#F59E0B' },
    { name: 'Frais de notaire', value: results.notaryFees, color: '#6366F1' },
    { name: 'Travaux', value: results.renovationCost, color: '#EC4899' },
    { name: 'Autres frais', value: results.otherCosts, color: '#14B8A6' },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary">
            {data.name.includes('Rendement') 
              ? formatter.formatPercent(data.value)
              : formatter.formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const handleExportPDF = async () => {
    if (!cardRef.current) return;
    
    toast({
      title: "Génération du PDF en cours",
      description: "Veuillez patienter pendant la création de votre document...",
    });
    
    try {
      const success = await exportResultsToPDF(results, cardRef.current, cityName);
      
      if (success) {
        toast({
          title: "PDF généré avec succès",
          description: "Votre analyse de rentabilité a été téléchargée au format PDF.",
          variant: "default",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Un problème est survenu lors de la génération du PDF.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la génération du PDF.",
        variant: "destructive",
      });
    }
  };

  return (
    <div ref={cardRef}>
      <GlassCard variant="results" className="w-full animate-scale-in">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Résultats de l'analyse</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportPDF}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span>Télécharger en PDF</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-primary/5 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="font-medium">Rendements</div>
            </div>
            
            <div className="space-y-3">
              <ResultItem 
                label="Rendement brut" 
                value={`${formatter.formatPercent(grossYield)}`} 
                color="text-primary"
              />
              <ResultItem 
                label="Rendement net" 
                value={`${formatter.formatPercent(netYield)}`} 
                color="text-primary"
              />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
                <CircleDollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="font-medium">Cash-flow</div>
            </div>
            
            <div className="space-y-3">
              <ResultItem 
                label="Cash-flow mensuel" 
                value={formatter.formatCurrency(monthlyCashFlow)} 
                color={monthlyCashFlow >= 0 ? "text-green-600" : "text-red-500"}
              />
              <ResultItem 
                label="Cash-flow annuel" 
                value={formatter.formatCurrency(annualCashFlow)}
                color={annualCashFlow >= 0 ? "text-green-600" : "text-red-500"} 
              />
              {monthlyMortgage > 0 && (
                <ResultItem 
                  label="Mensualité crédit" 
                  value={formatter.formatCurrency(monthlyMortgage)} 
                  color="text-foreground"
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
              <SquareIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="font-medium">Indicateurs au m²</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultItem 
              label="Prix au m²" 
              value={`${formatter.formatCurrency(pricePerSqm)}/m²`}
              color="text-foreground" 
            />
            <ResultItem 
              label="Loyer au m²" 
              value={`${formatter.formatCurrency(rentPerSqm)}/m²`} 
              color="text-foreground"
            />
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
              <ArrowDownUp className="h-4 w-4 text-primary" />
            </div>
            <div className="font-medium">Flux financiers</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <ResultItem 
              label="Investissement total" 
              value={formatter.formatCurrency(totalInvestment)}
              color="text-foreground" 
            />
            <ResultItem 
              label="Revenus annuels" 
              value={formatter.formatCurrency(annualIncome)} 
              color="text-green-600"
            />
            <ResultItem 
              label="Charges annuelles" 
              value={formatter.formatCurrency(annualExpenses)} 
              color="text-red-500"
            />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investmentBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {investmentBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {investmentBreakdownData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-primary/10 h-8 w-8 rounded-lg flex items-center justify-center">
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div className="font-medium">Retour sur investissement</div>
          </div>
          
          <ResultItem 
            label="Durée de remboursement" 
            value={paybackPeriod === Infinity ? "Jamais" : `${paybackPeriod.toFixed(1)} ans`} 
            color="text-foreground"
          />
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Ce document est généré par RentaFlex. Les résultats sont des estimations et ne constituent pas un conseil financier.</p>
        </div>
      </GlassCard>
    </div>
  );
};

interface ResultItemProps {
  label: string;
  value: string;
  color?: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ label, value, color = "text-foreground" }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
};

export default ResultsCard;
