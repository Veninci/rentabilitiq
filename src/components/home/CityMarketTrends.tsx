
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, RefreshCw, Settings, Search } from 'lucide-react';
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

// Liste des principales villes françaises
const MAJOR_CITIES = [
  "Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nice", 
  "Nantes", "Strasbourg", "Montpellier", "Rennes", "Grenoble", "Toulon",
  "Dijon", "Angers", "Le Mans", "Reims", "Saint-Étienne", "Aix-en-Provence",
  "Brest", "Le Havre", "Clermont-Ferrand", "Tours", "Limoges", "Amiens"
];

// Données par défaut pour les villes principales
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
  const [allCitiesData, setAllCitiesData] = useState<Record<string, CityData>>(cityData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>(MAJOR_CITIES);
  
  const city = allCitiesData[selectedCity] || allCitiesData["Paris"];

  // Load cached city data on component mount
  useEffect(() => {
    const cachedData = OpenAIService.getAllCachedCitiesData();
    if (Object.keys(cachedData).length > 0) {
      // Ensure we map the cached data to include the name property
      const formattedCachedData: Record<string, CityData> = {};
      
      Object.keys(cachedData).forEach(cityName => {
        formattedCachedData[cityName] = {
          name: cityName,
          ...cachedData[cityName]
        };
      });
      
      setAllCitiesData(prev => ({
        ...prev,
        ...formattedCachedData
      }));
    }
    
    // Check if we need to update specific cities mentioned by the user
    const citiesToCheck = ["Montpellier", "Reims", "Nantes"];
    const apiKey = OpenAIService.getApiKey();
    
    if (apiKey) {
      citiesToCheck.forEach(async (cityName) => {
        // Check if we don't have this city's data or if it's using default data
        if (!cachedData[cityName]) {
          console.log(`Fetching data for ${cityName}...`);
          updateCityData(cityName);
        }
      });
    }
  }, []);

  // Filter cities based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCities(MAJOR_CITIES);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = MAJOR_CITIES.filter(city => 
      city.toLowerCase().includes(query)
    );
    setFilteredCities(filtered);
  }, [searchQuery]);

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
      await updateCityData(customCity);
      setIsUpdating(false);
      setSelectedCity(customCity);
      setShowCustomInput(false);
      setSearchQuery("");  // Reset search query after submission
    }
  };

  const updateCityData = async (cityToUpdate: string) => {
    const newCityData = await OpenAIService.updateCityPrices(cityToUpdate);
    
    if (newCityData) {
      // Add the new city data to our cityData object, ensuring it has the name property
      setAllCitiesData(prevData => ({
        ...prevData,
        [cityToUpdate]: {
          name: cityToUpdate,
          ...newCityData
        }
      }));
      return true;
    }
    return false;
  };

  const handleUpdateCityData = async () => {
    const apiKey = OpenAIService.getApiKey();
    if (!apiKey) {
      toast.error("Veuillez configurer votre clé API OpenAI pour accéder à cette fonctionnalité");
      setShowApiKeyInput(true);
      return;
    }

    setIsUpdating(true);
    await updateCityData(selectedCity);
    setIsUpdating(false);
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      OpenAIService.saveApiKey(apiKey.trim());
      toast.success("Clé API OpenAI enregistrée avec succès");
      setShowApiKeyInput(false);
      
      // Now that we have an API key, let's update Montpellier, Reims and Nantes data
      const citiesToUpdate = ["Montpellier", "Reims", "Nantes"];
      toast.info("Mise à jour des données pour les villes principales...");
      
      setIsUpdating(true);
      
      // Use Promise.all to update all cities concurrently
      Promise.all(citiesToUpdate.map(city => updateCityData(city)))
        .then(() => {
          setIsUpdating(false);
          toast.success("Données des villes mises à jour avec succès");
        })
        .catch(error => {
          console.error("Error updating cities:", error);
          setIsUpdating(false);
          toast.error("Erreur lors de la mise à jour des données");
        });
    } else {
      toast.error("Veuillez entrer une clé API valide");
    }
  };

  // Function to update all major cities
  const handleUpdateAllCities = async () => {
    const apiKey = OpenAIService.getApiKey();
    if (!apiKey) {
      toast.error("Veuillez configurer votre clé API OpenAI pour accéder à cette fonctionnalité");
      setShowApiKeyInput(true);
      return;
    }

    setIsUpdating(true);
    toast.info("Mise à jour des données pour toutes les villes...");
    
    // Update cities in sequence to avoid rate limits
    for (const cityName of MAJOR_CITIES) {
      await updateCityData(cityName);
    }
    
    setIsUpdating(false);
    toast.success("Données de toutes les villes mises à jour avec succès");
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
            Consultez les tendances du marché immobilier dans toutes les villes françaises.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 gap-4 items-end flex-1">
              <div className="space-y-2">
                <Label htmlFor="city-select">Ville</Label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Select value={selectedCity} onValueChange={handleCityChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une ville" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="py-2 px-3">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground/70" />
                            <Input
                              placeholder="Rechercher une ville..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-8 mb-2"
                            />
                          </div>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto">
                          {filteredCities.length > 0 ? (
                            filteredCities.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))
                          ) : (
                            <div className="py-2 px-3 text-sm text-muted-foreground text-center">
                              Aucune ville trouvée
                            </div>
                          )}
                          <SelectItem value="custom">Autre ville...</SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                  </div>
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
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Cette clé est nécessaire pour mettre à jour les données immobilières en temps réel.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleUpdateAllCities} 
                    disabled={isUpdating || !OpenAIService.getApiKey()}
                    className="text-xs"
                  >
                    Mettre à jour toutes les villes
                  </Button>
                </div>
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
