import React from 'react';
import { ArrowRight, BarChart4, PieChart, Calculator, Maximize2, Home, Building, Wallet, TrendingUp, Landmark, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Hero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-10 md:pb-24 overflow-hidden px-4 md:px-0">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      {/* Decorative circle */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 md:mb-6 animate-fade-in">
            <span>Solution innovante pour investisseurs immobiliers</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight animate-slide-up" style={{ lineHeight: 1.1 }}>
            Optimisez la rentabilité de vos investissements immobiliers
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            Calculez, analysez et comparez la rentabilité de vos biens locatifs en quelques clics.
            Une solution complète pour prendre des décisions éclairées.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-6 py-6 text-base">
              <Link to="/calculator">
                Essayer le calculateur
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-6 py-6 text-base">
              <Link to="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="relative mt-8 md:mt-12 mb-6 md:mb-8 animate-blur-in" style={{ animationDelay: "300ms" }}>
          <GlassCard className="mx-auto max-w-5xl overflow-hidden">
            <div className="relative aspect-auto md:aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Interface mockup */}
                <div className="w-full h-full p-2 md:p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-2 md:mb-6">
                    <div className="flex items-center space-x-1 md:space-x-4">
                      <div className="bg-primary/10 h-6 w-6 md:h-10 md:w-10 rounded-lg flex items-center justify-center">
                        <Calculator className="h-3 w-3 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="text-xs md:text-lg font-medium">Calculateur de rentabilité</div>
                    </div>
                    <div className="bg-amber-100 text-amber-700 text-[10px] md:text-xs font-medium py-0.5 px-1.5 md:px-3 rounded-full">
                      Exemple
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 flex-grow">
                    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm p-2 md:p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-2 md:mb-4">
                        <div className="text-[10px] md:text-sm font-medium flex items-center">
                          <Settings className="h-2 w-2 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" /> 
                          Paramètres du bien
                        </div>
                        <div className="flex space-x-1 md:space-x-2">
                          <div className="px-1 md:px-2 py-0.5 md:py-1 bg-primary/10 rounded text-[8px] md:text-xs text-primary font-medium">Appartement</div>
                          <div className="px-1 md:px-2 py-0.5 md:py-1 bg-gray-100 rounded text-[8px] md:text-xs text-gray-500 font-medium">Lyon</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1.5 md:gap-3 mb-2 md:mb-3">
                        <div className="space-y-1">
                          <div className="text-[8px] md:text-xs text-gray-500">Prix d'achat</div>
                          <div className="h-6 md:h-8 bg-gray-100 rounded-md flex items-center px-2 md:px-3 text-[10px] md:text-sm font-medium">210 000 €</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[8px] md:text-xs text-gray-500">Surface</div>
                          <div className="h-6 md:h-8 bg-gray-100 rounded-md flex items-center px-2 md:px-3 text-[10px] md:text-sm font-medium">45 m²</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[8px] md:text-xs text-gray-500">Loyer mensuel</div>
                          <div className="h-6 md:h-8 bg-gray-100 rounded-md flex items-center px-2 md:px-3 text-[10px] md:text-sm font-medium">850 €</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[8px] md:text-xs text-gray-500">Type de location</div>
                          <div className="h-6 md:h-8 bg-gray-100 rounded-md flex items-center px-2 md:px-3 text-[10px] md:text-sm font-medium">Longue durée</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[8px] md:text-xs text-gray-500">Apport</div>
                          <div className="h-6 md:h-8 bg-gray-100 rounded-md flex items-center px-2 md:px-3 text-[10px] md:text-sm font-medium">40 000 €</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[8px] md:text-xs text-gray-500">Taux d'intérêt</div>
                          <div className="h-6 md:h-8 bg-gray-100 rounded-md flex items-center px-2 md:px-3 text-[10px] md:text-sm font-medium">3.5%</div>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <div className="h-5 md:h-8 w-16 md:w-36 bg-primary rounded-md flex items-center justify-center text-white text-[8px] md:text-sm font-medium">
                          Calculer
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex bg-white rounded-xl shadow-sm p-4 flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-medium mb-2">Dashboard</div>
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
                    
                    <div className="md:hidden bg-white rounded-xl shadow-sm p-2 flex-col flex">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-medium">Résultats</div>
                      </div>
                      
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-center justify-between bg-gray-50 p-1.5 rounded-lg">
                          <div className="flex items-center">
                            <TrendingUp className="h-3 w-3 text-primary mr-1" />
                            <div className="text-[8px] text-muted-foreground">Rendement</div>
                          </div>
                          <div className="font-medium text-[10px] text-primary">5.8%</div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-1.5 rounded-lg">
                          <div className="flex items-center">
                            <Wallet className="h-3 w-3 text-green-500 mr-1" />
                            <div className="text-[8px] text-muted-foreground">Cash-flow</div>
                          </div>
                          <div className="font-medium text-[10px] text-green-500">387 €</div>
                        </div>
                      </div>
                      
                      <div className="mt-2 h-14 bg-gray-50 rounded-lg flex items-center justify-center relative">
                        <PieChart className="h-8 w-8 text-primary/30 absolute" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-sm">
                            <div className="text-center">
                              <div className="text-sm font-bold text-primary">4.2%</div>
                              <div className="text-[8px] text-gray-500">Net</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-1 md:bottom-4 right-1 md:right-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/80 shadow-sm h-5 w-5 md:h-8 md:w-8">
                  <Maximize2 className="h-2.5 w-2.5 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
          <div className="text-center mt-2 text-[10px] md:text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
            L'interface ci-dessus est un exemple à titre illustratif. Essayez le calculateur pour des résultats personnalisés.
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto mt-8 md:mt-12 animate-fade-in px-2 sm:px-0" style={{ animationDelay: "400ms" }}>
          <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <Calculator className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">Calcul précis</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Obtenez des calculs de rentabilité précis basés sur tous les paramètres pertinents de votre investissement.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <BarChart4 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">Analyse complète</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Analysez en détail tous les aspects financiers de votre bien : revenus, charges, cash-flow et plus encore.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
              <PieChart className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">Comparaison visuelle</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Comparez facilement différents scénarios d'investissement grâce à des visualisations claires et intuitives.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

