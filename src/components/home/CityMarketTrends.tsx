
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { formatter } from '@/lib/formatter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CityData {
  name: string;
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
  yearlyTrends: Array<{
    year: string;
    pricePerSqm: number;
    averageYield: number;
  }>;
}

const cityData: Record<string, CityData> = {
  "Paris": {
    name: "Paris",
    pricePerSqm: 11250,
    pricePerSqmTrend: 2.1,
    averageYield: 3.8,
    averageYieldTrend: -0.3,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 11050, pricePerSqmTrend: 0.8, averageYield: 3.9, averageYieldTrend: -0.1 },
      { month: "Février", pricePerSqm: 11100, pricePerSqmTrend: 0.5, averageYield: 3.9, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 11150, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: -0.1 },
      { month: "Avril", pricePerSqm: 11200, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: 0 },
      { month: "Mai", pricePerSqm: 11250, pricePerSqmTrend: 0.4, averageYield: 3.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 11250, pricePerSqmTrend: 0, averageYield: 3.8, averageYieldTrend: 0 }
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 9800, averageYield: 4.2 },
      { year: "2020", pricePerSqm: 10200, averageYield: 4.0 },
      { year: "2021", pricePerSqm: 10600, averageYield: 3.9 },
      { year: "2022", pricePerSqm: 10900, averageYield: 3.8 },
      { year: "2023", pricePerSqm: 11250, averageYield: 3.8 }
    ]
  },
  "Lyon": {
    name: "Lyon",
    pricePerSqm: 5380,
    pricePerSqmTrend: 1.8,
    averageYield: 5.1,
    averageYieldTrend: 0.2,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 5250, pricePerSqmTrend: 0.6, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 5280, pricePerSqmTrend: 0.6, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 5320, pricePerSqmTrend: 0.8, averageYield: 5.0, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 5350, pricePerSqmTrend: 0.6, averageYield: 5.1, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 5370, pricePerSqmTrend: 0.4, averageYield: 5.1, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 5380, pricePerSqmTrend: 0.2, averageYield: 5.1, averageYieldTrend: 0 }
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 4600, averageYield: 5.8 },
      { year: "2020", pricePerSqm: 4800, averageYield: 5.6 },
      { year: "2021", pricePerSqm: 5100, averageYield: 5.4 },
      { year: "2022", pricePerSqm: 5250, averageYield: 5.2 },
      { year: "2023", pricePerSqm: 5380, averageYield: 5.1 }
    ]
  },
  "Bordeaux": {
    name: "Bordeaux",
    pricePerSqm: 4950,
    pricePerSqmTrend: -0.3,
    averageYield: 4.8,
    averageYieldTrend: 0.5,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 4980, pricePerSqmTrend: -0.2, averageYield: 4.6, averageYieldTrend: 0.1 },
      { month: "Février", pricePerSqm: 4970, pricePerSqmTrend: -0.2, averageYield: 4.7, averageYieldTrend: 0.2 },
      { month: "Mars", pricePerSqm: 4960, pricePerSqmTrend: -0.2, averageYield: 4.7, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 4955, pricePerSqmTrend: -0.1, averageYield: 4.8, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 4950, pricePerSqmTrend: -0.1, averageYield: 4.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 4950, pricePerSqmTrend: 0, averageYield: 4.8, averageYieldTrend: 0 }
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 4600, averageYield: 4.5 },
      { year: "2020", pricePerSqm: 4800, averageYield: 4.5 },
      { year: "2021", pricePerSqm: 5100, averageYield: 4.4 },
      { year: "2022", pricePerSqm: 5050, averageYield: 4.6 },
      { year: "2023", pricePerSqm: 4950, averageYield: 4.8 }
    ]
  },
  "Marseille": {
    name: "Marseille",
    pricePerSqm: 3180,
    pricePerSqmTrend: 3.2,
    averageYield: 6.5,
    averageYieldTrend: 0.1,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 3080, pricePerSqmTrend: 0.8, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 3100, pricePerSqmTrend: 0.6, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 3130, pricePerSqmTrend: 1.0, averageYield: 6.4, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 3160, pricePerSqmTrend: 1.0, averageYield: 6.5, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 3170, pricePerSqmTrend: 0.3, averageYield: 6.5, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 3180, pricePerSqmTrend: 0.3, averageYield: 6.5, averageYieldTrend: 0 }
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 2600, averageYield: 7.2 },
      { year: "2020", pricePerSqm: 2750, averageYield: 7.0 },
      { year: "2021", pricePerSqm: 2900, averageYield: 6.8 },
      { year: "2022", pricePerSqm: 3080, averageYield: 6.6 },
      { year: "2023", pricePerSqm: 3180, averageYield: 6.5 }
    ]
  },
  "Strasbourg": {
    name: "Strasbourg",
    pricePerSqm: 3450,
    pricePerSqmTrend: 1.5,
    averageYield: 5.8,
    averageYieldTrend: 0.2,
    monthlyTrends: [
      { month: "Janvier", pricePerSqm: 3390, pricePerSqmTrend: 0.3, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Février", pricePerSqm: 3400, pricePerSqmTrend: 0.3, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Mars", pricePerSqm: 3420, pricePerSqmTrend: 0.6, averageYield: 5.7, averageYieldTrend: 0 },
      { month: "Avril", pricePerSqm: 3435, pricePerSqmTrend: 0.4, averageYield: 5.8, averageYieldTrend: 0.1 },
      { month: "Mai", pricePerSqm: 3445, pricePerSqmTrend: 0.3, averageYield: 5.8, averageYieldTrend: 0 },
      { month: "Juin", pricePerSqm: 3450, pricePerSqmTrend: 0.1, averageYield: 5.8, averageYieldTrend: 0 }
    ],
    yearlyTrends: [
      { year: "2019", pricePerSqm: 3100, averageYield: 6.3 },
      { year: "2020", pricePerSqm: 3200, averageYield: 6.1 },
      { year: "2021", pricePerSqm: 3300, averageYield: 6.0 },
      { year: "2022", pricePerSqm: 3400, averageYield: 5.9 },
      { year: "2023", pricePerSqm: 3450, averageYield: 5.8 }
    ]
  }
};

