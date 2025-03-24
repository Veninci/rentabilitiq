
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, KeyRound, AlertTriangle } from "lucide-react";
import { getStoredApiKey } from "@/lib/openai-service";

interface OpenAIKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const OpenAIKeyInput: React.FC<OpenAIKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [hasStoredKey, setHasStoredKey] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = getStoredApiKey();
    if (storedKey) {
      setApiKey(storedKey);
      setHasStoredKey(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
      setHasStoredKey(true);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Clé API OpenAI
        </CardTitle>
        <CardDescription>
          Entrez votre clé API OpenAI pour utiliser les fonctionnalités d'IA avancées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Votre clé API OpenAI</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>
            <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                La clé API sera stockée uniquement dans votre navigateur et ne sera jamais envoyée à nos serveurs.
                Pour une sécurité optimale, utilisez une clé avec des limites de dépenses.
              </p>
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            {hasStoredKey ? "Mettre à jour la clé API" : "Enregistrer la clé API"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          <span>Votre clé est stockée de manière sécurisée dans votre navigateur uniquement</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OpenAIKeyInput;
