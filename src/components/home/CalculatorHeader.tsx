
import React from 'react';
import { Calculator } from 'lucide-react';

interface CalculatorHeaderProps {
  showFullView: boolean;
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({ showFullView }) => {
  return (
    <div className="flex items-center justify-between mb-4 md:mb-8">
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="bg-primary/10 h-8 w-8 md:h-12 md:w-12 rounded-lg flex items-center justify-center animate-scale-in">
          <Calculator className="h-4 w-4 md:h-6 md:w-6 text-primary" />
        </div>
        <div className="text-sm md:text-xl font-medium bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Calculateur de rentabilité
        </div>
      </div>
      {!showFullView && (
        <div className="bg-amber-100/80 backdrop-blur-sm text-amber-700 text-xs md:text-base font-medium py-1 px-2 md:px-4 rounded-full animate-fade-in">
          Exemple
        </div>
      )}
    </div>
  );
};

export default CalculatorHeader;
