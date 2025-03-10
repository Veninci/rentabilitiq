
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingCards from '@/components/pricing/PricingCards';
import PricingFAQ from '@/components/pricing/PricingFAQ';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-0 pricing-page">
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-in">
              Des tarifs adaptés à vos besoins
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Choisissez le plan qui correspond à votre stratégie d'investissement immobilier
            </p>
          </div>
          
          <PricingCards />
          
          <div className="mt-16 md:mt-24">
            <PricingFAQ />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
