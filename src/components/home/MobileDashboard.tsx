
import React from 'react';
import { TrendingUp, Wallet } from 'lucide-react';

const MobileDashboard: React.FC = () => {
  return (
    <div className="md:hidden bg-white rounded-xl shadow-sm p-4 flex-col mt-3 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="text-base font-medium text-gray-700">Résultats</div>
      </div>
      
      <div className="space-y-3 flex-grow">
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg transition-colors hover:bg-gray-100">
          <div className="flex items-center">
            <TrendingUp className="h-3 w-3 text-primary mr-1" />
            <div className="text-xs text-muted-foreground">Rendement brut</div>
          </div>
          <div className="font-medium text-primary text-sm">5.8%</div>
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg transition-colors hover:bg-gray-100">
          <div className="flex items-center">
            <Wallet className="h-3 w-3 text-green-500 mr-1" />
            <div className="text-xs text-muted-foreground">Cash-flow</div>
          </div>
          <div className="font-medium text-green-500 text-sm">387 €</div>
        </div>
      </div>
      
      <div className="mt-3 bg-white rounded-full h-16 w-16 mx-auto flex items-center justify-center shadow-sm border border-gray-100 transition-transform hover:scale-105">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">4.2%</div>
          <div className="text-[10px] text-gray-500">Rendement</div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
