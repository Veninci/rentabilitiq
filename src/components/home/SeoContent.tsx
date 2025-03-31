
import React from 'react';

const SeoContent: React.FC = () => {
  return (
    <section className="py-12 bg-background px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Maximisez la rentabilité de vos investissements immobiliers
        </h2>
        
        <div className="space-y-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Comment calculer la rentabilité immobilière?</h3>
            <p>
              La rentabilité d'un investissement immobilier se mesure principalement de deux façons: la rentabilité brute et la rentabilité nette. 
              Notre calculateur RentabilitiQ prend en compte tous les paramètres essentiels pour vous offrir une analyse complète:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Prix d'achat et frais de notaire</li>
              <li>Montant du loyer mensuel</li>
              <li>Charges récurrentes (copropriété, taxe foncière, assurances)</li>
              <li>Modalités de financement (apport, durée du prêt, taux d'intérêt)</li>
              <li>Comparaison location classique vs location saisonnière (Airbnb)</li>
            </ul>
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Les critères d'un bon investissement locatif</h3>
            <p>
              Pour qu'un investissement immobilier soit considéré comme rentable, plusieurs facteurs doivent être pris en compte:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Une rentabilité brute supérieure à 5-6%</li>
              <li>Un cash-flow mensuel positif</li>
              <li>Un potentiel d'évolution du prix du bien dans les années à venir</li>
              <li>Une demande locative forte dans le quartier</li>
              <li>Des charges de copropriété maîtrisées</li>
              <li>Une fiscalité optimisée</li>
            </ul>
            <p>
              Notre calculateur RentabilitiQ vous aide à analyser tous ces critères pour prendre des décisions éclairées.
            </p>
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-3">Les villes françaises les plus rentables pour investir</h3>
            <p>
              Le rendement locatif varie considérablement selon les villes. D'après nos analyses, les villes moyennes offrent souvent les meilleures rentabilités:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Le Havre: jusqu'à 8-9% de rentabilité brute</li>
              <li>Saint-Étienne: entre 7% et 10% selon les quartiers</li>
              <li>Perpignan: environ 7% de rentabilité moyenne</li>
              <li>Mulhouse: des rendements pouvant atteindre 9%</li>
              <li>Limoges: entre 6% et 8% de rendement brut</li>
            </ul>
            <p className="mt-4">
              Les grandes métropoles comme Paris, Lyon ou Bordeaux offrent généralement des rentabilités plus faibles (2-4%) mais compensent par une plus-value potentielle importante à la revente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoContent;
