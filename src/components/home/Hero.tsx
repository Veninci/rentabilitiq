
import React from 'react';
import { BarChart4, PieChart, Calculator, Home, Building, Wallet, TrendingUp, Landmark, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroProps {
  showFullView?: boolean;
}

const Hero: React.FC<HeroProps> = ({ showFullView = false }) => {
  // Only render the calculator example section
  return (
    <div className={`${showFullView ? "" : "aspect-video"} bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden`}>
      <div className="w-full h-full p-3 md:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="bg-primary/10 h-8 w-8 md:h-12 md:w-12 rounded-lg flex items-center justify-center">
              <Calculator className="h-4 w-4 md:h-6 md:w-6 text-primary" />
            </div>
            <div className="text-sm md:text-xl font-medium">Calculateur de rentabilité</div>
          </div>
          {!showFullView && (
            <div className="bg-amber-100 text-amber-700 text-xs md:text-base font-medium py-1 px-2 md:px-4 rounded-full">
              Exemple
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 flex-grow">
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
          
          <div className="hidden md:flex bg-white rounded-xl shadow-sm p-4 md:p-6 flex-col">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="text-lg md:text-xl font-medium mb-2">Dashboard</div>
            </div>
            
            <div className="space-y-4 md:space-y-6 flex-grow">
              <div className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
                  <div className="text-xs md:text-sm text-muted-foreground">Rendement brut</div>
                </div>
                <div className="font-medium text-primary text-sm md:text-base">5.8%</div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg">
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                  <div className="text-xs md:text-sm text-muted-foreground">Cash-flow mensuel</div>
                </div>
                <div className="font-medium text-green-500 text-sm md:text-base">387 €</div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg">
                <div className="flex items-center">
                  <Landmark className="h-4 w-4 md:h-5 md:w-5 text-blue-500 mr-2" />
                  <div className="text-xs md:text-sm text-muted-foreground">Mensualité crédit</div>
                </div>
                <div className="font-medium text-blue-500 text-sm md:text-base">614 €</div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-6 h-24 md:h-32 bg-gray-50 rounded-lg flex items-center justify-center relative">
              <PieChart className="h-12 w-12 md:h-16 md:w-16 text-primary/30 absolute" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full h-16 w-16 md:h-20 md:w-20 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">4.2%</div>
                    <div className="text-xs md:text-sm text-gray-500">Rendement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile dashboard (visible only on small screens) */}
          <div className="md:hidden bg-white rounded-xl shadow-sm p-4 flex-col mt-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-base font-medium">Résultats</div>
            </div>
            
            <div className="space-y-3 flex-grow">
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 text-primary mr-1" />
                  <div className="text-xs text-muted-foreground">Rendement brut</div>
                </div>
                <div className="font-medium text-primary text-sm">5.8%</div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <Wallet className="h-3 w-3 text-green-500 mr-1" />
                  <div className="text-xs text-muted-foreground">Cash-flow</div>
                </div>
                <div className="font-medium text-green-500 text-sm">387 €</div>
              </div>
            </div>
            
            <div className="mt-3 bg-white rounded-full h-16 w-16 mx-auto flex items-center justify-center shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">4.2%</div>
                <div className="text-[10px] text-gray-500">Rendement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
