
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { formatter } from '@/lib/formatter';
import { cn } from '@/lib/utils';

const PricingCards = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      name: 'Basic',
      description: 'Pour débuter vos simulations immobilières',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        '3 simulations par mois',
        'Calculs basiques de rentabilité',
        'Comparaison location classique et Airbnb',
        'Accès à la calculatrice standard',
      ],
      limitations: [
        'Export PDF non disponible',
        'Pas d\'alertes personnalisées',
        'Pas d\'accès à l\'API immobilière',
        'Pas de conseils fiscaux',
      ],
      cta: 'Commencer gratuitement',
      variant: 'default',
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'Pour les investisseurs actifs',
      price: {
        monthly: 8.99,
        yearly: 90,
      },
      savePercent: 16,
      features: [
        'Simulations illimitées',
        'Export PDF des rapports',
        'Alertes de rentabilité',
        'Comparaison multi-propriétés',
        'Support prioritaire',
      ],
      limitations: [
        'Pas d\'accès à l\'API immobilière',
        'Pas de suivi des tendances',
        'Pas de conseils fiscaux',
      ],
      cta: 'Essayer 14 jours gratuits',
      variant: 'default',
      highlighted: true,
    },
    {
      name: 'Expert',
      description: 'Pour les investisseurs professionnels',
      price: {
        monthly: 13.99,
        yearly: 150,
      },
      savePercent: 11,
      features: [
        'Tout ce qui est inclus dans Pro',
        'API immobilière complète',
        'Suivi des tendances du marché',
        'Conseils fiscaux personnalisés',
        'Tableau de bord avancé',
        'Accès prioritaire aux nouvelles fonctionnalités',
      ],
      limitations: [],
      cta: 'Essayer 14 jours gratuits',
      variant: 'elevated',
      highlighted: false,
    },
  ];

  return (
    <div className="animate-slide-up">
      <div className="flex justify-center mb-8 md:mb-10">
        <div className="flex items-center bg-muted p-1 rounded-full">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              "px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all",
              billingCycle === 'monthly' 
                ? "bg-white text-foreground shadow-sm" 
                : "text-muted-foreground"
            )}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={cn(
              "px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all",
              billingCycle === 'yearly' 
                ? "bg-white text-foreground shadow-sm" 
                : "text-muted-foreground"
            )}
          >
            Annuel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {pricingPlans.map((plan) => (
          <GlassCard 
            key={plan.name}
            className={cn(
              "relative overflow-hidden transition-all hover:translate-y-[-4px]",
              plan.highlighted && "md:translate-y-[-8px] border-primary/40"
            )}
            variant={plan.highlighted ? "elevated" : "default"}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-md">
                Recommandé
              </div>
            )}
            
            <div className="mb-4 md:mb-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground mt-1">{plan.description}</p>
            </div>
            
            <div className="mb-4 md:mb-6">
              <div className="flex items-end gap-2">
                <span className="text-3xl md:text-4xl font-bold">
                  {formatter.formatCurrency(
                    plan.price[billingCycle], 
                    { maximumFractionDigits: 2 }
                  )}
                </span>
                <span className="text-muted-foreground mb-1">
                  {billingCycle === 'monthly' ? '/mois' : '/an'}
                </span>
              </div>
              
              {plan.savePercent && billingCycle === 'yearly' && (
                <div className="mt-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Économisez {plan.savePercent}%
                </div>
              )}
            </div>
            
            <div className="mb-4 md:mb-6">
              <ul className="space-y-2 md:space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
                
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-2 text-muted-foreground">
                    <X className="text-muted-foreground/70 shrink-0 mt-0.5" size={16} />
                    <span className="text-sm md:text-base">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              className="w-full mt-4 touch-target" 
              variant={plan.highlighted ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </GlassCard>
        ))}
      </div>
      
      <div className="text-center text-muted-foreground mt-8 md:mt-12">
        <p className="text-sm md:text-base">
          Des questions sur nos offres ? <a href="#faq" className="text-primary hover:underline">Consultez notre FAQ</a> ou <a href="#contact" className="text-primary hover:underline">contactez-nous</a>.
        </p>
      </div>
    </div>
  );
};

export default PricingCards;
