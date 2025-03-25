
import React, { useState } from 'react';
import { ArrowRight, BarChart4, PieChart, Calculator, Maximize2, Home, Building, Wallet, TrendingUp, Landmark, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { MagneticButton } from '@/components/ui/magnetic-button';

const Hero = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  return <section className="relative pt-20 md:pt-32 pb-10 md:pb-24 overflow-hidden px-4 md:px-0">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      {/* Decorative circle */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 md:mb-6 animate-fade-in -mt-3 md:mt-0">
            <span>Solution innovante pour investisseurs immobiliers</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight animate-slide-up" style={{
          lineHeight: 1.1
        }}>
            Optimisez la rentabilité de vos investissements immobiliers
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 animate-slide-up" style={{
          animationDelay: "100ms"
        }}>
            Calculez, analysez et comparez la rentabilité de vos biens locatifs en quelques clics.
            Une solution complète pour prendre des décisions éclairées.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{
          animationDelay: "200ms"
        }}>
            <MagneticButton>
              <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-6 py-6 text-base">
                <Link to="/calculator">
                  Essayer le calculateur
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-6 py-6 text-base">
              <Link to="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="relative mt-8 md:mt-10 mb-6 md:mb-8 animate-blur-in" style={{
        animationDelay: "300ms"
      }}>
          <GlassCard className="mx-auto max-w-6xl overflow-hidden">
            <div className="relative aspect-[16/10] md:aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden dark:from-gray-900 dark:to-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Interface mockup */}
                <div className="w-full h-full p-3 md:p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <div className="bg-primary/10 h-8 w-8 md:h-12 md:w-12 rounded-lg flex items-center justify-center">
                        <Calculator className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                      </div>
                      <div className="text-sm md:text-xl font-medium text-foreground">Calculateur de rentabilité</div>
                    </div>
                    <div className="bg-amber-100 text-amber-700 text-xs md:text-sm font-medium py-1 px-2 md:px-3 rounded-full">
                      Exemple
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 flex-grow">
                    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm p-3 md:p-5 flex flex-col dark:bg-gray-800 dark:text-foreground">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="text-xs md:text-base font-medium flex items-center">
                          <Settings className="h-3 w-3 md:h-5 md:w-5 mr-1 md:mr-2 text-primary" /> 
                          <span className="hidden md:inline">Paramètres du bien</span>
                        </div>
                        <div className="hidden md:flex space-x-1 md:space-x-2">
                          <div className="px-1.5 md:px-2.5 py-0.5 md:py-1.5 bg-primary/10 rounded text-[10px] md:text-sm text-primary font-medium">Appartement</div>
                          <div className="px-1.5 md:px-2.5 py-0.5 md:py-1.5 bg-gray-100 rounded text-[10px] md:text-sm text-gray-500 font-medium dark:bg-gray-700 dark:text-gray-300">Lyon</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4">
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Prix d'achat</div>
                          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">210 000 €</div>
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Surface</div>
                          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">45 m²</div>
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Loyer mensuel</div>
                          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">850 €</div>
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Type de location</div>
                          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">Longue durée</div>
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Apport</div>
                          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">40 000 €</div>
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Taux d'intérêt</div>
                          <div className="h-8 md:h-10 bg-gray-100 rounded-md flex items-center px-3 text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">3.5%</div>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <div className="h-8 md:h-10 w-28 md:w-40 bg-primary rounded-md flex items-center justify-center text-white text-xs md:text-sm font-medium">
                          Calculer
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex bg-white rounded-xl shadow-sm p-4 md:p-5 flex-col dark:bg-gray-800 dark:text-foreground">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-medium mb-2">Dashboard</div>
                      </div>
                      
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg dark:bg-gray-700">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-primary mr-2" />
                            <div className="text-xs text-muted-foreground dark:text-gray-300">Rendement brut</div>
                          </div>
                          <div className="font-medium text-primary">5.8%</div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg dark:bg-gray-700">
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 text-green-500 mr-2" />
                            <div className="text-xs text-muted-foreground dark:text-gray-300">Cash-flow mensuel</div>
                          </div>
                          <div className="font-medium text-green-500">387 €</div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg dark:bg-gray-700">
                          <div className="flex items-center">
                            <Landmark className="h-4 w-4 text-blue-500 mr-2" />
                            <div className="text-xs text-muted-foreground dark:text-gray-300">Mensualité crédit</div>
                          </div>
                          <div className="font-medium text-blue-500">614 €</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 h-28 bg-gray-50 rounded-lg flex items-center justify-center relative dark:bg-gray-700">
                        <PieChart className="h-16 w-16 text-primary/30 absolute" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center shadow-sm dark:bg-gray-800">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">4.2%</div>
                              <div className="text-xs text-gray-500 dark:text-gray-300">Rendement</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white shadow-sm h-6 w-6 md:h-8 md:w-8 transition-all duration-300 dark:bg-gray-800/80 dark:hover:bg-gray-800" onClick={() => setIsCalculatorOpen(true)}>
                        <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Agrandir le calculateur</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </GlassCard>
          <div className="text-center mt-2 text-xs md:text-sm text-muted-foreground animate-fade-in" style={{
          animationDelay: "400ms"
        }}>
            L'interface ci-dessus est un exemple à titre illustratif. Essayez le calculateur pour des résultats personnalisés.
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mt-8 md:mt-12 animate-fade-in px-2 sm:px-0" style={{
        animationDelay: "400ms"
      }}>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-slate-950">Calcul précis</h3>
            <p className="text-muted-foreground text-sm">Obtenez des calculs de rentabilité précis basés sur tous les paramètres pertinents de votre investissement.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center mb-4">
              <BarChart4 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-slate-950">Analyse complète</h3>
            <p className="text-muted-foreground text-sm">Analysez en détail tous les aspects financiers de votre bien : revenus, charges, cash-flow et plus encore.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center mb-4">
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-slate-950">Comparaison visuelle</h3>
            <p className="text-muted-foreground text-sm">Comparez facilement différents scénarios d'investissement grâce à des visualisations claires et intuitives.</p>
          </div>
        </div>
      </div>

      {/* Expanded Calculator Modal */}
      <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[75vw] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <DialogClose className="absolute right-2 top-2 z-10">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white/90">
                <X className="h-4 w-4" />
              </Button>
              <span className="sr-only">Fermer</span>
            </DialogClose>
            
            <GlassCard variant="elevated" className="w-full overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-5">
                      <div className="bg-primary/10 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-xl flex items-center justify-center">
                        <Calculator className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-primary" />
                      </div>
                      <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-medium">Calculateur de rentabilité</div>
                    </div>
                    <div className="bg-amber-100 text-amber-700 text-xs sm:text-sm md:text-base font-medium py-1 px-2 sm:py-1.5 sm:px-3 md:px-4 rounded-full">
                      Exemple
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-5 lg:p-6">
                      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium flex items-center">
                          <Settings className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 mr-1 sm:mr-1.5 md:mr-2 text-primary" /> 
                          <span>Paramètres du bien</span>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2 md:space-x-3">
                          <div className="px-1.5 sm:px-2 md:px-2.5 lg:px-3.5 py-0.5 sm:py-1 md:py-1 lg:py-1.5 bg-primary/10 rounded text-[10px] sm:text-xs md:text-sm lg:text-base text-primary font-medium">Appartement</div>
                          <div className="px-1.5 sm:px-2 md:px-2.5 lg:px-3.5 py-0.5 sm:py-1 md:py-1 lg:py-1.5 bg-gray-100 rounded text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-500 font-medium">Lyon</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm lg:text-base text-gray-500">Prix d'achat</div>
                          <div className="h-7 sm:h-8 md:h-10 lg:h-12 bg-gray-100 rounded-md flex items-center px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">210 000 €</div>
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm lg:text-base text-gray-500">Surface</div>
                          <div className="h-7 sm:h-8 md:h-10 lg:h-12 bg-gray-100 rounded-md flex items-center px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">45 m²</div>
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm lg:text-base text-gray-500">Loyer mensuel</div>
                          <div className="h-7 sm:h-8 md:h-10 lg:h-12 bg-gray-100 rounded-md flex items-center px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">850 €</div>
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm lg:text-base text-gray-500">Type de location</div>
                          <div className="h-7 sm:h-8 md:h-10 lg:h-12 bg-gray-100 rounded-md flex items-center px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">Longue durée</div>
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm lg:text-base text-gray-500">Apport</div>
                          <div className="h-7 sm:h-8 md:h-10 lg:h-12 bg-gray-100 rounded-md flex items-center px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">40 000 €</div>
                        </div>
                        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                          <div className="text-xs md:text-sm lg:text-base text-gray-500">Taux d'intérêt</div>
                          <div className="h-7 sm:h-8 md:h-10 lg:h-12 bg-gray-100 rounded-md flex items-center px-2 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black dark:text-black">3.5%</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="h-7 sm:h-8 md:h-10 lg:h-12 w-28 sm:w-32 md:w-40 lg:w-48 bg-primary rounded-md flex items-center justify-center text-white text-xs sm:text-sm md:text-base font-medium hover:bg-primary/90 transition-colors cursor-pointer">
                          Calculer
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">Dashboard</div>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 flex-grow">
                        <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg">
                          <div className="flex items-center">
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary mr-1.5 sm:mr-2 md:mr-3" />
                            <div className="text-xs md:text-sm lg:text-base text-muted-foreground">Rendement brut</div>
                          </div>
                          <div className="font-medium text-primary text-sm sm:text-base md:text-lg">5.8%</div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg">
                          <div className="flex items-center">
                            <Wallet className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-500 mr-1.5 sm:mr-2 md:mr-3" />
                            <div className="text-xs md:text-sm lg:text-base text-muted-foreground">Cash-flow mensuel</div>
                          </div>
                          <div className="font-medium text-green-500 text-sm sm:text-base md:text-lg">387 €</div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg">
                          <div className="flex items-center">
                            <Landmark className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-500 mr-1.5 sm:mr-2 md:mr-3" />
                            <div className="text-xs md:text-sm lg:text-base text-muted-foreground">Mensualité crédit</div>
                          </div>
                          <div className="font-medium text-blue-500 text-sm sm:text-base md:text-lg">614 €</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 h-24 sm:h-28 md:h-32 lg:h-40 bg-gray-50 rounded-lg flex items-center justify-center relative">
                        <PieChart className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-primary/30 absolute" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-full h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 flex items-center justify-center shadow-md">
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-primary">4.2%</div>
                              <div className="text-xs sm:text-xs md:text-sm text-gray-500">Rendement</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};
export default Hero;
