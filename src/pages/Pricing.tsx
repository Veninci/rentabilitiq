
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button as MovingButton } from '@/components/ui/moving-border';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();

  const handleToggle = (checked: boolean) => {
    setBillingCycle(checked ? 'yearly' : 'monthly');
  };

  const handleSubscribe = (plan: any) => {
    if (plan.id === 'basic') {
      navigate('/calculator');
      return;
    }
    
    const amount = billingCycle === 'yearly' ? plan.yearlyPrice : plan.price;
    navigate(`/checkout?planId=${plan.id}&planName=${plan.name}&amount=${amount}&cycle=${billingCycle}`);
  };

  const pricingPlans = [
    {
      id: 'basic',
      name: "Basic",
      price: "0",
      yearlyPrice: "0",
      period: billingCycle === 'monthly' ? "mois" : "an",
      features: [
        '1 simulation par mois',
        'Calculs basiques de rentabilité',
        'Comparaison location classique et Airbnb',
        'Accès à la calculatrice standard',
      ],
      description: "Pour débuter vos simulations immobilières",
      buttonText: "Commencer gratuitement",
      isPopular: false,
    },
    {
      id: 'pro',
      name: "Pro",
      price: "8.99",
      yearlyPrice: "90",
      period: billingCycle === 'monthly' ? "mois" : "an",
      features: [
        'Simulations illimitées',
        'Export PDF des rapports',
        'Alertes de rentabilité',
        'Comparaison multi-propriétés',
        'Support prioritaire',
      ],
      description: "Pour les investisseurs actifs",
      buttonText: "S'abonner maintenant",
      isPopular: true,
    },
    {
      id: 'expert',
      name: "Expert",
      price: "13.99",
      yearlyPrice: "150",
      period: billingCycle === 'monthly' ? "mois" : "an",
      features: [
        'Tout ce qui est inclus dans Pro',
        'API immobilière complète',
        'Suivi des tendances du marché',
        'Conseils fiscaux personnalisés',
        'Tableau de bord avancé',
        'Accès prioritaire aux nouvelles fonctionnalités',
      ],
      description: "Pour les investisseurs professionnels",
      buttonText: "S'abonner maintenant",
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Tarifs - RentabilitiQ | Calculateur de rentabilité immobilière</title>
        <meta name="description" content="Découvrez nos différentes formules d'abonnement pour le calculateur de rentabilité immobilière RentabilitiQ, avec options Basic, Pro et Expert." />
        <link rel="canonical" href="https://rentabilitiq.com/pricing" />
      </Helmet>
      
      <Navbar />
      <BreadcrumbNav />
      
      <main className="flex-grow pricing-page">
        <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Des tarifs adaptés à vos besoins</h1>
            <p className="text-muted-foreground">
              Choisissez le plan qui correspond à votre stratégie d'investissement immobilier.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Label htmlFor="billing-toggle" className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Mensuel
              </Label>
              <Switch id="billing-toggle" checked={billingCycle === 'yearly'} onCheckedChange={handleToggle} />
              <Label htmlFor="billing-toggle" className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annuel <span className="text-primary">(Économisez)</span>
              </Label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={cn(
                  "flex flex-col p-6 bg-card rounded-xl border shadow-sm",
                  plan.isPopular ? "border-primary relative" : "border-border"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                    Recommandé
                  </div>
                )}
                
                <div className="mb-5">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{plan.description}</p>
                </div>
                
                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold">{billingCycle === 'monthly' ? plan.price : plan.yearlyPrice}€</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="text-primary h-5 w-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.isPopular ? (
                  <MovingButton
                    onClick={() => handleSubscribe(plan)}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    containerClassName="w-full h-12"
                  >
                    {plan.buttonText}
                  </MovingButton>
                ) : (
                  <Button 
                    onClick={() => handleSubscribe(plan)} 
                    variant={plan.id === 'basic' ? 'outline' : 'default'}
                    className="w-full"
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Des questions sur nos tarifs?</h2>
              <p className="text-muted-foreground">
                Consultez notre <Link to="/about" className="text-primary hover:underline">page À propos</Link> ou 
                <Link to="/terms" className="text-primary hover:underline ml-1">nos conditions d'utilisation</Link> pour plus d'informations.
              </p>
            </div>
            <PricingFAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
