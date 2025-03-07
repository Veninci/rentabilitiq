
import React from 'react';
import { ArrowRight, BarChart4, PieChart, Calculator, Maximize2, Home, Building, Wallet, TrendingUp, Landmark, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Hero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      {/* Decorative circle */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <span>Solution innovante pour investisseurs immobiliers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-slide-up" style={{ lineHeight: 1.1 }}>
            Optimisez la rentabilité de vos investissements immobiliers
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            Calculez, analysez et comparez la rentabilité de vos biens locatifs en quelques clics.
            Une solution complète pour prendre des décisions éclairées.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button asChild size="lg" className="rounded-full px-6 py-6 text-base">
              <Link to="/calculator">
                Essayer le calculateur
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-6 text-base">
              <Link to="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="relative mt-12 mb-8 animate-blur-in" style={{ animationDelay: "300ms" }}>
          <GlassCard className="mx-auto max-w-5xl overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Interface mockup */}
                <div className="w-full h-full p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-lg font-medium">Calculateur de rentabilité</div>
                    </div>
                    <div className="bg-amber-100 text-amber-700 text-xs font-medium py-1 px-3 rounded-full">
                      Exemple
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
                    <div className="col-span-2 bg-white rounded-xl shadow-sm p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium flex items-center">
                          <Settings className="h-4 w-4 mr-2 text-primary" /> 
                          Paramètres du bien
                        </div>
                        <div className="flex space-x-2">
                          <div className="px-2 py-1 bg-primary/10 rounded text-xs text-primary font-medium">Appartement</div>
                          <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-medium">Lyon</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="space-y-1.5">
                          <div className="text-xs text-gray-500">Prix d'achat</div>
                          <div className="h-8 bg-gray-100 rounded-md flex items-center px-3 text-sm font-medium">210 000 €</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-xs text-gray-500">Surface</div>
                          <div className="h-8 bg-gray-100 rounded-md flex items-center px-3 text-sm font-medium">45 m²</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-xs text-gray-500">Loyer mensuel</div>
                          <div className="h-8 bg-gray-100 rounded-md flex items-center px-3 text-sm font-medium">850 €</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-xs text-gray-500">Type de location</div>
                          <div className="h-8 bg-gray-100 rounded-md flex items-center px-3 text-sm font-medium">Longue durée</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-xs text-gray-500">Apport</div>
                          <div className="h-8 bg-gray-100 rounded-md flex items-center px-3 text-sm font-medium">40 000 €</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-xs text-gray-500">Taux d'intérêt</div>
                          <div className="h-8 bg-gray-100 rounded-md flex items-center px-3 text-sm font-medium">3.5%</div>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <div className="h-8 w-36 bg-primary rounded-md flex items-center justify-center text-white text-sm font-medium">
                          Calculer
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium flex items-center">
                          <BarChart4 className="h-4 w-4 mr-2 text-primary" /> 
                          Dashboard
                        </div>
                      </div>
                      
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-primary mr-2" />
                            <div className="text-xs text-muted-foreground">Rendement brut</div>
                          </div>
                          <div className="font-medium text-primary">5.8%</div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 text-green-500 mr-2" />
                            <div className="text-xs text-muted-foreground">Cash-flow mensuel</div>
                          </div>
                          <div className="font-medium text-green-500">387 €</div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <Landmark className="h-4 w-4 text-blue-500 mr-2" />
                            <div className="text-xs text-muted-foreground">Mensualité crédit</div>
                          </div>
                          <div className="font-medium text-blue-500">614 €</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 h-24 bg-gray-50 rounded-lg flex items-center justify-center relative">
                        <PieChart className="h-12 w-12 text-primary/30 absolute" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center shadow-sm">
                            <div className="text-center">
                              <div className="text-xl font-bold text-primary">4.2%</div>
                              <div className="text-xs text-gray-500">Rendement</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/80 shadow-sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
          <div className="text-center mt-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
            L'interface ci-dessus est un exemple à titre illustratif. Essayez le calculateur pour des résultats personnalisés.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Calcul précis</h3>
            <p className="text-muted-foreground text-sm">Obtenez des calculs de rentabilité précis basés sur tous les paramètres pertinents de votre investissement.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center mb-4">
              <BarChart4 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Analyse complète</h3>
            <p className="text-muted-foreground text-sm">Analysez en détail tous les aspects financiers de votre bien : revenus, charges, cash-flow et plus encore.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center mb-4">
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Comparaison visuelle</h3>
            <p className="text-muted-foreground text-sm">Comparez facilement différents scénarios d'investissement grâce à des visualisations claires et intuitives.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
