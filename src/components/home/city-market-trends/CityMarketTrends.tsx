
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
