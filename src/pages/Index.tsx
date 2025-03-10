
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CityMarketTrends from '@/components/home/city-market-trends';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle className="shadow-md bg-background/80 backdrop-blur-sm" />
      </div>
      <main className="flex-grow pt-16 md:pt-20">
        <Hero />
        <Features />
        <CityMarketTrends />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
