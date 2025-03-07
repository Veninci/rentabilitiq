
import React, { createContext, useContext, ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Remplacez cette clé par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51O9aXXXXXXXXXXXXXXXXXXXX');

interface StripeProviderProps {
  children: ReactNode;
}

const StripeContext = createContext<{}>({});

export const useStripe = () => useContext(StripeContext);

export const StripeProvider = ({ children }: StripeProviderProps) => {
  return (
    <StripeContext.Provider value={{}}>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};
