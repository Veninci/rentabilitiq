import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { PropertyData } from '@/types/property';

const FRENCH_CITIES = [
  "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", 
  "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Saint-Étienne", 
  "Toulon", "Le Havre", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne"
];

interface PurchaseSectionProps {
  propertyData: PropertyData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCityChange: (value: string) => void;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({ 
  propertyData, 
  handleInputChange, 
  handleCityChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 sm:col-span-2">
          <Label>Ville</Label>
          <Select
            value={propertyData.city}
            onValueChange={handleCityChange}
          >
            <SelectTrigger id="city" className="w-full">
              <SelectValue placeholder="Sélectionnez une ville" />
            </SelectTrigger>
            <SelectContent>
              {FRENCH_CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{city}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Prix d'achat (€)</Label>
          <Input
            id="purchasePrice"
            name="purchasePrice"
            type="number"
            value={propertyData.purchasePrice}
            onChange={handleInputChange}
            min="0"
            step="1000"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Surface (m²)</Label>
          <Input
            id="propertySize"
            name="propertySize"
            type="number"
            value={propertyData.propertySize}
            onChange={handleInputChange}
            min="1"
            step="1"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Coût des travaux (€)</Label>
          <Input
            id="renovationCost"
            name="renovationCost"
            type="number"
            value={propertyData.renovationCost}
            onChange={handleInputChange}
            min="0"
            step="100"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Frais de notaire (€)</Label>
          <Input
            id="notaryFees"
            name="notaryFees"
            type="number"
            value={propertyData.notaryFees}
            onChange={handleInputChange}
            min="0"
            step="100"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Autres frais d'acquisition (€)</Label>
          <Input
            id="otherCosts"
            name="otherCosts"
            type="number"
            value={propertyData.otherCosts}
            onChange={handleInputChange}
            min="0"
            step="100"
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
