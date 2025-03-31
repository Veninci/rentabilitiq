
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp } from 'lucide-react';
import CitySelector from "./CitySelector";
import MarketSummary from "./MarketSummary";
import TrendsChart from "./TrendsChart";
import DataTable from "./DataTable";
import { cityData } from "./city-data";
import { formatter } from '@/lib/formatter';

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

  const openMarketTrendsDialog = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden mx-auto max-w-3xl cursor-pointer" onClick={openMarketTrendsDialog}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Évolution du marché</h3>
              <p className="text-sm text-gray-500">Mise à jour en temps réel</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-6">
            <div className="h-32 flex items-center justify-center">
              {/* Simplified chart representation */}
              <div className="flex items-end space-x-2 h-full">
                <div className="h-1/3 w-10 bg-gray-200 rounded-t"></div>
                <div className="h-2/5 w-10 bg-gray-200 rounded-t"></div>
                <div className="h-3/5 w-10 bg-gray-200 rounded-t"></div>
                <div className="h-2/5 w-10 bg-gray-200 rounded-t"></div>
                <div className="h-4/5 w-10 bg-blue-200 rounded-t"></div>
                <div className="h-full w-10 bg-blue-200 rounded-t"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Prix moyen au m²</p>
              <p className="text-3xl font-bold">{formatter.formatCurrency(city.pricePerSqm)}</p>
              <div className={`flex items-center text-sm mt-1 ${city.pricePerSqmTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span>{city.pricePerSqmTrend >= 0 ? '+' : ''}{city.pricePerSqmTrend}% ce mois</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Rendement moyen</p>
              <p className="text-3xl font-bold">{city.averageYield}%</p>
              <div className={`flex items-center text-sm mt-1 ${city.averageYieldTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span>{city.averageYieldTrend >= 0 ? '+' : ''}{city.averageYieldTrend}% ce mois</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
