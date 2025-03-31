
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, Sparkles, Clock, Star, SendHorizontal, Bot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { openAIService } from "@/lib/openai-service";
import { PropertyData, PropertyResults } from "@/types/property";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface PropertyAdvisorProps {
  propertyData?: PropertyData | null;
  results?: PropertyResults | null;
}

const PropertyAdvisor: React.FC<PropertyAdvisorProps> = ({ propertyData, results }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasInitialAnalysis, setHasInitialAnalysis] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initialSystemMessage, setInitialSystemMessage] = useState<string>("");

  // Générer un message d'accueil en fonction des données disponibles
  useEffect(() => {
    if (!propertyData || !results) {
      // Message par défaut quand aucune donnée n'est disponible
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "Bonjour ! Je suis votre conseiller IA en investissement immobilier. Calculez d'abord les résultats d'un investissement, puis je pourrai vous fournir une analyse détaillée et des recommandations pour améliorer sa rentabilité.",
        timestamp: new Date()
      }]);

      setInitialSystemMessage(`Vous êtes un conseiller immobilier expert spécialisé dans l'analyse de rentabilité pour les investisseurs français. 
      Répondez de manière concise, factuelle et utile aux questions sur l'immobilier, 
      la fiscalité immobilière, les stratégies d'investissement, et la gestion locative.`);
    } else if (propertyData && results && !hasInitialAnalysis) {
      // Préparer un message système avec les informations du bien
      const systemPrompt = `Vous êtes un conseiller immobilier expert spécialisé dans l'analyse de rentabilité pour les investisseurs français.
      Analysez les données fournies concernant ce bien à ${propertyData.city}, d'un prix de ${propertyData.purchasePrice}€, 
      avec un rendement brut de ${results.grossYield.toFixed(2)}% et un rendement net de ${results.netYield.toFixed(2)}%.
      Le cashflow mensuel est de ${results.monthlyCashFlow.toFixed(2)}€.
      Soyez direct, professionnel et utile. Ne donnez pas de conseils génériques.`;
      
      setInitialSystemMessage(systemPrompt);
      
      // Ajouter un message d'accueil personnalisé
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Bonjour ! Je suis votre conseiller IA en investissement immobilier. Je vois que vous analysez un bien à ${propertyData.city} avec un prix de ${propertyData.purchasePrice.toLocaleString()}€. Comment puis-je vous aider avec cet investissement ? Vous pouvez me demander une analyse complète ou me poser des questions spécifiques.`,
        timestamp: new Date()
      }]);
    }
  }, [propertyData, results, hasInitialAnalysis]);

  // Faire défiler automatiquement vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Formatage de la date pour l'affichage
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Générer un identifiant unique pour chaque message
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Ajouter le message de l'utilisateur à la liste
    setMessages(prev => [...prev, userMessage]);
    setInputValue(""); // Effacer l'input
    setIsLoading(true);

    try {
      // Préparer les messages pour l'API OpenAI
      const apiMessages = [
        { 
          role: 'system' as const, 
          content: initialSystemMessage 
        },
        ...messages.filter(m => m.role !== 'system').map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        })),
        { 
          role: 'user' as const, 
          content: userMessage.content 
        }
      ];

      // Si on demande une analyse complète et qu'on a des données
      if ((userMessage.content.toLowerCase().includes("analyse") || 
           userMessage.content.toLowerCase().includes("analyser")) && 
          propertyData && results && !hasInitialAnalysis) {
        
        // Préparation des données de propriété pour une analyse plus détaillée
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

        // Remplacer le dernier message par cette demande d'analyse détaillée
        apiMessages[apiMessages.length - 1] = {
          role: 'user' as const,
          content: `Voici les données complètes de l'investissement immobilier. 
          Pouvez-vous analyser sa rentabilité en détail et me donner des conseils personnalisés pour l'améliorer ? 
          Structurez votre réponse avec des titres et des points clés.
          ${JSON.stringify(propertyInfo, null, 2)}`
        };

        setHasInitialAnalysis(true);
      }

      const response = await openAIService.getCompletion(apiMessages);

      // Ajouter la réponse de l'IA
      setMessages(prev => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
      
      // Ajouter un message d'erreur
      setMessages(prev => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: "Désolé, une erreur est survenue lors de la communication avec l'IA. Veuillez réessayer.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Conseiller IA pour investisseurs
        </CardTitle>
        <CardDescription>
          Analysez vos investissements et obtenez des conseils personnalisés
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow overflow-hidden flex flex-col">
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start max-w-[80%] gap-2">
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={16} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <div className="whitespace-pre-line text-sm text-left">{message.content}</div>
                    <div className={`text-xs mt-1 text-right ${
                      message.role === 'user' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                  
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>Vous</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%] gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex items-center gap-2">
                      <span className="animate-pulse">●</span>
                      <span className="animate-pulse delay-150">●</span>
                      <span className="animate-pulse delay-300">●</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 mt-4 items-end">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez une question sur votre investissement..."
            className="resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? 
              <Clock className="h-4 w-4 animate-spin" /> : 
              <SendHorizontal className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Alimenté par GPT-4o</span>
        <Badge variant="outline" className="text-xs">
          {propertyData && results 
            ? `Bien à ${propertyData.city} - ${results.netYield.toFixed(1)}% rendement net` 
            : "Pas de bien analysé"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default PropertyAdvisor;
