
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCityMarket } from '@/hooks/useCityMarket';
import CitySelector from './city-market/CitySelector';
import ApiKeyConfig from './city-market/ApiKeyConfig';
import CityStats from './city-market/CityStats';
import MonthlyTrends from './city-market/MonthlyTrends';

const CityMarketTrends: React.FC = () => {
  const {
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
    hasApiKey
  } = useCityMarket();

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
            <CitySelector
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              filteredCities={filteredCities}
              showCustomInput={showCustomInput}
              customCity={customCity}
              onCustomCityChange={setCustomCity}
              onCustomCitySubmit={handleCustomCitySubmit}
              isUpdating={isUpdating}
              onUpdateCity={handleUpdateCityData}
              onToggleApiConfig={() => setShowApiKeyInput(!showApiKeyInput)}
            />
          </div>

          {showApiKeyInput && (
            <ApiKeyConfig
              apiKey={apiKey}
              onApiKeyChange={setApiKey}
              onSaveApiKey={handleSaveApiKey}
              onUpdateAllCities={handleUpdateAllCities}
              isUpdating={isUpdating}
              hasApiKey={hasApiKey}
            />
          )}
          
          <CityStats city={city} />
          
          <MonthlyTrends city={city} />
          
          <div className="text-xs text-muted-foreground">
            <p>Données mises à jour au {new Date().toLocaleDateString('fr-FR')}. Les prix et rendements affichés sont des moyennes et peuvent varier selon les quartiers et les caractéristiques des biens.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CityMarketTrends;
