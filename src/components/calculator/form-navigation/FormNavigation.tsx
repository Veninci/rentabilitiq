
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
        >
          Précédent
        </Button>
      ) : (
        <div /> // Empty div to maintain flex spacing
      )}
      
      {isLastStep ? (
        <Button 
          type="submit"
          className="bg-primary"
        >
          Calculer la rentabilité
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={onNext}
          className="flex items-center gap-2"
        >
          Suivant <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
