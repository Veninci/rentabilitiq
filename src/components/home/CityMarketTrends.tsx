
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, RefreshCw, Settings } from 'lucide-react';
import { formatter } from '@/lib/formatter';
import { OpenAIService } from '@/services/openai';
import { toast } from 'sonner';

interface CityData {
  name: string;
  pricePerSqm: number;
  pricePerSqmTrend: number;
  averageYield: number;
  averageYieldTrend: number;
  monthlyTrends: Array<{
    month: string;
    pricePerSqm: number;
    pricePerSqmTrend: number;
    averageYield: number;
    averageYieldTrend: number;
  }>;
}

const cityData: Record<string, CityData> = {
  "Paris": {
    name: "Paris",
    pricePerSqm: 11250,
    pricePerSqmTrend: 2.1,
    averageYield: 3.8,
    averageYieldTrend: -0.3,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 11050, pricePerSqmTrend: 0.8, averageYield: 3.9, averageYieldTrend: -0.1 },
      { month: "Février", pricePerSqm: 11100, pricePerSqmTrend: 0.5, averageYield: 3.9, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 11150, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: -0.1 },
      { month: "Avril", pricePerSqm: 11200, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: 0 },
      { month: "Mai", pricePerSqm: 11250, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 11250, pricePerSqmTrend: 0, averageYield: 3.8, averageYieldTrend: 0 }
    ]
  },
  "Lyon": {
    name: "Lyon",
    pricePerSqm: 5380,
    pricePerSqmTrend: 1.8,
    averageYield: 5.1,
    averageYieldTrend: 0.2,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 5250, pricePerSqmTrend: 0.6, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 5280, pricePerSqmTrend: 0.6, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 5320, pricePerSqmTrend: 0.8, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 5350, pricePerSqmTrend: 0.6, averageYield: 5.1, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 5370, pricePerSqmTrend: 0.4, averageYield: 5.1, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 5380, pricePerSqmTrend: 0.2, averageYield: 5.1, averageYieldTrend: 0 }
    ]
  },
  "Bordeaux": {
    name: "Bordeaux",
    pricePerSqm: 4950,
    pricePerSqmTrend: -0.3,
    averageYield: 4.8,
    averageYieldTrend: 0.5,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 4980, pricePerSqmTrend: -0.2, averageYield: 4.6, averageYieldTrend: 0.1 },
      { month: "Février", pricePerSqm: 4970, pricePerSqmTrend: -0.2, averageYield: 4.7, averageYieldTrend: 0.2 },
      { month: "Mars", pricePerSqm: 4960, pricePerSqmTrend: -0.2, averageYield: 4.7, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 4955, pricePerSqmTrend: -0.1, averageYield: 4.8, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 4950, pricePerSqmTrend: -0.1, averageYield: 4.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 4950, pricePerSqmTrend: 0, averageYield: 4.8, averageYieldTrend: 0 }
    ]
  },
  "Marseille": {
    name: "Marseille",
    pricePerSqm: 3180,
    pricePerSqmTrend: 3.2,
    averageYield: 6.5,
    averageYieldTrend: 0.1,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 3080, pricePerSqmTrend: 0.8, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 3100, pricePerSqmTrend: 0.6, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 3130, pricePerSqmTrend: 1.0, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 3160, pricePerSqmTrend: 1.0, averageYield: 6.5, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 3170, pricePerSqmTrend: 0.3, averageYield: 6.5, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 3180, pricePerSqmTrend: 0.3, averageYield: 6.5, averageYieldTrend: 0 }
    ]
  },
  "Strasbourg": {
    name: "Strasbourg",
    pricePerSqm: 3450,
    pricePerSqmTrend: 1.5,
    averageYield: 5.8,
    averageYieldTrend: 0.2,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 3390, pricePerSqmTrend: 0.3, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 3400, pricePerSqmTrend: 0.3, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 3420, pricePerSqmTrend: 0.6, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 3435, pricePerSqmTrend: 0.4, averageYield: 5.8, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 3445, pricePerSqmTrend: 0.3, averageYield: 5.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 3450, pricePerSqmTrend: 0.1, averageYield: 5.8, averageYieldTrend: 0 }
    ]
  }
};

