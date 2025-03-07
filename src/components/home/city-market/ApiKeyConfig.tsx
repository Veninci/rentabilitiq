
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKeyConfigProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onSaveApiKey: () => void;
  onUpdateAllCities: () => void;
  isUpdating: boolean;
  hasApiKey: boolean;
}

const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({
  apiKey,
  onApiKeyChange,
  onSaveApiKey,
  onUpdateAllCities,
  isUpdating,
  hasApiKey
}) => {
  return (
    <div className="p-4 border rounded-lg bg-muted/20">
      <div className="space-y-2">
        <Label htmlFor="api-key">Clé API OpenAI</Label>
        <div className="flex space-x-2">
          <Input 
            id="api-key" 
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="sk-..."
          />
          <Button onClick={onSaveApiKey}>
            Enregistrer
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Cette clé est nécessaire pour récupérer les données immobilières de SeLoger.com via OpenAI.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onUpdateAllCities} 
            disabled={isUpdating || !hasApiKey}
            className="text-xs"
          >
            Mettre à jour toutes les villes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyConfig;
