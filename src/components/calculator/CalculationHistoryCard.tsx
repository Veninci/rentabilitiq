
import React from 'react';
import { CalculationHistory } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatter } from '@/lib/formatter';
import { CalendarDays, Home, Building, CircleDollarSign, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clearCalculationHistory } from '@/lib/usageTracker';

interface CalculationHistoryCardProps {
  history: CalculationHistory[];
  onSelectHistory: (item: CalculationHistory) => void;
  onClearHistory: () => void;
}

const CalculationHistoryCard: React.FC<CalculationHistoryCardProps> = ({ 
  history, 
  onSelectHistory,
  onClearHistory
}) => {
  const navigate = useNavigate();

  if (history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Historique des calculs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Vous n'avez pas encore effectué de calculs.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/calculator')}
            >
              Faire votre premier calcul
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Historique des calculs</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClearHistory}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Effacer
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onSelectHistory(item)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {formatDate(item.date)}
                </div>
                <div className="text-sm font-medium flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  {item.city}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-2 text-primary" />
                  {formatter.formatCurrency(item.propertyData.purchasePrice)}
                </div>
                <div className="flex justify-end items-center text-sm">
                  <span className={`font-medium ${item.results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {formatter.formatCurrency(item.results.monthlyCashFlow)}/mois
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {item.propertyData.propertySize}m² • {item.propertyData.rentalType === 'long-term' ? 'Long terme' : 'Airbnb'}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <CircleDollarSign className="h-4 w-4 mr-1 text-green-600" />
                  {formatter.formatPercent(item.results.netYield)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculationHistoryCard;
