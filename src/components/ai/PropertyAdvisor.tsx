
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, Sparkles, Clock, Star, Key, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { openAIService } from "@/lib/openai-service";
import { PropertyData, PropertyResults } from "@/types/property";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PropertyAdvisorProps {
  propertyData?: PropertyData | null;
  results?: PropertyResults | null;
}

const PropertyAdvisor: React.FC<PropertyAdvisorProps> = ({ propertyData, results }) => {
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("advice");
  const [apiKey, setApiKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);

  // Charger la clé API depuis localStorage au chargement du composant
  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      openAIService.setApiKey(apiKey.trim());
      toast({
        title: "Clé API sauvegardée",
        description: "Votre clé API a été enregistrée avec succès.",
        variant: "default"
      });
      setShowKeyInput(false);
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une clé API valide.",
        variant: "destructive"
      });
    }
  };

  const getInvestmentAdvice = async () => {
    if (!propertyData || !results) {
      setAiResponse("Veuillez d'abord calculer les résultats d'un investissement.");
      return;
    }

    setIsLoading(true);

    try {
      const propertyInfo = {
        achat: {
          prix: propertyData.purchasePrice,
          renovation: propertyData.renovationCost,
          fraisNotaire: propertyData.notaryFees,
          autresCoûts: propertyData.otherCosts,
          superficie: propertyData.propertySize,
        },
        financement: {
          apport: propertyData.downPayment,
          emprunt: propertyData.loanAmount,
          tauxInteret: propertyData.interestRate,
          dureeEmprunt: propertyData.loanTerm,
        },
        location: {
          type: propertyData.rentalType,
          loyerMensuel: propertyData.monthlyRent,
          tarifNuitAirbnb: propertyData.airbnbNightlyRate,
          tauxOccupationAirbnb: propertyData.airbnbOccupancyRate,
          fraisGestion: propertyData.managementFees,
          ville: propertyData.city,
        },
        charges: {
          taxeFonciere: propertyData.propertyTax,
          assurance: propertyData.insurance,
          chargesCopropriete: propertyData.condoFees,
          entretien: propertyData.maintenanceCost,
          autresDepenses: propertyData.otherExpenses,
        },
        resultats: {
          investissementTotal: results.totalInvestment,
          revenusAnnuels: results.annualIncome,
          depensesAnnuelles: results.annualExpenses,
          cashflowAnnuel: results.annualCashFlow,
          cashflowMensuel: results.monthlyCashFlow,
          rendementBrut: results.grossYield,
          rendementNet: results.netYield,
          dureeRetourInvestissement: results.paybackPeriod,
          mensualiteCredit: results.monthlyMortgage,
          prixAuM2: results.pricePerSqm,
          loyerAuM2: results.rentPerSqm,
        }
      };

      const messages = [
        {
          role: "system" as const,
          content: `Vous êtes un conseiller immobilier expert spécialisé dans l'analyse de rentabilité pour les investisseurs français. 
          Vous devez analyser les données fournies et donner des conseils pertinents, précis et utiles. 
          Utilisez des faits, des chiffres et des analyses concrètes basées sur les données fournies. 
          Structurez votre réponse avec des titres et des points clés. 
          Soyez direct, professionnel et utile. Ne donnez pas de conseils génériques.`
        },
        {
          role: "user" as const,
          content: `Voici les données d'un investissement immobilier que j'envisage. 
          Pouvez-vous analyser sa rentabilité et me donner des conseils personnalisés ? 
          ${JSON.stringify(propertyInfo, null, 2)}`
        }
      ];

      const response = await openAIService.getCompletion(messages);
      setAiResponse(response);
    } catch (error) {
      console.error("Error getting AI advice:", error);
      setAiResponse("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);

    try {
      let context = "Question sur l'investissement immobilier";
      
      if (propertyData && results) {
        context = `Contexte: Analyse d'un bien immobilier à ${propertyData.city}, 
          prix ${propertyData.purchasePrice}€, 
          superficie ${propertyData.propertySize}m², 
          rendement brut ${results.grossYield.toFixed(2)}%, 
          rendement net ${results.netYield.toFixed(2)}%, 
          cashflow mensuel ${results.monthlyCashFlow.toFixed(2)}€.`;
      }

      const messages = [
        {
          role: "system" as const,
          content: `Vous êtes un expert en investissement immobilier locatif en France. 
          Répondez de manière concise, factuelle et utile aux questions sur l'immobilier, 
          la fiscalité immobilière, les stratégies d'investissement, et la gestion locative.`
        },
        {
          role: "user" as const,
          content: `${context}\n\nMa question: ${question}`
        }
      ];

      const response = await openAIService.getCompletion(messages);
      setAiResponse(response);
    } catch (error) {
      console.error("Error asking question:", error);
      setAiResponse("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasApiKey = openAIService.hasApiKey();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Assistant IA pour investisseurs
        </CardTitle>
        <CardDescription>
          Obtenez des conseils personnalisés et posez vos questions sur votre investissement
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasApiKey && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 flex items-center">
            <div className="flex-1">
              Vous devez configurer votre clé API OpenAI pour utiliser cette fonctionnalité.
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowKeyInput(true)}
              className="ml-2"
            >
              <Key className="mr-2 h-4 w-4" />
              Configurer
            </Button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="advice" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Analyse personnalisée</span>
            </TabsTrigger>
            <TabsTrigger value="question" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Poser une question</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advice">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span>Analyse IA de votre investissement</span>
                </div>
                {propertyData && results ? (
                  <Button 
                    size="sm" 
                    onClick={getInvestmentAdvice} 
                    disabled={isLoading || !hasApiKey}
                  >
                    {isLoading ? 
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Analyse en cours...
                      </> : 
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyser mon investissement
                      </>
                    }
                  </Button>
                ) : (
                  <div className="text-sm text-amber-600">
                    Calculez d'abord les résultats d'un investissement
                  </div>
                )}
              </div>
              
              {aiResponse && (
                <div className="rounded-md border p-4 bg-muted/30 whitespace-pre-line">
                  {aiResponse}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="question">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Textarea
                  placeholder="Posez votre question sur l'investissement immobilier..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                />
                <Button 
                  onClick={askQuestion} 
                  disabled={isLoading || !question.trim() || !hasApiKey}
                  className="self-end"
                >
                  {isLoading ? 
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Réponse en cours...
                    </> : 
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Poser ma question
                    </>
                  }
                </Button>
              </div>
              
              {aiResponse && (
                <div className="rounded-md border p-4 bg-muted/30 whitespace-pre-line">
                  {aiResponse}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog pour configurer la clé API */}
        <Dialog open={showKeyInput} onOpenChange={setShowKeyInput}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Configurer votre clé API OpenAI</DialogTitle>
              <DialogDescription>
                Entrez votre clé API OpenAI pour utiliser les fonctionnalités d'intelligence artificielle.
                Vous pouvez obtenir une clé sur <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">platform.openai.com</a>.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 py-4">
              <div className="grid flex-1 gap-2">
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  La clé est stockée uniquement dans votre navigateur et n'est jamais partagée.
                </p>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveApiKey}>
                <Key className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <span>Alimenté par GPT-4o</span>
      </CardFooter>
    </Card>
  );
};

export default PropertyAdvisor;
