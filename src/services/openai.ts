
import { toast } from "sonner";

interface OpenAIApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface CityPriceUpdate {
  pricePerSqm: number;
  pricePerSqmTrend: number;
  averageYield: number;
  averageYieldTrend: number;
  monthlyTrends: Array<{
    month: string;
    pricePerSqm: number;
    pricePerSqmTrend: number;
    averageYield: number;
    averageYieldTrend: number;
  }>;
}

export class OpenAIService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  private static CITIES_DATA_KEY = 'french_cities_data';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static getCachedCityData(cityName: string): CityPriceUpdate | null {
    const citiesData = this.getAllCachedCitiesData();
    return citiesData[cityName] || null;
  }

  static getAllCachedCitiesData(): Record<string, CityPriceUpdate> {
    const citiesDataString = localStorage.getItem(this.CITIES_DATA_KEY);
    return citiesDataString ? JSON.parse(citiesDataString) : {};
  }

  static saveCityData(cityName: string, data: CityPriceUpdate): void {
    const citiesData = this.getAllCachedCitiesData();
    citiesData[cityName] = data;
    localStorage.setItem(this.CITIES_DATA_KEY, JSON.stringify(citiesData));
  }

  static async updateCityPrices(cityName: string): Promise<CityPriceUpdate | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      toast.error("Clé API OpenAI manquante. Veuillez configurer votre clé API.");
      return null;
    }

    // Check if we already have cached data for this city
    const cachedData = this.getCachedCityData(cityName);
    if (cachedData) {
      // Check if the data is from today
      const today = new Date().toLocaleDateString('fr-FR');
      if (localStorage.getItem(`city_${cityName}_date`) === today) {
        console.log(`Using cached data for ${cityName}`);
        return cachedData;
      }
    }

    try {
      const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
      const previousMonths = this.getPreviousMonths(5);
      
      const prompt = `
        En tant qu'expert immobilier, génère des données réalistes sur l'évolution du marché immobilier à ${cityName}, France pour les 6 derniers mois (${[...previousMonths, currentMonth].join(', ')}).
        
        Pour chaque mois, fournis:
        1. Le prix moyen au m² (entre 2500€ et 12000€ selon la ville)
        2. L'évolution mensuelle du prix au m² (entre -1% et +2%)
        3. Le rendement locatif moyen (entre 3% et 7%)
        4. L'évolution du rendement (entre -0.5% et +0.5%)
        
        Retourne uniquement un objet JSON avec cette structure:
        {
          "pricePerSqm": nombre,
          "pricePerSqmTrend": nombre,
          "averageYield": nombre,
          "averageYieldTrend": nombre,
          "monthlyTrends": [
            { "month": "mois", "pricePerSqm": nombre, "pricePerSqmTrend": nombre, "averageYield": nombre, "averageYieldTrend": nombre },
            ...
          ]
        }
        
        Les valeurs doivent être cohérentes et réalistes pour ${cityName}.
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Tu es un expert en immobilier qui fournit des données précises et réalistes sur le marché immobilier français.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.5
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        toast.error(`Erreur lors de la mise à jour des données: ${errorData.error?.message || 'Erreur inconnue'}`);
        return null;
      }

      const data = await response.json() as OpenAIApiResponse;
      const contentString = data.choices[0]?.message?.content;
      
      if (!contentString) {
        throw new Error('Réponse invalide de l\'API');
      }
      
      // Extraction du JSON de la réponse
      const jsonMatch = contentString.match(/```json\n([\s\S]*?)\n```/) || 
                         contentString.match(/{[\s\S]*?}/);
                         
      const jsonString = jsonMatch ? jsonMatch[0].replace(/```json\n|```/g, '') : contentString;
      
      try {
        const cityData = JSON.parse(jsonString) as CityPriceUpdate;
        toast.success(`Données de ${cityName} mises à jour avec succès`);
        
        // Save to cache with timestamp
        this.saveCityData(cityName, cityData);
        localStorage.setItem(`city_${cityName}_date`, new Date().toLocaleDateString('fr-FR'));
        
        return cityData;
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError, 'Raw content:', contentString);
        toast.error('Erreur lors de l\'analyse des données reçues');
        return null;
      }
    } catch (error) {
      console.error('Error updating city prices:', error);
      toast.error('Erreur lors de la connexion à l\'API OpenAI');
      return null;
    }
  }

  private static getPreviousMonths(count: number): string[] {
    const months = [];
    const now = new Date();
    
    for (let i = 1; i <= count; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(month.toLocaleString('fr-FR', { month: 'long' }));
    }
    
    return months.reverse();
  }
}
