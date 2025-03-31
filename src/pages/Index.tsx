
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logos3 } from '@/components/ui/logos3';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>RentabilitiQ - Calculateur de rentabilité immobilière en France</title>
        <meta name="description" content="Simulateur gratuit de rentabilité immobilière pour investisseurs. Comparez location classique et Airbnb, analysez les prix du marché et optimisez vos investissements." />
        <link rel="canonical" href="https://rentabilitiq.com" />
        <meta name="keywords" content="calculateur rentabilité, immobilier locatif, investissement rentable, Airbnb vs location, simulation immobilière" />
      </Helmet>

      <Navbar />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle className="shadow-md bg-background/80 backdrop-blur-sm" />
      </div>
      <main className="flex-grow pt-16 md:pt-20">
        <Hero />
        <Logos3 heading="Les partenaires engagés dans le développement" />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
