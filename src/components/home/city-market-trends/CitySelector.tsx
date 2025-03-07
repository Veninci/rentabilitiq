
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: string;
  customCity: string;
  showCustomInput: boolean;
  onCityChange: (city: string) => void;
  onCustomCityChange: (city: string) => void;
  onCustomCitySubmit: () => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  customCity,
  showCustomInput,
  onCityChange,
  onCustomCityChange,
  onCustomCitySubmit
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
      <div className="space-y-2">
        <Label htmlFor="city-select">Ville</Label>
        <Select value={selectedCity} onValueChange={onCityChange}>
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
              onChange={(e) => onCustomCityChange(e.target.value)}
              placeholder="ex: Nantes"
            />
            <Button onClick={onCustomCitySubmit}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
