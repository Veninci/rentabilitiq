
import { useState, useEffect } from 'react';
import { OpenAIService } from '@/services/openai';
import { toast } from 'sonner';
import { CityData, MAJOR_CITIES, DEFAULT_CITY_DATA } from '@/types/cityMarket';

export const useCityMarket = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Paris");
  const [customCity, setCustomCity] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(OpenAIService.getApiKey() || "");
  const [allCitiesData, setAllCitiesData] = useState<Record<string, CityData>>(DEFAULT_CITY_DATA);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>(MAJOR_CITIES);
  
  const city = allCitiesData[selectedCity] || allCitiesData["Paris"];

  // Load cached city data on hook mount
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

  return {
    selectedCity,
    customCity,
    setCustomCity,
    showCustomInput,
    isUpdating,
    showApiKeyInput,
    setShowApiKeyInput,
    apiKey,
    setApiKey,
    city,
    searchQuery,
    setSearchQuery,
    filteredCities,
    handleCityChange,
    handleCustomCitySubmit,
    handleUpdateCityData,
    handleSaveApiKey,
    handleUpdateAllCities,
    hasApiKey: !!OpenAIService.getApiKey()
  };
};
