
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

/**
 * Service for making OpenAI API calls.
 * Note: In a production environment, API keys should be stored securely on the backend.
 */
export class OpenAIService {
  private apiKey: string;

  /**
   * Creates a new OpenAI service instance.
   * @param apiKey Your OpenAI API key
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
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

// Create a basic component to collect API key
export const createOpenAIService = (apiKey: string): OpenAIService => {
  // Store API key temporarily in session storage
  sessionStorage.setItem("openai_api_key", apiKey);
  return new OpenAIService(apiKey);
};

// Get the stored API key if it exists
export const getStoredApiKey = (): string | null => {
  return sessionStorage.getItem("openai_api_key");
};
