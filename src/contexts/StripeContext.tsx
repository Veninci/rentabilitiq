
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Remplacez cette clé par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51O9aXXXXXXXXXXXXXXXXXXXX');

interface StripeProviderProps {
  children: ReactNode;
}

interface StripeContextValue {
  // Déclaration des types pour l'authentification et les paiements
  // Ces méthodes seront implémentées ultérieurement
  hasPaidForCalculation: () => boolean;
  markCalculationAsPaid: () => void;
  resetPaymentStatus: () => void;
  remainingCalculations: number;
}

const StripeContext = createContext<StripeContextValue>({
  hasPaidForCalculation: () => false,
  markCalculationAsPaid: () => {},
  resetPaymentStatus: () => {},
  remainingCalculations: 0,
});

export const useStripe = () => useContext(StripeContext);

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const [remainingCalculations, setRemainingCalculations] = useState<number>(0);

  useEffect(() => {
    // Vérifier si l'utilisateur a des calculs déjà payés
    const paidCalculations = localStorage.getItem('paid_calculations');
    if (paidCalculations) {
      setRemainingCalculations(parseInt(paidCalculations, 10));
    }
  }, []);

  // Vérifier si l'utilisateur a payé pour un calcul
  const hasPaidForCalculation = (): boolean => {
    return remainingCalculations > 0;
  };

  // Marquer qu'un calcul a été effectué et payé
  const markCalculationAsPaid = (): void => {
    const newCount = remainingCalculations + 1;
    setRemainingCalculations(newCount);
    localStorage.setItem('paid_calculations', newCount.toString());
  };

  // Utiliser un calcul
  const useCalculation = (): void => {
    if (remainingCalculations > 0) {
      const newCount = remainingCalculations - 1;
      setRemainingCalculations(newCount);
      localStorage.setItem('paid_calculations', newCount.toString());
    }
  };

  // Réinitialiser l'état des paiements
  const resetPaymentStatus = (): void => {
    setRemainingCalculations(0);
    localStorage.removeItem('paid_calculations');
  };

  const value = {
    hasPaidForCalculation,
    markCalculationAsPaid,
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
