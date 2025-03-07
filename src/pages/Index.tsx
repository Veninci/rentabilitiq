
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const Index = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <section className="relative pt-24 md:pt-32 pb-10 md:pb-24 overflow-hidden px-4 md:px-0">
          <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
          <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight animate-slide-up" style={{ lineHeight: 1.1 }}>
                Calculateur de rentabilité
              </h1>
            </div>
            
            <div className="relative mt-8 md:mt-16 mb-6 md:mb-10 animate-blur-in">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-10 rounded-full bg-white/80 shadow-sm h-8 w-8 md:h-10 md:w-10">
                    <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto w-[95vw]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold mb-4">Calculateur de rentabilité - Vue détaillée</DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    <Hero showFullView={true} />
                  </div>
                </DialogContent>
              </Dialog>
              
              <GlassCard className="mx-auto max-w-6xl overflow-hidden">
                <div className="relative">
                  <div className="bg-amber-100 text-amber-700 text-sm md:text-base font-medium py-1 px-4 rounded-full absolute top-4 right-4 z-10">
                    Exemple
                  </div>
                  <Hero showFullView={false} />
                </div>
              </GlassCard>
              <div className="text-center mt-3 text-xs md:text-sm text-muted-foreground animate-fade-in">
                L'interface ci-dessus est un exemple à titre illustratif. Cliquez sur <Maximize2 className="inline h-3 w-3 mx-1" /> pour agrandir.
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
