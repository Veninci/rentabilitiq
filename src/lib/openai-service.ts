
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

// Clé API fournie par l'utilisateur
const API_KEY = "sk-31d578b31967472cb42defd49ea1e55e";

/**
 * Service pour faire des appels à l'API LLM.
 */
export class OpenAIService {
  private apiKey: string;

  /**
   * Crée une nouvelle instance du service.
   */
  constructor() {
    this.apiKey = API_KEY;
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

// Créer une instance du service avec la clé API
export const openAIService = new OpenAIService();

// Pour des raisons de compatibilité avec le code existant
export const createOpenAIService = (): OpenAIService => {
  return new OpenAIService();
};

// Pour des raisons de compatibilité avec le code existant
export const getStoredApiKey = (): string => {
  return API_KEY;
};
