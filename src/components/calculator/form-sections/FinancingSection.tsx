
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PropertyData } from '@/types/property';

interface FinancingSectionProps {
  propertyData: PropertyData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FinancingSection: React.FC<FinancingSectionProps> = ({ 
  propertyData, 
  handleInputChange 
}) => {
  return (
    <div className="space-y-4 text-black dark:text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-black dark:text-white">Apport personnel (€)</Label>
          <Input
            id="downPayment"
            name="downPayment"
            type="number"
            value={propertyData.downPayment}
            onChange={handleInputChange}
            min="0"
            step="1000"
            className="text-black dark:text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-black dark:text-white">Montant du prêt (€)</Label>
          <Input
            id="loanAmount"
            name="loanAmount"
            type="number"
            value={propertyData.loanAmount}
            onChange={handleInputChange}
            min="0"
            step="1000"
            className="text-black dark:text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-black dark:text-white">Taux d'intérêt (%)</Label>
          <Input
            id="interestRate"
            name="interestRate"
            type="number"
            value={propertyData.interestRate}
            onChange={handleInputChange}
            min="0"
            step="0.05"
            max="15"
            className="text-black dark:text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-black dark:text-white">Durée du prêt (années)</Label>
          <Input
            id="loanTerm"
            name="loanTerm"
            type="number"
            value={propertyData.loanTerm}
            onChange={handleInputChange}
            min="5"
            max="30"
            step="1"
            className="text-black dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancingSection;