const CityMarketTrends: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Paris");
  const [customCity, setCustomCity] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(OpenAIService.getApiKey() || "");
  
  const city = cityData[selectedCity] || cityData["Paris"];

  const handleCityChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setSelectedCity(value);
    }
  };

  const handleCustomCitySubmit = async () => {
    if (customCity.trim()) {
      const apiKey = OpenAIService.getApiKey();
      if (!apiKey) {
        toast.error("Veuillez configurer votre clé API OpenAI pour accéder à cette fonctionnalité");
        setShowApiKeyInput(true);
        return;
      }

      setIsUpdating(true);
      const cityData = await OpenAIService.updateCityPrices(customCity);
      setIsUpdating(false);

      if (cityData) {
        // Add the new city data to our cityData object
        cityData[customCity] = {
          name: customCity,
          ...cityData
        };
        setSelectedCity(customCity);
        setShowCustomInput(false);
      }
    }
  };

  const handleUpdateCityData = async () => {
    const apiKey = OpenAIService.getApiKey();
    if (!apiKey) {
      toast.error("Veuillez configurer votre clé API OpenAI pour accéder à cette fonctionnalité");
      setShowApiKeyInput(true);
      return;
    }

    setIsUpdating(true);
    const updatedData = await OpenAIService.updateCityPrices(selectedCity);
    setIsUpdating(false);

    if (updatedData) {
      // Update the city data with the new values
      cityData[selectedCity] = {
        ...cityData[selectedCity],
        ...updatedData
      };
      // Force a re-render
      setSelectedCity(prev => prev);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      OpenAIService.saveApiKey(apiKey.trim());
      toast.success("Clé API OpenAI enregistrée avec succès");
      setShowApiKeyInput(false);
    } else {
      toast.error("Veuillez entrer une clé API valide");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">Détails</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">Évolution du marché immobilier</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Consultez les tendances du marché immobilier dans différentes villes françaises.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="grid grid-cols-2 gap-4 items-end flex-1">
              <div className="space-y-2">
                <Label htmlFor="city-select">Ville</Label>
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paris">Paris</SelectItem>
                    <SelectItem value="Lyon">Lyon</SelectItem>
                    <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                    <SelectItem value="Marseille">Marseille</SelectItem>
                    <SelectItem value="Strasbourg">Strasbourg</SelectItem>
                    <SelectItem value="custom">Autre ville...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {showCustomInput && (
                <div className="space-y-2">
                  <Label htmlFor="custom-city">Nom de la ville</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="custom-city" 
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="ex: Nantes"
                    />
                    <Button onClick={handleCustomCitySubmit} disabled={isUpdating}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-end space-x-2 ml-2">
              <Button 
                size="icon" 
                variant="outline" 
                onClick={handleUpdateCityData} 
                disabled={isUpdating} 
                title="Mettre à jour les données"
              >
                <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                onClick={() => setShowApiKeyInput(!showApiKeyInput)} 
                title="Configurer l'API"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showApiKeyInput && (
            <div className="p-4 border rounded-lg bg-muted/20">
              <div className="space-y-2">
                <Label htmlFor="api-key">Clé API OpenAI</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="api-key" 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                  />
                  <Button onClick={handleSaveApiKey}>
                    Enregistrer
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cette clé est nécessaire pour mettre à jour les données immobilières en temps réel.
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Prix moyen au m²</div>
              <div className="text-xl font-semibold">{formatter.formatCurrency(city.pricePerSqm)}</div>
              <div className={`text-sm flex items-center mt-1 ${city.pricePerSqmTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {city.pricePerSqmTrend >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {city.pricePerSqmTrend >= 0 ? '+' : ''}{city.pricePerSqmTrend}% ce mois
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Rendement moyen</div>
              <div className="text-xl font-semibold">{city.averageYield}%</div>
              <div className={`text-sm flex items-center mt-1 ${city.averageYieldTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {city.averageYieldTrend >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {city.averageYieldTrend >= 0 ? '+' : ''}{city.averageYieldTrend}% ce mois
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-medium">Évolution mensuelle - {city.name}</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Mois</th>
                    <th className="text-right py-2 px-2">Prix au m²</th>
                    <th className="text-right py-2 px-2">Évolution</th>
                    <th className="text-right py-2 px-2">Rendement</th>
                    <th className="text-right py-2 px-2">Évolution</th>
                  </tr>
                </thead>
                <tbody>
                  {city.monthlyTrends.map((month, index) => (
                    <tr key={index} className="border-b last:border-0">
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
          
          <div className="text-xs text-muted-foreground">
            <p>Données mises à jour au {new Date().toLocaleDateString('fr-FR')}. Les prix et rendements affichés sont des moyennes et peuvent varier selon les quartiers et les caractéristiques des biens.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CityMarketTrends;
