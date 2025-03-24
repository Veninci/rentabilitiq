
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FormNavigationProps {
  activeTab: string;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  activeTab,
  isLastStep,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between pt-4">
      {activeTab !== 'purchase' ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
          className="border-gray-600 text-black dark:text-white hover:bg-gray-800 hover:text-white"
        >
          Précédent
        </Button>
      ) : (
        <div /> // Empty div to maintain flex spacing
      )}
      
      {isLastStep ? (
        <Button 
          type="submit"
          className="bg-primary text-white"
        >
          Calculer la rentabilité
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={onNext}
          className="flex items-center gap-2 bg-primary text-white"
        >
          Suivant <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
