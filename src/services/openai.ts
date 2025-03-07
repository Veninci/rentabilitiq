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

// Données de référence pour les prix au m² de certaines villes françaises
const CITY_PRICE_REFERENCES: Record<string, number> = {
  "Paris": 11500,
  "Lyon": 5400,
  "Marseille": 3200,
  "Bordeaux": 4950,
  "Lille": 3700,
  "Toulouse": 3800,
  "Nice": 4900,
  "Nantes": 4200,
  "Strasbourg": 3450,
  "Montpellier": 3600,
  "Rennes": 3500,
  "Grenoble": 3100,
  "Toulon": 2900,
  "Dijon": 2500,
  "Angers": 2700,
  "Le Mans": 2100,
  "Reims": 2300,
  "Saint-Étienne": 1700,
  "Aix-en-Provence": 4800,
  "Brest": 2300,
  "Le Havre": 2100,
  "Clermont-Ferrand": 2200,
  "Tours": 2700,
  "Limoges": 1800,
  "Amiens": 2100,
  // Grandes villes supplémentaires
  "Metz": 2300,
  "Perpignan": 2400,
  "Besançon": 2200,
  "Orléans": 2600,
  "Rouen": 2500,
  "Caen": 2400,
  "Nancy": 2300,
  "Mulhouse": 1900,
  "Avignon": 2700,
  "La Rochelle": 4200,
  "Cannes": 5800,
  "Antibes": 5200,
  "Saint-Denis": 3000,
  "Versailles": 7500,
  "Courbevoie": 8200,
  "Neuilly-sur-Seine": 11000,
  "Saint-Germain-en-Laye": 6800,
  "Boulogne-Billancourt": 9500,
  "Issy-les-Moulineaux": 8700,
  "Levallois-Perret": 10300,
};

export class OpenAIService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  private static CITIES_DATA_KEY = 'french_cities_data';
  private static CITIES_DATA_TIMESTAMP_KEY = 'french_cities_data_timestamp';
  private static DATA_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes

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
    
    // Save timestamp for this city
    const timestamps = this.getCityTimestamps();
    timestamps[cityName] = new Date().getTime();
    localStorage.setItem(this.CITIES_DATA_TIMESTAMP_KEY, JSON.stringify(timestamps));
  }
  
  static getCityTimestamps(): Record<string, number> {
    const timestampsString = localStorage.getItem(this.CITIES_DATA_TIMESTAMP_KEY);
    return timestampsString ? JSON.parse(timestampsString) : {};
  }
  
  static isCityDataExpired(cityName: string): boolean {
    const timestamps = this.getCityTimestamps();
    const timestamp = timestamps[cityName];
    
    if (!timestamp) {
      return true;
    }
    
    const now = new Date().getTime();
    return now - timestamp > this.DATA_EXPIRY_TIME;
  }

  // Obtenir le prix de référence pour une ville
  private static getReferencePriceForCity(cityName: string): number {
    // Utiliser le prix de référence s'il existe, sinon estimer selon la taille de la ville
    const normalizedCityName = this.normalizeCity(cityName);
    
    for (const [referenceCity, price] of Object.entries(CITY_PRICE_REFERENCES)) {
      if (this.normalizeCity(referenceCity) === normalizedCityName) {
        return price;
      }
    }
    
    // Prix par défaut basé sur le nom de la ville
    // Plus le nom est long, plus la ville est probablement petite (heuristique simple)
    const basePrice = cityName.length > 10 ? 2000 : 3000;
    
    // Ajout d'une variabilité aléatoire mais déterministe basée sur le nom de la ville
    const seed = cityName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const priceVariation = (seed % 1500) - 750; // Variation entre -750 et +750
    
    return basePrice + priceVariation;
  }
  
  // Normaliser le nom de la ville pour une comparaison plus robuste
  private static normalizeCity(cityName: string): string {
    return cityName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
      .replace(/[^a-z]/g, ""); // Conserver uniquement les lettres
  }

  static async updateCityPrices(cityName: string): Promise<CityPriceUpdate | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      toast.error("Clé API OpenAI manquante. Veuillez configurer votre clé API.");
      return null;
    }

    // Check if we already have cached data for this city
    const cachedData = this.getCachedCityData(cityName);
    if (cachedData && !this.isCityDataExpired(cityName)) {
      console.log(`Using cached data for ${cityName}`);
      return cachedData;
    }

    try {
      const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
      const previousMonths = this.getPreviousMonths(5);
      
      // Obtenir le prix de référence pour cette ville
      const referencePrice = this.getReferencePriceForCity(cityName);
      
      const prompt = `
        En tant qu'expert immobilier, génère des données réalistes sur l'évolution du marché immobilier à ${cityName}, France pour les 6 derniers mois (${[...previousMonths, currentMonth].join(', ')}).
        
        Pour cette ville, le prix moyen au m² est d'environ ${referencePrice}€.
        
        Pour chaque mois, fournis:
        1. Le prix moyen au m² (environ ${referencePrice - 200}€ à ${referencePrice + 200}€)
        2. L'évolution mensuelle du prix au m² (entre -1% et +2%)
        3. Le rendement locatif moyen (entre 3% et 7%, inversement proportionnel au prix au m²)
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

      console.log(`Requesting data for ${cityName} with reference price ${referencePrice}€`);
      
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
