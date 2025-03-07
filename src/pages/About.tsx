
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import GlassCard from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">À propos de RentabilitiQ</h1>
          
          <GlassCard className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
            <p className="text-lg mb-6">
              RentabilitiQ a été créé pour démocratiser l'accès à l'information immobilière et permettre à tous les investisseurs, 
              qu'ils soient débutants ou expérimentés, de prendre des décisions éclairées basées sur des données fiables et actualisées.
            </p>
            <p className="text-lg mb-6">
              Dans un marché immobilier en constante évolution, nous croyons que l'information précise et l'analyse objective 
              sont les clés d'un investissement réussi. Notre plateforme offre des outils simples mais puissants pour évaluer 
              la rentabilité potentielle de vos projets immobiliers.
            </p>
          </GlassCard>
          
          <GlassCard className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ce que nous offrons</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>Des calculateurs de rentabilité immobilière simples et précis</li>
              <li>Des données actualisées sur les prix du marché dans les principales villes françaises</li>
              <li>Des analyses de tendances pour vous aider à identifier les opportunités d'investissement</li>
              <li>Des ressources pédagogiques pour comprendre les mécanismes de l'investissement immobilier</li>
            </ul>
          </GlassCard>
          
          <GlassCard>
            <h2 className="text-2xl font-semibold mb-6">Notre fondateur</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className={cn(
                  "relative w-44 h-44 mx-auto overflow-hidden rounded-full border-4 border-primary/20",
                  "hover:border-primary transition-all duration-300"
                )}>
                  <img 
                    src="/lovable-uploads/f10628aa-f2ee-42d3-9d80-c0513fee0296.png" 
                    alt="Lucas Da Silva Venancio, fondateur de RentabilitiQ" 
                    className="w-full h-full object-cover object-bottom filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-medium mb-2">Lucas Da Silva Venancio</h3>
                <p className="text-muted-foreground mb-1">Fondateur &amp; PDG</p>
                <div className="w-20 h-1 bg-primary rounded-full mb-4"></div>
                <p className="text-lg">
                  Passionné par l'immobilier et l'analyse de données, Lucas a fondé RentabilitiQ avec l'objectif 
                  de démocratiser l'investissement immobilier. Son expertise permet aujourd'hui d'offrir des outils 
                  innovants et accessibles pour tous les investisseurs.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default About;
