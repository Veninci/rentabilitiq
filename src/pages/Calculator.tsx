
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyForm from '@/components/calculator/PropertyForm';
import ResultsCard from '@/components/calculator/ResultsCard';
import ComparisonChart from '@/components/calculator/ComparisonChart';
import { PropertyData, PropertyResults } from '@/types/property';
import { calculateResults, calculateAirbnbResults, calculateLongTermResults } from '@/lib/calculations';
import { Calculator as CalculatorIcon, MapPin } from 'lucide-react';

const Calculator = () => {
  const [results, setResults] = useState<PropertyResults | null>(null);
  const [longTermResults, setLongTermResults] = useState<PropertyResults | null>(null);
  const [airbnbResults, setAirbnbResults] = useState<PropertyResults | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCalculate = (data: PropertyData) => {
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
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <PropertyForm onCalculate={handleCalculate} />
            </div>
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
