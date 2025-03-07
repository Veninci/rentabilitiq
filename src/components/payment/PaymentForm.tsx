
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Cette partie serait normalement connectée à un backend pour créer une intention de paiement
    // Simulation pour cette démonstration
    try {
      toast({
        title: "Paiement simulé",
        description: `Abonnement ${planName} ${billingCycle} souscrit avec succès!`,
      });
      
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/calculator');
      }, 2000);
    } catch (err) {
      setError("Une erreur est survenue lors du traitement du paiement.");
      setIsProcessing(false);
    }
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
          <label className="block text-sm font-medium mb-2">
            Informations de carte
          </label>
          <div className="p-3 border rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? 'Traitement en cours...' : 'Payer maintenant'}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          En procédant au paiement, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
        </p>
      </form>
    </Card>
  );
};

export default PaymentForm;
