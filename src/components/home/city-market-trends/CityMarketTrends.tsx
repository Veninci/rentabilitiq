
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CitySelector from "./CitySelector";
import MarketSummary from "./MarketSummary";
import TrendsChart from "./TrendsChart";
import DataTable from "./DataTable";
import { cityData } from "./city-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";
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

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Évolution du marché</h2>
          <p className="text-muted-foreground">Suivez les tendances du marché immobilier français</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Object.entries(cityData).slice(0, 3).map(([cityKey, cityData]) => (
            <Card key={cityKey} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex justify-between items-center">
                  {cityData.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-[120px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cityData.yearlyTrends}>
                      <Line 
                        type="monotone" 
                        dataKey="pricePerSqm" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Prix au m²</p>
                    <p className="text-lg font-bold">{formatter.formatCurrency(cityData.pricePerSqm)}</p>
                  </div>
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Rendement</p>
                    <p className="text-lg font-bold">{cityData.averageYield}%</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCity(cityKey);
                    setDialogOpen(true);
                  }}
                >
                  Détails
                </Button>
              </CardContent>
            </Card>
          ))}
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
    </section>
  );
};

export default CityMarketTrends;
