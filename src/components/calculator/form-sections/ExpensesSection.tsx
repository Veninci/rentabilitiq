
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PropertyData } from '@/types/property';

interface ExpensesSectionProps {
  propertyData: PropertyData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({ 
  propertyData, 
  handleInputChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="propertyTax" className="text-white">Taxe foncière (€/an)</Label>
          <Input
            id="propertyTax"
            name="propertyTax"
            type="number"
            value={propertyData.propertyTax}
            onChange={handleInputChange}
            min="0"
            step="10"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="insurance" className="text-white">Assurance PNO (€/an)</Label>
          <Input
            id="insurance"
            name="insurance"
            type="number"
            value={propertyData.insurance}
            onChange={handleInputChange}
            min="0"
            step="10"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="condoFees" className="text-white">Charges de copropriété (€/an)</Label>
          <Input
            id="condoFees"
            name="condoFees"
            type="number"
            value={propertyData.condoFees}
            onChange={handleInputChange}
            min="0"
            step="10"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maintenanceCost" className="text-white">Entretien et réparations (€/an)</Label>
          <Input
            id="maintenanceCost"
            name="maintenanceCost"
            type="number"
            value={propertyData.maintenanceCost}
            onChange={handleInputChange}
            min="0"
            step="10"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="otherExpenses" className="text-white">Autres dépenses (€/an)</Label>
          <Input
            id="otherExpenses"
            name="otherExpenses"
            type="number"
            value={propertyData.otherExpenses}
            onChange={handleInputChange}
            min="0"
            step="10"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesSection;
