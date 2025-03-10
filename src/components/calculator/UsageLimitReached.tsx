
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const UsageLimitReached = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center">
          <Lock className="h-6 w-6 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold">Limite de calculs atteinte</h2>
        <p className="text-muted-foreground mb-4 max-w-md">
          Vous avez utilisé vos 3 calculs gratuits pour ce mois-ci. Passez à l'offre Pro pour des calculs illimités.
        </p>
        <Button 
          onClick={() => navigate('/pricing')}
          className="px-8"
        >
          Voir les offres
        </Button>
      </div>
    </Card>
  );
};

export default UsageLimitReached;
