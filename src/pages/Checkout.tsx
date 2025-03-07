
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PaymentForm from '@/components/payment/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Remplacez avec votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51O9aXXXXXXXXXXXXXXXXXXXX');

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const planId = searchParams.get('planId') || 'pro';
  const planName = searchParams.get('planName') || 'Pro';
  const amount = parseFloat(searchParams.get('amount') || '8.99');
  const billingCycle = (searchParams.get('cycle') || 'monthly') as 'monthly' | 'yearly';

  const handleGoBack = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-8" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux tarifs
          </Button>

          <div className="max-w-md mx-auto mb-12">
            <h1 className="text-2xl font-bold text-center mb-2">
              Finaliser votre abonnement
            </h1>
            <p className="text-center text-muted-foreground">
              Entrez vos informations de paiement ci-dessous
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm 
              planId={planId} 
              planName={planName} 
              amount={amount} 
              billingCycle={billingCycle} 
            />
          </Elements>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
