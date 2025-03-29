
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

// API key prédéfinie pour tous les utilisateurs
const DEFAULT_API_KEY = "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";

/**
 * Service for making OpenAI API calls.
 */
export class OpenAIService {
  private apiKey: string;

  /**
   * Creates a new OpenAI service instance.
   * @param apiKey Optional custom API key (will use default if not provided)
   */
  constructor(apiKey?: string) {
    this.apiKey = apiKey || DEFAULT_API_KEY;
  }

  /**
   * Sends a completion request to the OpenAI API.
   * @param messages The messages to include in the request
   * @param model The model to use (default: gpt-4o)
   * @returns The generated text
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
        throw new Error(error.error?.message || "Error calling OpenAI API");
      }

      const data: OpenAICompletionResponse = await response.json();
      return data.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("OpenAI API error:", error);
      toast({
        title: "Erreur",
        description: `Erreur lors de la communication avec l'IA: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        variant: "destructive",
      });
      return "Désolé, une erreur est survenue lors de la communication avec l'IA.";
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
  return DEFAULT_API_KEY;
};
