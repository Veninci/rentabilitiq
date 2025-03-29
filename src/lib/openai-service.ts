import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

// Clé API stockée dans Supabase
const OPENAI_API_KEY = "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";

/**
 * Service pour effectuer des appels à l'API OpenAI.
 */
export class OpenAIService {
  private apiKey: string;

  /**
   * Crée une nouvelle instance du service OpenAI.
   * @param apiKey Clé API personnalisée (utilisera celle par défaut si non fournie)
   */
  constructor(apiKey?: string) {
    this.apiKey = apiKey || OPENAI_API_KEY;
  }

  /**
   * Envoie une demande de complétion à l'API OpenAI.
   * @param messages Les messages à inclure dans la demande
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
        throw new Error(error.error?.message || "Erreur lors de l'appel à l'API OpenAI");
      }

      const data: OpenAICompletionResponse = await response.json();
      return data.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("Erreur API OpenAI:", error);
      toast({
        title: "Erreur",
        description: `Erreur lors de la communication avec l'IA: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        variant: "destructive",
      });
      return "Désolé, une erreur est survenue lors de la communication avec l'IA.";
    }
  }

  /**
   * Obtient la clé API depuis Supabase de manière sécurisée (pour une implémentation future)
   * @returns La clé API
   */
  static async getSecureApiKey(): Promise<string> {
    try {
      // Note: Cette fonction sera utilisée ultérieurement pour récupérer la clé depuis Supabase
      // Pour l'instant, nous utilisons la clé par défaut
      return OPENAI_API_KEY;
    } catch (error) {
      console.error("Erreur lors de la récupération de la clé API:", error);
      return OPENAI_API_KEY;
    }
  }
}

// Créer une instance du service avec la clé par défaut
export const openAIService = new OpenAIService();

// Pour des raisons de compatibilité avec le code existant
export const createOpenAIService = (apiKey?: string): OpenAIService => {
  return new OpenAIService(apiKey);
};

// Pour des raisons de compatibilité avec le code existant
export const getStoredApiKey = (): string => {
  return OPENAI_API_KEY;
};
