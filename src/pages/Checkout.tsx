
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PaymentForm from '@/components/payment/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { confirmSubscription } from '@/lib/usageTracker';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

// Remplacez avec votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51O9aXXXXXXXXXXXXXXXXXXXX');

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const planId = searchParams.get('planId') || 'pro';
  const planName = searchParams.get('planName') || 'Pro';
  const amount = searchParams.get('amount') || '8.99';
  const billingCycle = (searchParams.get('cycle') || 'monthly') as 'monthly' | 'yearly';
  
  // Vérifier si l'utilisateur revient de Stripe (paramètre de succès)
  const stripeStatus = searchParams.get('status');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    // Vérifier uniquement si l'utilisateur revient de Stripe avec un statut de succès
    // ET un ID de paiement (qui serait fourni par Stripe après paiement réussi)
    if (stripeStatus === 'success' && paymentId) {
      // Pour éviter de confirmer plusieurs fois le même paiement, vérifions s'il a déjà été traité
      const processedPaymentId = localStorage.getItem('processed_payment_id');
      if (processedPaymentId !== paymentId) {
        // Stocker l'ID de paiement pour ne pas le traiter à nouveau
        localStorage.setItem('processed_payment_id', paymentId);
        
        // Vérifier le type d'achat dans localStorage
        if (localStorage.getItem('pending_subscription') === 'unit') {
          // Confirmer l'achat d'un calcul à l'unité
          confirmSubscription();
          
          // Afficher un message de confirmation
          toast({
            title: "Achat réussi",
            description: "Votre achat d'un calcul a été confirmé. Vous pouvez maintenant l'utiliser.",
            variant: "default",
          });
          
          setPaymentSuccess(true);
        } else {
          // Confirmer l'abonnement normal
          confirmSubscription();
          
          // Afficher un message de confirmation
          toast({
            title: "Abonnement activé",
            description: `Votre abonnement ${planName} a été activé avec succès.`,
            variant: "default",
          });
          
          setPaymentSuccess(true);
        }
      }
    }
  }, [stripeStatus, paymentId, navigate, toast, planName]);

  const handleGoBack = () => {
    navigate('/pricing');
  };

  const handleGoToCalculator = () => {
    navigate('/calculator');
  };

  // Déterminer le montant à afficher en fonction du cycle de facturation
  const displayAmount = billingCycle === 'yearly' ? 
    (planId === 'pro' ? '90' : '150') : 
    amount;

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Paiement confirmé</h2>
                <p className="text-muted-foreground mb-4">
                  {planId === 'unit' ? 
                    "Votre achat d'un calcul a été confirmé. Vous pouvez maintenant l'utiliser." : 
                    `Votre abonnement ${planName} a été activé avec succès.`}
                </p>
                <Button 
                  onClick={handleGoToCalculator}
                  className="w-full"
                >
                  Aller au calculateur
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              {planId === 'unit' ? "Acheter un calcul" : "Finaliser votre abonnement"}
            </h1>
            <p className="text-center text-muted-foreground">
              {planId === 'unit' ? 
                "Achetez un calcul unique à utiliser quand vous voulez" : 
                "Entrez vos informations de paiement ci-dessous"}
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm 
              planId={planId} 
              planName={planName} 
              amount={parseFloat(displayAmount)} 
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
