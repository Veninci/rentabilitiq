import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PropertyData, RentalType } from '@/types/property';
import FormTabs from './form-navigation/FormTabs';
import FormNavigation from './form-navigation/FormNavigation';
import PurchaseSection from './form-sections/PurchaseSection';
import FinancingSection from './form-sections/FinancingSection';
import RentalSection from './form-sections/RentalSection';
import ExpensesSection from './form-sections/ExpensesSection';

interface PropertyFormProps {
  onCalculate: (data: PropertyData) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onCalculate }) => {
  const [activeTab, setActiveTab] = useState('purchase');
  const [rentalType, setRentalType] = useState<RentalType>('long-term');
  
  const [propertyData, setPropertyData] = useState<PropertyData>({
    purchasePrice: 200000,
    renovationCost: 10000,
    notaryFees: 15000,
    otherCosts: 5000,
    propertySize: 50,
    downPayment: 40000,
    loanAmount: 160000,
    interestRate: 3.5,
    loanTerm: 20,
    monthlyRent: 800,
    airbnbNightlyRate: 80,
    airbnbOccupancyRate: 70,
    managementFees: 5,
    propertyTax: 1200,
    insurance: 400,
    condoFees: 1200,
    maintenanceCost: 1000,
    otherExpenses: 500,
    city: 'Paris',
    rentalType: 'long-term'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = name === 'rentalType' ? value : parseFloat(value);
    
    setPropertyData({
      ...propertyData,
      [name]: numValue,
    });
  };
  
  const handleRentalTypeChange = (value: RentalType) => {
    setRentalType(value);
    setPropertyData({
      ...propertyData,
      rentalType: value,
    });
  };

  const handleCityChange = (value: string) => {
    setPropertyData({
      ...propertyData,
      city: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(propertyData);
  };
  
  const handleNext = () => {
    switch (activeTab) {
      case 'purchase':
        setActiveTab('financing');
        break;
      case 'financing':
        setActiveTab('rental');
        break;
      case 'rental':
        setActiveTab('expenses');
        break;
      default:
        break;
    }
  };
  
  const handlePrevious = () => {
    switch (activeTab) {
      case 'financing':
        setActiveTab('purchase');
        break;
      case 'rental':
        setActiveTab('financing');
        break;
      case 'expenses':
        setActiveTab('rental');
        break;
      default:
        break;
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-white">
      <Tabs defaultValue="purchase" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <FormTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <TabsContent value="purchase" className="space-y-4">
          <PurchaseSection 
            propertyData={propertyData} 
            handleInputChange={handleInputChange} 
            handleCityChange={handleCityChange} 
          />
          <FormNavigation 
            activeTab={activeTab} 
            isLastStep={false} 
            onPrevious={handlePrevious} 
            onNext={handleNext} 
          />
        </TabsContent>
        
        <TabsContent value="financing" className="space-y-4">
          <FinancingSection 
            propertyData={propertyData} 
            handleInputChange={handleInputChange} 
          />
          <FormNavigation 
            activeTab={activeTab} 
            isLastStep={false} 
            onPrevious={handlePrevious} 
            onNext={handleNext} 
          />
        </TabsContent>
        
        <TabsContent value="rental" className="space-y-4">
          <RentalSection 
            propertyData={propertyData} 
            rentalType={rentalType}
            handleInputChange={handleInputChange} 
            handleRentalTypeChange={handleRentalTypeChange} 
          />
          <FormNavigation 
            activeTab={activeTab} 
            isLastStep={false} 
            onPrevious={handlePrevious} 
            onNext={handleNext} 
          />
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <ExpensesSection 
            propertyData={propertyData} 
            handleInputChange={handleInputChange} 
          />
          <FormNavigation 
            activeTab={activeTab} 
            isLastStep={true} 
            onPrevious={handlePrevious} 
            onNext={handleNext} 
          />
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default PropertyForm;
