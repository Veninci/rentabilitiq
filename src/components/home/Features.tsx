
import React from 'react';
import { CheckCircle, TrendingUp, CircleDollarSign, FileText, Calculator, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>Fonctionnalités principales</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin pour analyser vos investissements
          </h2>
          
          <p className="text-muted-foreground">
            Des outils puissants pour vous aider à prendre des décisions éclairées et maximiser votre rentabilité.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
        
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="lg:w-1/2 p-8 md:p-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span>Version Premium</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Débloquez des fonctionnalités avancées
            </h3>
            
            <p className="text-muted-foreground mb-8">
              Passez à la version premium pour accéder à des outils encore plus puissants et optimiser davantage vos investissements.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Suivi des revenus en temps réel",
                "Alertes personnalisées sur le marché",
                "Base de données des prix au m²",
                "Outil d'optimisation fiscale"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </div>
          
          <div className="lg:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12 flex items-center justify-center">
            <GlassCard className="w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Évolution du marché</div>
                    <div className="text-xs text-muted-foreground">Mise à jour en temps réel</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Détails</Button>
              </div>
              
              <div className="space-y-4">
                {/* Chart mockup */}
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
    <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="bg-primary/10 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Features;
