
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Building, Home, Landmark, PercentCircle } from 'lucide-react';
import { PropertyData, RentalType } from '@/types/property';

interface PropertyFormProps {
  onCalculate: (data: PropertyData) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onCalculate }) => {
  const [activeTab, setActiveTab] = useState('purchase');
  const [rentalType, setRentalType] = useState<RentalType>('long-term');
  
  const [propertyData, setPropertyData] = useState<PropertyData>({
    // Achat
    purchasePrice: 200000,
    renovationCost: 10000,
    notaryFees: 15000,
    otherCosts: 5000,
    
    // Financement
    downPayment: 40000,
    loanAmount: 190000,
    interestRate: 3.5,
    loanTerm: 20,
    
    // Location
    rentalType: 'long-term',
    monthlyRent: 850,
    airbnbNightlyRate: 80,
    airbnbOccupancyRate: 70,
    managementFees: 3,
    
    // Charges
    propertyTax: 1200,
    insurance: 400,
    condoFees: 1200,
    maintenanceCost: 800,
    otherExpenses: 500,
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(propertyData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <Tabs defaultValue="purchase" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="purchase" className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3">
            <Building className="h-4 w-4" />
            <span>Achat</span>
          </TabsTrigger>
          <TabsTrigger value="financing" className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3">
            <Landmark className="h-4 w-4" />
            <span>Financement</span>
          </TabsTrigger>
          <TabsTrigger value="rental" className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3">
            <Home className="h-4 w-4" />
            <span>Location</span>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-1 sm:px-3">
            <PercentCircle className="h-4 w-4" />
            <span>Charges</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="purchase" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Prix d'achat (€)</Label>
              <Input
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                value={propertyData.purchasePrice}
                onChange={handleInputChange}
                min="0"
                step="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="renovationCost">Coût des travaux (€)</Label>
              <Input
                id="renovationCost"
                name="renovationCost"
                type="number"
                value={propertyData.renovationCost}
                onChange={handleInputChange}
                min="0"
                step="100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notaryFees">Frais de notaire (€)</Label>
              <Input
                id="notaryFees"
                name="notaryFees"
                type="number"
                value={propertyData.notaryFees}
                onChange={handleInputChange}
                min="0"
                step="100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otherCosts">Autres frais d'acquisition (€)</Label>
              <Input
                id="otherCosts"
                name="otherCosts"
                type="number"
                value={propertyData.otherCosts}
                onChange={handleInputChange}
                min="0"
                step="100"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="button" 
              onClick={() => setActiveTab('financing')}
              className="flex items-center gap-2"
            >
              Suivant <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="financing" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="downPayment">Apport personnel (€)</Label>
              <Input
                id="downPayment"
                name="downPayment"
                type="number"
                value={propertyData.downPayment}
                onChange={handleInputChange}
                min="0"
                step="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Montant du prêt (€)</Label>
              <Input
                id="loanAmount"
                name="loanAmount"
                type="number"
                value={propertyData.loanAmount}
                onChange={handleInputChange}
                min="0"
                step="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interestRate">Taux d'intérêt (%)</Label>
              <Input
                id="interestRate"
                name="interestRate"
                type="number"
                value={propertyData.interestRate}
                onChange={handleInputChange}
                min="0"
                step="0.05"
                max="15"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanTerm">Durée du prêt (années)</Label>
              <Input
                id="loanTerm"
                name="loanTerm"
                type="number"
                value={propertyData.loanTerm}
                onChange={handleInputChange}
                min="5"
                max="30"
                step="1"
              />
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setActiveTab('purchase')}
            >
              Précédent
            </Button>
            <Button 
              type="button" 
              onClick={() => setActiveTab('rental')}
              className="flex items-center gap-2"
            >
              Suivant <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="rental" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Type de location</Label>
              <RadioGroup 
                value={rentalType} 
                onValueChange={handleRentalTypeChange}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long-term" id="long-term" />
                  <Label htmlFor="long-term" className="cursor-pointer">Location longue durée</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="airbnb" id="airbnb" />
                  <Label htmlFor="airbnb" className="cursor-pointer">Location courte durée (Airbnb)</Label>
                </div>
              </RadioGroup>
            </div>
            
            {rentalType === 'long-term' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Loyer mensuel (€)</Label>
                  <Input
                    id="monthlyRent"
                    name="monthlyRent"
                    type="number"
                    value={propertyData.monthlyRent}
                    onChange={handleInputChange}
                    min="0"
                    step="10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="managementFees">Frais de gestion (%)</Label>
                  <Input
                    id="managementFees"
                    name="managementFees"
                    type="number"
                    value={propertyData.managementFees}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.5"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="airbnbNightlyRate">Tarif par nuit (€)</Label>
                  <Input
                    id="airbnbNightlyRate"
                    name="airbnbNightlyRate"
                    type="number"
                    value={propertyData.airbnbNightlyRate}
                    onChange={handleInputChange}
                    min="0"
                    step="5"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="airbnbOccupancyRate">Taux d'occupation (%)</Label>
                  <Input
                    id="airbnbOccupancyRate"
                    name="airbnbOccupancyRate"
                    type="number"
                    value={propertyData.airbnbOccupancyRate}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="managementFees">Frais de gestion (%)</Label>
                  <Input
                    id="managementFees"
                    name="managementFees"
                    type="number"
                    value={propertyData.managementFees}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.5"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setActiveTab('financing')}
            >
              Précédent
            </Button>
            <Button 
              type="button" 
              onClick={() => setActiveTab('expenses')}
              className="flex items-center gap-2"
            >
              Suivant <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyTax">Taxe foncière (€/an)</Label>
              <Input
                id="propertyTax"
                name="propertyTax"
                type="number"
                value={propertyData.propertyTax}
                onChange={handleInputChange}
                min="0"
                step="10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insurance">Assurance PNO (€/an)</Label>
              <Input
                id="insurance"
                name="insurance"
                type="number"
                value={propertyData.insurance}
                onChange={handleInputChange}
                min="0"
                step="10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condoFees">Charges de copropriété (€/an)</Label>
              <Input
                id="condoFees"
                name="condoFees"
                type="number"
                value={propertyData.condoFees}
                onChange={handleInputChange}
                min="0"
                step="10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maintenanceCost">Entretien et réparations (€/an)</Label>
              <Input
                id="maintenanceCost"
                name="maintenanceCost"
                type="number"
                value={propertyData.maintenanceCost}
                onChange={handleInputChange}
                min="0"
                step="10"
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="otherExpenses">Autres dépenses (€/an)</Label>
              <Input
                id="otherExpenses"
                name="otherExpenses"
                type="number"
                value={propertyData.otherExpenses}
                onChange={handleInputChange}
                min="0"
                step="10"
              />
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setActiveTab('rental')}
            >
              Précédent
            </Button>
            <Button 
              type="submit"
              className="bg-primary"
            >
              Calculer la rentabilité
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default PropertyForm;