const CityMarketTrends: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Paris");
  const [customCity, setCustomCity] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("yearly");
  
  const city = cityData[selectedCity] || cityData["Paris"];

  const handleCityChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setSelectedCity(value);
    }
  };

  const handleCustomCitySubmit = () => {
    if (customCity.trim()) {
      // In a real application, we would fetch data for this city
      // For now, we'll just show a message that the city isn't in our database
      alert(`Désolé, nous n'avons pas encore de données pour ${customCity}. Nous travaillons à élargir notre base de données.`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">Détails</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4">Évolution du marché immobilier</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="city-select">Ville</Label>
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paris">Paris</SelectItem>
                  <SelectItem value="Lyon">Lyon</SelectItem>
                  <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                  <SelectItem value="Marseille">Marseille</SelectItem>
                  <SelectItem value="Strasbourg">Strasbourg</SelectItem>
                  <SelectItem value="custom">Autre ville...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {showCustomInput && (
              <div className="space-y-2">
                <Label htmlFor="custom-city">Nom de la ville</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="custom-city" 
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="ex: Nantes"
                  />
                  <Button onClick={handleCustomCitySubmit}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Prix moyen au m²</div>
              <div className="text-xl font-semibold">{formatter.formatCurrency(city.pricePerSqm)}</div>
              <div className={`text-sm flex items-center mt-1 ${city.pricePerSqmTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {city.pricePerSqmTrend >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {city.pricePerSqmTrend >= 0 ? '+' : ''}{city.pricePerSqmTrend}% ce mois
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Rendement moyen</div>
              <div className="text-xl font-semibold">{city.averageYield}%</div>
              <div className={`text-sm flex items-center mt-1 ${city.averageYieldTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {city.averageYieldTrend >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {city.averageYieldTrend >= 0 ? '+' : ''}{city.averageYieldTrend}% ce mois
              </div>
            </div>
          </div>
          
          {/* Graph for 5-year trends */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">Évolution sur 5 ans - {city.name}</h3>
              <div className="flex space-x-2">
                <Button 
                  variant={activeTab === "yearly" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveTab("yearly")}
                >
                  Annuelle
                </Button>
                <Button 
                  variant={activeTab === "monthly" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveTab("monthly")}
                >
                  Mensuelle
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activeTab === "yearly" ? city.yearlyTrends : city.monthlyTrends}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={activeTab === "yearly" ? "year" : "month"} 
                    tick={{ fontSize: 12 }} 
                  />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    tickFormatter={(value) => `${formatter.formatCurrency(value, false)}`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === "Prix au m²") return formatter.formatCurrency(Number(value));
                      if (name === "Rendement") return `${value}%`;
                      return value;
                    }}
                    labelFormatter={(label) => activeTab === "yearly" ? `Année: ${label}` : `Mois: ${label}`}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="pricePerSqm" 
                    name="Prix au m²" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="averageYield" 
                    name="Rendement" 
                    stroke="#82ca9d" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Monthly data table */}
          {activeTab === "monthly" && (
            <div className="space-y-4">
              <h3 className="text-md font-medium">Données mensuelles - {city.name}</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Mois</th>
                      <th className="text-right py-2 px-2">Prix au m²</th>
                      <th className="text-right py-2 px-2">Évolution</th>
                      <th className="text-right py-2 px-2">Rendement</th>
                      <th className="text-right py-2 px-2">Évolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {city.monthlyTrends.map((month, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 px-2">{month.month}</td>
                        <td className="text-right py-2 px-2">{formatter.formatCurrency(month.pricePerSqm)}</td>
                        <td className={`text-right py-2 px-2 ${month.pricePerSqmTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {month.pricePerSqmTrend >= 0 ? '+' : ''}{month.pricePerSqmTrend}%
                        </td>
                        <td className="text-right py-2 px-2">{month.averageYield}%</td>
                        <td className={`text-right py-2 px-2 ${month.averageYieldTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {month.averageYieldTrend >= 0 ? '+' : ''}{month.averageYieldTrend}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Yearly data table */}
          {activeTab === "yearly" && (
            <div className="space-y-4">
              <h3 className="text-md font-medium">Données annuelles - {city.name}</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Année</th>
                      <th className="text-right py-2 px-2">Prix au m²</th>
                      <th className="text-right py-2 px-2">Rendement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {city.yearlyTrends.map((year, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 px-2">{year.year}</td>
                        <td className="text-right py-2 px-2">{formatter.formatCurrency(year.pricePerSqm)}</td>
                        <td className="text-right py-2 px-2">{year.averageYield}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            <p>Données mises à jour au 1er juin 2023. Les prix et rendements affichés sont des moyennes et peuvent varier selon les quartiers et les caractéristiques des biens.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CityMarketTrends;
