
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyForm from '@/components/calculator/PropertyForm';
import ResultsCard from '@/components/calculator/ResultsCard';
import ComparisonChart from '@/components/calculator/ComparisonChart';
import { PropertyData, PropertyResults } from '@/types/property';
import { calculateResults, calculateAirbnbResults, calculateLongTermResults } from '@/lib/calculations';
import { Calculator as CalculatorIcon, MapPin, Lock, AlertTriangle, Info as InfoIcon, CheckCircle } from 'lucide-react';
import { hasReachedUsageLimit, trackCalculatorUsage, getRemainingCalculations, isSubscribed } from '@/lib/usageTracker';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Calculator = () => {
  const [results, setResults] = useState<PropertyResults | null>(null);
  const [longTermResults, setLongTermResults] = useState<PropertyResults | null>(null);
  const [airbnbResults, setAirbnbResults] = useState<PropertyResults | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [remainingCalculations, setRemainingCalculations] = useState<number>(0);
  const [limitReached, setLimitReached] = useState<boolean>(false);
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
        description: "Vous avez atteint votre limite de 1 calcul gratuit. Passez à l'offre Pro pour des calculs illimités.",
        variant: "destructive",
      });
      
      // Redirect to pricing page after a short delay
      setTimeout(() => {
        navigate('/pricing');
      }, 2000);
    }
    
    // Update remaining calculations
    setRemainingCalculations(getRemainingCalculations());
  }, [toast, navigate]);

  const handleCalculate = (data: PropertyData) => {
    // Vérifier à nouveau la limite au moment de calculer
    if (hasReachedUsageLimit() && !isSubscribed()) {
      setLimitReached(true);
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de 1 calcul gratuit. Passez à l'offre Pro pour des calculs illimités.",
        variant: "destructive",
      });
      
      // Redirect to pricing page after a short delay
      setTimeout(() => {
        navigate('/pricing');
      }, 2000);
      
      return;
    }
    
    // Track this calculation if not subscribed
    trackCalculatorUsage();
    
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
    
    // Faire défiler jusqu'aux résultats
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Si c'est le dernier calcul gratuit, informer l'utilisateur et rediriger après un court délai
    if (remaining === 0 && !isSubscribed()) {
      toast({
        title: "Dernier calcul gratuit",
        description: "Vous venez d'utiliser votre calcul gratuit. Passez à l'offre Pro pour des calculs illimités.",
        variant: "default",
      });
      
      // Rediriger vers la page de tarifs après un court délai pour permettre à l'utilisateur de voir les résultats
      setTimeout(() => {
        navigate('/pricing');
      }, 8000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <CalculatorIcon className="h-4 w-4 mr-2" />
                <span>Calculateur de rentabilité</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Analysez la rentabilité de votre bien immobilier
              </h1>
              
              <p className="text-gray-300">
                Complétez les informations ci-dessous pour obtenir une analyse détaillée de votre investissement.
              </p>
              
              {/* Display remaining calculations or subscription badge */}
              <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
                {isSubscribed() ? (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Calculs illimités (Abonnement actif)</span>
                  </div>
                ) : (
                  <div className={`${limitReached ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'} px-4 py-2 rounded-full flex items-center`}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>
                      {limitReached 
                        ? "Limite atteinte - Passez à l'offre Pro" 
                        : `Il vous reste ${remainingCalculations} calcul gratuit`}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {limitReached ? (
              <Card className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-sm border border-gray-800 p-6 md:p-8 text-center">
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Limite de calculs atteinte</h2>
                  <p className="text-gray-300 mb-4 max-w-md">
                    Vous avez utilisé votre calcul gratuit pour ce mois-ci. Passez à l'offre Pro pour des calculs illimités.
                  </p>
                  <Button 
                    onClick={() => navigate('/pricing')}
                    className="px-8"
                  >
                    Voir les offres
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-sm border border-gray-800 p-6 md:p-8">
                <PropertyForm onCalculate={handleCalculate} />
              </div>
            )}
          </div>
        </section>
        
        {results && longTermResults && airbnbResults && (
          <section id="results" className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
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
                <ResultsCard results={results} />
                
                <ComparisonChart 
                  longTerm={longTermResults} 
                  airbnb={airbnbResults} 
                />
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
