
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { 
  getRemainingPaidCalculations, 
  usePaidCalculation, 
  addPaidCalculation 
} from '@/lib/usageTracker';

// Remplacez cette clé par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51O9aXXXXXXXXXXXXXXXXXXXX');

interface StripeProviderProps {
  children: ReactNode;
}

interface StripeContextValue {
  // Déclaration des types pour l'authentification et les paiements
  hasPaidForCalculation: () => boolean;
  markCalculationAsPaid: () => void;
  useCalculation: () => boolean;
  resetPaymentStatus: () => void;
  remainingCalculations: number;
}

const StripeContext = createContext<StripeContextValue>({
  hasPaidForCalculation: () => false,
  markCalculationAsPaid: () => {},
  useCalculation: () => false,
  resetPaymentStatus: () => {},
  remainingCalculations: 0,
});

export const useStripe = () => useContext(StripeContext);

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const [remainingCalculations, setRemainingCalculations] = useState<number>(0);

  useEffect(() => {
    // Vérifier si l'utilisateur a des calculs déjà payés
    const paidCalculations = getRemainingPaidCalculations();
    setRemainingCalculations(paidCalculations);
  }, []);

  // Vérifier si l'utilisateur a payé pour un calcul
  const hasPaidForCalculation = (): boolean => {
    return remainingCalculations > 0;
  };

  // Marquer qu'un calcul a été effectué et payé
  const markCalculationAsPaid = (): void => {
    addPaidCalculation();
    setRemainingCalculations(getRemainingPaidCalculations());
  };

  // Utiliser un calcul
  const useCalculation = (): boolean => {
    if (remainingCalculations > 0) {
      const success = usePaidCalculation();
      if (success) {
        setRemainingCalculations(getRemainingPaidCalculations());
      }
      return success;
    }
    return false;
  };

  // Réinitialiser l'état des paiements
  const resetPaymentStatus = (): void => {
    setRemainingCalculations(0);
    localStorage.removeItem('paid_calculations');
  };

  const value = {
    hasPaidForCalculation,
    markCalculationAsPaid,
    useCalculation,
    resetPaymentStatus,
    remainingCalculations,
  };

  return (
    <StripeContext.Provider value={value}>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};
