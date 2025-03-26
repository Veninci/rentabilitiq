
import { toast } from "@/hooks/use-toast";

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAICompletionResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }[];
}

// Clé API par défaut (à remplacer par une clé valide)
// Note: Idéalement, cela devrait être géré côté serveur
const DEFAULT_API_KEY = "";

/**
 * Service pour faire des appels à l'API LLM.
 */
export class OpenAIService {
  private apiKey: string;

  /**
   * Crée une nouvelle instance du service.
   * @param apiKey Clé API personnalisée (utilisera la clé par défaut si non fournie)
   */
  constructor(apiKey?: string) {
    // Utiliser la clé fournie ou celle stockée dans localStorage ou la clé par défaut
    this.apiKey = apiKey || localStorage.getItem('openai_api_key') || DEFAULT_API_KEY;
  }

  /**
   * Définit une nouvelle clé API et la sauvegarde dans localStorage
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    localStorage.setItem('openai_api_key', apiKey);
  }

  /**
   * Vérifie si une clé API est définie
   */
  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  /**
   * Envoie une requête de complétion à l'API.
   * @param messages Les messages à inclure dans la requête
   * @param model Le modèle à utiliser (par défaut: gpt-4o)
   * @returns Le texte généré
   */
  async getCompletion(
    messages: OpenAIMessage[],
    model: string = 'gpt-4o'
  ): Promise<string> {
    if (!this.hasApiKey()) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez saisir votre clé API OpenAI dans les paramètres.",
        variant: "destructive",
      });
      return "Veuillez configurer votre clé API OpenAI pour utiliser cette fonctionnalité.";
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Erreur lors de l'appel à l'API");
      }

      const data: OpenAICompletionResponse = await response.json();
      return data.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("Erreur API:", error);
      toast({
        title: "Erreur",
        description: `Erreur lors de la communication avec l'IA: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        variant: "destructive",
      });
      return "Désolé, une erreur est survenue lors de la communication avec l'IA.";
    }
  }
}

// Créer une instance du service
export const openAIService = new OpenAIService();

// Pour des raisons de compatibilité avec le code existant
export const createOpenAIService = (apiKey?: string): OpenAIService => {
  return new OpenAIService(apiKey);
};

// Pour des raisons de compatibilité avec le code existant
export const getStoredApiKey = (): string => {
  return localStorage.getItem('openai_api_key') || DEFAULT_API_KEY;
};
