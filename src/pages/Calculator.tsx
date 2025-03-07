
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyForm from '@/components/calculator/PropertyForm';
import ResultsCard from '@/components/calculator/ResultsCard';
import ComparisonChart from '@/components/calculator/ComparisonChart';
import { PropertyData, PropertyResults } from '@/types/property';
import { calculateResults, calculateAirbnbResults, calculateLongTermResults } from '@/lib/calculations';
import { Calculator as CalculatorIcon, MapPin, Lock, AlertTriangle } from 'lucide-react';
import { hasReachedUsageLimit, trackCalculatorUsage, getRemainingCalculations } from '@/lib/usageTracker';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Calculator = () => {
  const [results, setResults] = useState<PropertyResults | null>(null);
  const [longTermResults, setLongTermResults] = useState<PropertyResults | null>(null);
  const [airbnbResults, setAirbnbResults] = useState<PropertyResults | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [remainingCalculations, setRemainingCalculations] = useState<number>(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check usage limit on component mount
    const limitReached = hasReachedUsageLimit();
    if (limitReached) {
      // Show a toast and redirect to pricing after a short delay
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de 1 calcul par mois.",
        variant: "destructive",
      });
      
      // Redirect to pricing page after 2 seconds
      const timer = setTimeout(() => {
        navigate('/pricing');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    // Update remaining calculations
    setRemainingCalculations(getRemainingCalculations());
  }, [navigate, toast]);

  const handleCalculate = (data: PropertyData) => {
    // Check if user has reached their limit
    if (hasReachedUsageLimit()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite de 1 calcul par mois. Passez à l'offre Pro pour des calculs illimités.",
        variant: "destructive",
      });
      navigate('/pricing');
      return;
    }
    
    // Track this calculation
    trackCalculatorUsage();
    
    // Update remaining calculations
    setRemainingCalculations(getRemainingCalculations());
    
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <CalculatorIcon className="h-4 w-4 mr-2" />
                <span>Calculateur de rentabilité</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Analysez la rentabilité de votre bien immobilier
              </h1>
              
              <p className="text-muted-foreground">
                Complétez les informations ci-dessous pour obtenir une analyse détaillée de votre investissement.
              </p>
              
              {/* Display remaining calculations badge */}
              <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Il vous reste {remainingCalculations} calcul{remainingCalculations !== 1 ? 's' : ''} ce mois-ci</span>
              </div>
            </div>
            
            {hasReachedUsageLimit() ? (
              <Card className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold">Limite de calculs atteinte</h2>
                  <p className="text-muted-foreground mb-4 max-w-md">
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
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <PropertyForm onCalculate={handleCalculate} />
              </div>
            )}
          </div>
        </section>
        
        {results && longTermResults && airbnbResults && (
          <section id="results" className="py-12 bg-gray-50">
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
