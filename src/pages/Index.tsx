
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CityMarketTrends from '@/components/home/city-market-trends';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logos3 } from '@/components/ui/logos3';

const partnersData = {
  heading: "Ils nous font confiance",
  logos: [
    {
      id: "logo-1",
      description: "BNP Paribas",
      image: "https://shadcnblocks.com/images/block/logos/bnp.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-2",
      description: "Crédit Agricole",
      image: "https://shadcnblocks.com/images/block/logos/ca.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-3",
      description: "Century 21",
      image: "https://shadcnblocks.com/images/block/logos/century21.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-4",
      description: "Orpi",
      image: "https://shadcnblocks.com/images/block/logos/orpi.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-5",
      description: "Nexity",
      image: "https://shadcnblocks.com/images/block/logos/nexity.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-6",
      description: "SeLoger",
      image: "https://shadcnblocks.com/images/block/logos/seloger.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-7",
      description: "PAP",
      image: "https://shadcnblocks.com/images/block/logos/pap.svg",
      className: "h-8 w-auto",
    },
    {
      id: "logo-8",
      description: "LeBonCoin",
      image: "https://shadcnblocks.com/images/block/logos/leboncoin.svg",
      className: "h-8 w-auto",
    },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle className="shadow-md bg-background/80 backdrop-blur-sm" />
      </div>
      <main className="flex-grow pt-16 md:pt-20">
        <Hero />
        <Logos3 {...partnersData} />
        <Features />
        <CityMarketTrends />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
