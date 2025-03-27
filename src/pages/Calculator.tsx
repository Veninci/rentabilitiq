
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyForm from '@/components/calculator/PropertyForm';
import ResultsCard from '@/components/calculator/ResultsCard';
import ComparisonChart from '@/components/calculator/ComparisonChart';
import CalculationHistoryCard from '@/components/calculator/CalculationHistoryCard';
import PropertyAdvisor from '@/components/ai/PropertyAdvisor';
import UsageLimitReached from '@/components/calculator/UsageLimitReached';
import { PropertyData, PropertyResults, CalculationHistory } from '@/types/property';
import { calculateResults, calculateAirbnbResults, calculateLongTermResults } from '@/lib/calculations';
import { MapPin, Lock, AlertTriangle, Info as InfoIcon, CheckCircle, History, Brain } from 'lucide-react';
import { 
  hasReachedUsageLimit, 
  trackCalculatorUsage, 
  getRemainingCalculations, 
  isSubscribed,
  saveCalculationToHistory,
  getCalculationHistory,
  clearCalculationHistory,
  getRemainingPaidCalculations
} from '@/lib/usageTracker';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/ui/Logo';

const Calculator = () => {
  const [results, setResults] = useState<PropertyResults | null>(null);
  const [longTermResults, setLongTermResults] = useState<PropertyResults | null>(null);
  const [airbnbResults, setAirbnbResults] = useState<PropertyResults | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [remainingCalculations, setRemainingCalculations] = useState<number>(0);
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('calculator');
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vérifier le statut d'abonnement et les limites d'utilisation à chaque chargement de page
  useEffect(() => {
    // Check usage limit on component mount
    const usageLimitReached = hasReachedUsageLimit();
    setLimitReached(usageLimitReached && !isSubscribed());
    
    if (usageLimitReached && !isSubscribed()) {
      // Show a toast notification about the limit
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de 1 calcul gratuit. Achetez un calcul à l'unité ou passez à l'offre Pro.",
        variant: "destructive",
      });
    }
    
    // Update remaining calculations
    const paidCalculations = getRemainingPaidCalculations();
    if (paidCalculations > 0) {
      setRemainingCalculations(paidCalculations);
      setLimitReached(false);
    } else {
      setRemainingCalculations(getRemainingCalculations());
    }

    // Load calculation history
    setCalculationHistory(getCalculationHistory());

    // Clean up any timers when component unmounts
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, [toast, navigate]);

  // Effet pour gérer le compte à rebours
  useEffect(() => {
    if (redirectCountdown !== null && redirectCountdown > 0) {
      const interval = setInterval(() => {
        setRedirectCountdown(prev => prev !== null ? prev - 1 : null);
      }, 1000);
      
      return () => clearInterval(interval);
    } else if (redirectCountdown === 0) {
      navigate('/pricing');
    }
  }, [redirectCountdown, navigate]);

  const handleCalculate = (data: PropertyData) => {
    // Vérifier à nouveau la limite au moment de calculer
    if (hasReachedUsageLimit() && !isSubscribed()) {
      setLimitReached(true);
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de calcul. Achetez un calcul à l'unité ou passez à l'offre Pro.",
        variant: "destructive",
      });
      return;
    }
    
    // Store property data
    setPropertyData(data);
    
    // Track this calculation - cette fonction retourne maintenant un boolean indiquant si le calcul a été effectué
    const calculationSuccess = trackCalculatorUsage();
    
    if (!calculationSuccess) {
      setLimitReached(true);
      toast({
        title: "Limite atteinte",
        description: "Vous n'avez plus de calculs disponibles. Achetez un calcul à l'unité ou passez à l'offre Pro.",
        variant: "destructive",
      });
      return;
    }
    
    // Update remaining calculations and limit status
    const remaining = getRemainingCalculations();
    setRemainingCalculations(remaining);
    setLimitReached(remaining <= 0 && !isSubscribed());
    
    // Enregistrer la ville sélectionnée
    setSelectedCity(data.city);
    
    // Calculer les résultats pour le type de location sélectionné
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    
    // Calculer les résultats pour les deux types de location pour la comparaison
    const calculatedLongTermResults = calculateLongTermResults(data);
    setLongTermResults(calculatedLongTermResults);
    
    const calculatedAirbnbResults = calculateAirbnbResults(data);
    setAirbnbResults(calculatedAirbnbResults);
    
    // Save calculation to history
    saveCalculationToHistory(data, calculatedResults, data.city);
    
    // Update history after saving
    setCalculationHistory(getCalculationHistory());
    
    // Faire défiler jusqu'aux résultats
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Annuler tout timer existant
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }

    // Si c'était un calcul payé à l'unité, informer l'utilisateur
    const paidCalculations = getRemainingPaidCalculations();
    if (paidCalculations === 0 && !isSubscribed()) {
      toast({
        title: "Dernier calcul utilisé",
        description: "Vous venez d'utiliser votre dernier calcul payé. Pour en obtenir un nouveau, achetez-le à l'unité pour 5,99€.",
        variant: "default",
      });
    }
  };

  // Fonction pour formater le temps (mm:ss)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle selecting an item from history
  const handleSelectHistory = (item: CalculationHistory) => {
    setPropertyData(item.propertyData);
    setResults(item.results);
    setSelectedCity(item.city);
    
    // Calculate comparison results for the selected history item
    const longTermResults = calculateLongTermResults(item.propertyData);
    setLongTermResults(longTermResults);
    
    const airbnbResults = calculateAirbnbResults(item.propertyData);
    setAirbnbResults(airbnbResults);
    
    // Switch to the calculator tab to show results
    setSelectedTab('calculator');
    
    // Scroll to results after a short delay
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle clearing history
  const handleClearHistory = () => {
    clearCalculationHistory();
    setCalculationHistory([]);
    toast({
      title: "Historique effacé",
      description: "Votre historique de calculs a été effacé avec succès.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-background text-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Logo className="h-4 w-4 mr-2" />
                <span>Calculateur de rentabilité</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Analysez la rentabilité de votre bien immobilier
              </h1>
              
              <p className="text-muted-foreground">
                Complétez les informations ci-dessous pour obtenir une analyse détaillée de votre investissement.
              </p>
              
              {/* Display remaining calculations or subscription badge */}
              <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
                {isSubscribed() ? (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Calculs illimités (Abonnement actif)</span>
                  </div>
                ) : getRemainingPaidCalculations() > 0 ? (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>
                      {`${getRemainingPaidCalculations()} calcul${getRemainingPaidCalculations() > 1 ? 's' : ''} payé${getRemainingPaidCalculations() > 1 ? 's' : ''} disponible${getRemainingPaidCalculations() > 1 ? 's' : ''}`}
                    </span>
                  </div>
                ) : (
                  <div className={`${limitReached ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'} px-4 py-2 rounded-full flex items-center`}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>
                      {limitReached 
                        ? "Limite atteinte - Achetez un calcul à l'unité" 
                        : `Il vous reste ${remainingCalculations} calcul gratuit`}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Afficher le compte à rebours si nécessaire */}
              {redirectCountdown !== null && redirectCountdown > 0 && (
                <div className="mt-2 text-amber-800 font-medium">
                  Redirection vers la page des tarifs dans {formatTime(redirectCountdown)}
                </div>
              )}
            </div>
            
            {/* Tabs for Calculator, History, and AI */}
            <div className="max-w-4xl mx-auto mb-8">
              <Tabs 
                defaultValue="calculator" 
                value={selectedTab} 
                onValueChange={setSelectedTab} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="calculator" className="flex items-center">
                    <CalculatorIcon className="h-4 w-4 mr-2" />
                    <span>Calculateur</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center">
                    <History className="h-4 w-4 mr-2" />
                    <span>Historique ({calculationHistory.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai-advisor" className="flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    <span>Conseiller IA</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="calculator">
                  {limitReached ? (
                    <UsageLimitReached />
                  ) : (
                    <div className="bg-card rounded-2xl shadow-sm border p-6 md:p-8">
                      <PropertyForm onCalculate={handleCalculate} initialData={propertyData} />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="history">
                  <CalculationHistoryCard 
                    history={calculationHistory} 
                    onSelectHistory={handleSelectHistory}
                    onClearHistory={handleClearHistory}
                  />
                </TabsContent>
                
                <TabsContent value="ai-advisor">
                  <PropertyAdvisor propertyData={propertyData} results={results} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {results && longTermResults && airbnbResults && (
          <section id="results" className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Résultats de votre analyse
                </h2>
                
                {selectedCity && (
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <span className="text-lg text-muted-foreground font-medium">
                      {selectedCity}
                    </span>
                  </div>
                )}
                
                <p className="text-muted-foreground">
                  Voici l'analyse détaillée de la rentabilité de votre bien immobilier.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto space-y-8">
                <ResultsCard results={results} cityName={selectedCity} />
                
                <ComparisonChart 
                  longTerm={longTermResults} 
                  airbnb={airbnbResults} 
                />
                
                {/* Add AI Property Advisor in results section if we have results */}
                <PropertyAdvisor propertyData={propertyData} results={results} />
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Calculator;
