
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingCards from '@/components/pricing/PricingCards';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Tarifs - RentabilitiQ | Calculateur de rentabilité immobilière</title>
        <meta name="description" content="Découvrez nos différentes formules d'abonnement pour le calculateur de rentabilité immobilière RentabilitiQ, avec options Basic, Pro et Expert." />
        <link rel="canonical" href="https://rentabilitiq.com/pricing" />
      </Helmet>
      
      <Navbar />
      <BreadcrumbNav />
      
      <main className="flex-grow pt-8 pricing-page">
        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-in">
              Des tarifs adaptés à vos besoins
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Choisissez le plan qui correspond à votre stratégie d'investissement immobilier. 
              <Link to="/calculator" className="text-primary hover:underline ml-1">
                Essayez notre calculateur gratuit
              </Link>.
            </p>
          </div>
          
          <PricingCards />
          
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
