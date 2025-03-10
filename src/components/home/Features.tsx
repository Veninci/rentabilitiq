
import React from 'react';
import { CheckCircle, TrendingUp, CircleDollarSign, FileText, Calculator, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import CityMarketTrends from './city-market-trends';

const Features = () => {
  return (
    <section className="py-12 md:py-24 bg-gray-50 px-4 md:px-0 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 md:mb-4">
            <span>Fonctionnalités principales</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 features-title dark:text-white">
            Tout ce dont vous avez besoin pour analyser vos investissements
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground">
            Des outils puissants pour vous aider à prendre des décisions éclairées et maximiser votre rentabilité.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          <FeatureCard 
            icon={<Calculator />}
            title="Calcul de rendement"
            description="Calculez facilement le rendement brut et net de vos investissements en prenant en compte tous les facteurs pertinents."
          />
          
          <FeatureCard 
            icon={<TrendingUp />}
            title="Simulation de cash-flow"
            description="Visualisez vos flux de trésorerie mensuels et annuels pour anticiper la rentabilité à long terme de vos investissements."
          />
          
          <FeatureCard 
            icon={<CircleDollarSign />}
            title="Analyse des coûts"
            description="Identifiez et analysez tous les coûts d'acquisition et d'exploitation pour une vision claire de votre investissement."
          />
          
          <FeatureCard 
            icon={<CheckCircle />}
            title="Comparaison location"
            description="Comparez facilement les performances entre location longue durée et location courte durée (Airbnb)."
          />
          
          <FeatureCard 
            icon={<FileText />}
            title="Rapports détaillés"
            description="Générez des rapports PDF personnalisés pour garder une trace de vos analyses et suivre vos performances."
          />
          
          <FeatureCard 
            icon={<Clock />}
            title="Calcul d'amortissement"
            description="Estimez le temps nécessaire pour rentabiliser votre investissement et optimisez votre stratégie."
          />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="w-full lg:w-1/2 p-6 md:p-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 md:mb-6">
              <span>Version Premium</span>
            </div>
            
            <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
              Débloquez des fonctionnalités avancées
            </h3>
            
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-8">
              Passez à la version premium pour accéder à des outils encore plus puissants et optimiser davantage vos investissements.
            </p>
            
            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base">
              {[
                "Suivi des revenus en temps réel",
                "Alertes personnalisées sur le marché",
                "Base de données des prix au m²",
                "Outil d'optimisation fiscale"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2 md:mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg" className="w-full md:w-auto rounded-full px-6">
              <Link to="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </div>
          
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-12 flex items-center justify-center">
            <GlassCard className="w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium dark:text-black">Évolution du marché</div>
                    <div className="text-xs text-muted-foreground dark:text-black">Mise à jour en temps réel</div>
                  </div>
                </div>
                <CityMarketTrends />
              </div>
              
              <div className="space-y-4">
                <div className="h-48 w-full bg-gradient-to-r from-gray-100 to-white rounded-lg flex items-end p-4">
                  <div className="h-1/3 w-1/6 bg-gray-200 rounded-t-sm mx-1"></div>
                  <div className="h-1/2 w-1/6 bg-gray-200 rounded-t-sm mx-1"></div>
                  <div className="h-2/3 w-1/6 bg-gray-200 rounded-t-sm mx-1"></div>
                  <div className="h-1/2 w-1/6 bg-gray-200 rounded-t-sm mx-1"></div>
                  <div className="h-3/4 w-1/6 bg-primary/20 rounded-t-sm mx-1"></div>
                  <div className="h-full w-1/6 bg-primary/30 rounded-t-sm mx-1"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-xs text-muted-foreground mb-1">Prix moyen au m²</div>
                    <div className="text-lg font-semibold">4 523 €</div>
                    <div className="text-xs text-green-500 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1% ce mois
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-xs text-muted-foreground mb-1">Rendement moyen</div>
                    <div className="text-lg font-semibold">5.2%</div>
                    <div className="text-xs text-red-500 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                      -0.3% ce mois
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 transition-all duration-300 hover:shadow-md">
      <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">{title}</h3>
      <p className="text-muted-foreground text-xs md:text-sm">{description}</p>
    </div>
  );
};

export default Features;
