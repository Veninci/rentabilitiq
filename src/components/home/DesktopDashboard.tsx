
import React from 'react';
import { TrendingUp, Wallet, Landmark, PieChart } from 'lucide-react';

const DesktopDashboard: React.FC = () => {
  return (
    <div className="hidden md:flex bg-white rounded-xl shadow-sm p-4 md:p-6 flex-col transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="text-lg md:text-xl font-medium text-gray-700">Dashboard</div>
      </div>
      
      <div className="space-y-4 md:space-y-6 flex-grow">
        <div className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg transition-colors hover:bg-gray-100">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
            <div className="text-xs md:text-sm text-muted-foreground">Rendement brut</div>
          </div>
          <div className="font-medium text-primary text-sm md:text-base">5.8%</div>
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg transition-colors hover:bg-gray-100">
          <div className="flex items-center">
            <Wallet className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
            <div className="text-xs md:text-sm text-muted-foreground">Cash-flow mensuel</div>
          </div>
          <div className="font-medium text-green-500 text-sm md:text-base">387 €</div>
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg transition-colors hover:bg-gray-100">
          <div className="flex items-center">
            <Landmark className="h-4 w-4 md:h-5 md:w-5 text-blue-500 mr-2" />
            <div className="text-xs md:text-sm text-muted-foreground">Mensualité crédit</div>
          </div>
          <div className="font-medium text-blue-500 text-sm md:text-base">614 €</div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-6 h-24 md:h-32 bg-gray-50 rounded-lg flex items-center justify-center relative transition-all duration-300 hover:bg-gray-100">
        <PieChart className="h-12 w-12 md:h-16 md:w-16 text-primary/30 absolute animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full h-16 w-16 md:h-20 md:w-20 flex items-center justify-center shadow-sm transition-transform hover:scale-105">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">4.2%</div>
              <div className="text-xs md:text-sm text-gray-500">Rendement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboard;
