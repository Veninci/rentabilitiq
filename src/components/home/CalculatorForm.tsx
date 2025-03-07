
import React from 'react';
import { Settings } from 'lucide-react';

const CalculatorForm: React.FC = () => {
  return (
    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm p-3 md:p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3 md:mb-5">
        <div className="text-xs md:text-base font-medium flex items-center">
          <Settings className="h-3 w-3 md:h-5 md:w-5 mr-1 md:mr-2 text-primary" /> 
          Paramètres du bien
        </div>
        <div className="flex space-x-1 md:space-x-2">
          <div className="px-1.5 md:px-3 py-0.5 md:py-1.5 bg-primary/10 rounded text-[10px] md:text-sm text-primary font-medium">Appartement</div>
          <div className="px-1.5 md:px-3 py-0.5 md:py-1.5 bg-gray-100 rounded text-[10px] md:text-sm text-gray-500 font-medium">Lyon</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4">
        <div className="space-y-1.5 md:space-y-2">
          <div className="text-xs md:text-sm text-gray-500">Prix d'achat</div>
          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base font-medium">210 000 €</div>
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <div className="text-xs md:text-sm text-gray-500">Surface</div>
          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base font-medium">45 m²</div>
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <div className="text-xs md:text-sm text-gray-500">Loyer mensuel</div>
          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base font-medium">850 €</div>
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <div className="text-xs md:text-sm text-gray-500">Type de location</div>
          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base font-medium">Longue durée</div>
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <div className="text-xs md:text-sm text-gray-500">Apport</div>
          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base font-medium">40 000 €</div>
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <div className="text-xs md:text-sm text-gray-500">Taux d'intérêt</div>
          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base font-medium">3.5%</div>
        </div>
      </div>
      <div className="mt-auto flex justify-end">
        <div className="h-8 md:h-10 w-24 md:w-40 bg-primary rounded-md flex items-center justify-center text-white text-xs md:text-base font-medium">
          Calculer
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
