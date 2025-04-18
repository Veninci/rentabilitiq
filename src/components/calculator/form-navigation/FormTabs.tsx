
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Home, Landmark, PercentCircle } from 'lucide-react';

interface FormTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const FormTabs: React.FC<FormTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-4 mb-8 bg-gray-800">
      <TabsTrigger 
        value="purchase" 
        className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white text-black dark:text-white"
      >
        <Building className="h-4 w-4" />
        <span>Achat</span>
      </TabsTrigger>
      <TabsTrigger 
        value="financing" 
        className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white text-black dark:text-white"
      >
        <Landmark className="h-4 w-4" />
        <span>Financement</span>
      </TabsTrigger>
      <TabsTrigger 
        value="rental" 
        className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white text-black dark:text-white"
      >
        <Home className="h-4 w-4" />
        <span>Location</span>
      </TabsTrigger>
      <TabsTrigger 
        value="expenses" 
        className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white text-black dark:text-white"
      >
        <PercentCircle className="h-4 w-4" />
        <span>Charges</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default FormTabs;
