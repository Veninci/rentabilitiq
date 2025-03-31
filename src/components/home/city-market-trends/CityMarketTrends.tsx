
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatter } from '@/lib/formatter';
import CitySelector from "./CitySelector";
import MarketSummary from "./MarketSummary";
import TrendsChart from "./TrendsChart";
import DataTable from "./DataTable";
import { cityData } from "./city-data";

const CityMarketTrends: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Paris");
  const [customCity, setCustomCity] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("yearly");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const city = cityData[selectedCity] || cityData["Paris"];

  const handleCityChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setSelectedCity(value);
    }
  };

  const handleCustomCitySubmit = () => {
    if (customCity.trim()) {
      // In a real application, we would fetch data for this city
      // For now, we'll just show a message that the city isn't in our database
      alert(`Désolé, nous n'avons pas encore de données pour ${customCity}. Nous travaillons à élargir notre base de données.`);
    }
  };
  
  return (
    <>
      <Card className="w-full max-w-4xl mx-auto overflow-hidden" onClick={() => {}}>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Évolution du marché</h3>
              <p className="text-muted-foreground">Mise à jour en temps réel</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-muted/20 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex-1">
                <p className="text-muted-foreground">Prix moyen au m²</p>
                <p className="text-3xl font-semibold mt-1">{formatter.formatCurrency(city.pricePerSqm)}</p>
                <div className={`flex items-center mt-1 ${city.pricePerSqmTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {city.pricePerSqmTrend >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{city.pricePerSqmTrend >= 0 ? '+' : ''}{city.pricePerSqmTrend}% ce mois</span>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-muted-foreground">Rendement moyen</p>
                <p className="text-3xl font-semibold mt-1">{city.averageYield}%</p>
                <div className={`flex items-center mt-1 ${city.averageYieldTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {city.averageYieldTrend >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{city.averageYieldTrend >= 0 ? '+' : ''}{city.averageYieldTrend}% ce mois</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDialogOpen(true)}
              >
                Détails
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4">Évolution du marché immobilier</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <CitySelector 
              selectedCity={selectedCity}
              customCity={customCity}
              showCustomInput={showCustomInput}
              onCityChange={handleCityChange}
              onCustomCityChange={setCustomCity}
              onCustomCitySubmit={handleCustomCitySubmit}
            />
            
            <MarketSummary city={city} />
            
            <TrendsChart 
              city={city} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
            
            <DataTable 
              city={city} 
              activeTab={activeTab} 
            />
            
            <div className="text-xs text-muted-foreground">
              <p>Données mises à jour au 1er juin 2023. Les prix et rendements affichés sont des moyennes et peuvent varier selon les quartiers et les caractéristiques des biens.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CityMarketTrends;
