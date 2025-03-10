
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PropertyData, RentalType } from '@/types/property';

interface RentalSectionProps {
  propertyData: PropertyData;
  rentalType: RentalType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRentalTypeChange: (value: RentalType) => void;
}

const RentalSection: React.FC<RentalSectionProps> = ({ 
  propertyData, 
  rentalType,
  handleInputChange, 
  handleRentalTypeChange 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block text-white">Type de location</Label>
        <RadioGroup 
          value={rentalType} 
          onValueChange={handleRentalTypeChange}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="long-term" id="long-term" className="text-white border-gray-600" />
            <Label htmlFor="long-term" className="cursor-pointer text-white">Location longue durée</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="airbnb" id="airbnb" className="text-white border-gray-600" />
            <Label htmlFor="airbnb" className="cursor-pointer text-white">Location courte durée (Airbnb)</Label>
          </div>
        </RadioGroup>
      </div>
      
      {rentalType === 'long-term' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyRent" className="text-white">Loyer mensuel (€)</Label>
            <Input
              id="monthlyRent"
              name="monthlyRent"
              type="number"
              value={propertyData.monthlyRent}
              onChange={handleInputChange}
              min="0"
              step="10"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="managementFees" className="text-white">Frais de gestion (%)</Label>
            <Input
              id="managementFees"
              name="managementFees"
              type="number"
              value={propertyData.managementFees}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.5"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="airbnbNightlyRate" className="text-white">Tarif par nuit (€)</Label>
            <Input
              id="airbnbNightlyRate"
              name="airbnbNightlyRate"
              type="number"
              value={propertyData.airbnbNightlyRate}
              onChange={handleInputChange}
              min="0"
              step="5"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="airbnbOccupancyRate" className="text-white">Taux d'occupation (%)</Label>
            <Input
              id="airbnbOccupancyRate"
              name="airbnbOccupancyRate"
              type="number"
              value={propertyData.airbnbOccupancyRate}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="1"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="managementFees" className="text-white">Frais de gestion (%)</Label>
            <Input
              id="managementFees"
              name="managementFees"
              type="number"
              value={propertyData.managementFees}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.5"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalSection;
