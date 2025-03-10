
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
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

  const getStripeUrl = () => {
    // Stockons les informations du plan dans localStorage avant la redirection
    localStorage.setItem('pending_subscription', planId);
    localStorage.setItem('subscription_timestamp', Date.now().toString());
    
    // Supprimer tout flag de confirmation précédent pour éviter les faux accès
    localStorage.removeItem('payment_confirmed');
    
    // Nous générons un ID de transaction unique pour cette tentative d'achat
    // Cet ID sera utilisé pour vérifier que le paiement a bien été effectué
    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('transaction_id', transactionId);
    
    // Créer l'URL complète pour le retour après paiement
    const currentDomain = window.location.origin; // Obtenir le domaine actuel (localhost ou production)
    const successUrl = `${currentDomain}/checkout?status=success&payment_id=${transactionId}`;
    
    // Redirection vers le lien Stripe correspondant au plan choisi
    if (planId === 'expert') {
      return `https://buy.stripe.com/aEUcOIbXd6mA8zm001?transaction_id=${transactionId}&redirect_to=${encodeURIComponent(successUrl)}`;
    }
    
    // Différents liens pour le plan Pro en fonction du cycle de facturation
    if (planId === 'pro') {
      // Si c'est un abonnement annuel
      if (billingCycle === 'yearly') {
        return `https://buy.stripe.com/3cs7uo7GXcKY4j68wy?transaction_id=${transactionId}&redirect_to=${encodeURIComponent(successUrl)}`;
      }
      
      // Si c'est un abonnement mensuel (par défaut)
      return `https://buy.stripe.com/cN25mg3qHfXa3f2dQQ?transaction_id=${transactionId}&redirect_to=${encodeURIComponent(successUrl)}`;
    }
    
    // Lien par défaut pour le plan Pro mensuel si aucune correspondance n'est trouvée
    return `https://buy.stripe.com/cN25mg3qHfXa3f2dQQ?transaction_id=${transactionId}&redirect_to=${encodeURIComponent(successUrl)}`;
  };

  const handleRedirectToStripe = () => {
    window.location.href = getStripeUrl();
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
            <p className="text-xs text-muted-foreground">L'accès au calculateur sera débloqué uniquement après confirmation du paiement</p>
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
