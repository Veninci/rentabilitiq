
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Pricing as PricingComponent } from '@/components/ui/pricing';

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "0",
      yearlyPrice: "0",
      period: "mois",
      features: [
        '1 simulation par mois',
        'Calculs basiques de rentabilité',
        'Comparaison location classique et Airbnb',
        'Accès à la calculatrice standard',
      ],
      description: "Pour débuter vos simulations immobilières",
      buttonText: "Commencer gratuitement",
      href: "/calculator",
      isPopular: false,
    },
    {
      name: "Pro",
      price: "8.99",
      yearlyPrice: "90",
      period: "mois",
      features: [
        'Simulations illimitées',
        'Export PDF des rapports',
        'Alertes de rentabilité',
        'Comparaison multi-propriétés',
        'Support prioritaire',
      ],
      description: "Pour les investisseurs actifs",
      buttonText: "S'abonner maintenant",
      href: "/checkout?planId=pro&planName=Pro&amount=8.99&cycle=monthly",
      isPopular: true,
    },
    {
      name: "Expert",
      price: "13.99",
      yearlyPrice: "150",
      period: "mois",
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
      href: "/checkout?planId=expert&planName=Expert&amount=13.99&cycle=monthly",
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
          <PricingComponent 
            plans={pricingPlans}
            title="Des tarifs adaptés à vos besoins"
            description="Choisissez le plan qui correspond à votre stratégie d'investissement immobilier."
          />
          
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
