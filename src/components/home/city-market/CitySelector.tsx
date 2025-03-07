
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw, Settings, Search, ArrowRight } from 'lucide-react';
import { MAJOR_CITIES } from '@/types/cityMarket';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (value: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  filteredCities: string[];
  showCustomInput: boolean;
  customCity: string;
  onCustomCityChange: (city: string) => void;
  onCustomCitySubmit: () => void;
  isUpdating: boolean;
  onUpdateCity: () => void;
  onToggleApiConfig: () => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onCityChange,
  searchQuery,
  onSearchQueryChange,
  filteredCities,
  showCustomInput,
  customCity,
  onCustomCityChange,
  onCustomCitySubmit,
  isUpdating,
  onUpdateCity,
  onToggleApiConfig
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 items-end flex-1">
      <div className="space-y-2">
        <Label htmlFor="city-select">Ville</Label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Select value={selectedCity} onValueChange={onCityChange}>
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
                      onChange={(e) => onSearchQueryChange(e.target.value)}
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
            onClick={onUpdateCity} 
            disabled={isUpdating} 
            title="Mettre à jour les données"
          >
            <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onToggleApiConfig} 
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
              onChange={(e) => onCustomCityChange(e.target.value)}
              placeholder="ex: Nantes"
            />
            <Button onClick={onCustomCitySubmit} disabled={isUpdating}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
