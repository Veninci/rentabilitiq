
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { setUserSubscription } from '@/lib/usageTracker';
import { ExternalLink } from 'lucide-react';

interface PaymentFormProps {
  planId: string;
  planName: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
}

const PaymentForm = ({ planId, planName, amount, billingCycle }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRedirectToStripe = () => {
    // Stockons les informations du plan dans localStorage avant la redirection
    localStorage.setItem('pending_subscription', planId);
    localStorage.setItem('subscription_timestamp', Date.now().toString());
    
    // Redirection vers le lien Stripe de test fourni
    window.location.href = "https://buy.stripe.com/test_bIY8yl4p22a217a4gg";
    
    // Note: L'abonnement ne sera activé qu'après vérification du paiement
    // La redirection vers Stripe nous fait perdre le contrôle jusqu'au retour de l'utilisateur
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    handleRedirectToStripe();
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-4">
          Finaliser l'abonnement {planName}
        </h3>
        
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Détails du forfait:</p>
          <p className="font-medium">{planName} - {billingCycle === 'monthly' ? 'Mensuel' : 'Annuel'}</p>
          <p className="text-lg font-semibold">{amount} € {billingCycle === 'monthly' ? '/mois' : '/an'}</p>
        </div>

        <div className="mb-6">
          <div className="p-4 bg-muted/50 rounded-md text-center">
            <p className="text-sm mb-2">Vous allez être redirigé vers une page de paiement sécurisée Stripe</p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? 'Redirection...' : 'Procéder au paiement'} <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="w-full mt-3"
          onClick={() => navigate('/pricing')}
        >
          Retour aux tarifs
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          En procédant au paiement, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
        </p>
      </form>
    </Card>
  );
};

export default PaymentForm;
