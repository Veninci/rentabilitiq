import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to prevent default behavior and stop event propagation
  const handleTabClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // This prevents the default behavior which might be causing the scroll to top
    e.stopPropagation();
  };
  return <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* SEO Content in Collapsible Section */}
        <div className="mb-8 border-b pb-6">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-slate-950">
                Ressources pour investisseurs
              </h2>
              <CollapsibleTrigger className="p-2 rounded-full text-slate-950 bg-slate-50">
                {isOpen ? <ChevronUp size={20} className="bg-slate-50" /> : <ChevronDown size={20} />}
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-4">
              <Tabs defaultValue="rentabilite" className="w-full">
                <TabsList className="mb-4 w-full flex flex-wrap gap-2 bg-transparent overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                  <TabsTrigger value="rentabilite" className="flex-shrink-0 text-sm" onClick={handleTabClick}>
                    Calculer la rentabilité
                  </TabsTrigger>
                  <TabsTrigger value="criteres" className="flex-shrink-0 text-sm" onClick={handleTabClick}>
                    Critères d'investissement
                  </TabsTrigger>
                  <TabsTrigger value="villes" className="flex-shrink-0 text-sm" onClick={handleTabClick}>
                    Villes rentables
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="rentabilite" className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-slate-950">Comment calculer la rentabilité immobilière?</h3>
                  <p className="text-slate-950">
                    La rentabilité d'un investissement immobilier se mesure principalement de deux façons: la rentabilité brute et la rentabilité nette. 
                    Notre calculateur RentabilitiQ prend en compte tous les paramètres essentiels pour vous offrir une analyse complète:
                  </p>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 mb-4 space-y-1">
                    <li className="bg-slate-50">Prix d'achat et frais de notaire</li>
                    <li className="bg-slate-50">Montant du loyer mensuel</li>
                    <li className="bg-slate-50">Charges récurrentes (copropriété, taxe foncière, assurances)</li>
                    <li>Modalités de financement (apport, durée du prêt, taux d'intérêt)</li>
                    <li>Comparaison location classique vs location saisonnière (Airbnb)</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="criteres" className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Les critères d'un bon investissement locatif</h3>
                  <p>
                    Pour qu'un investissement immobilier soit considéré comme rentable, plusieurs facteurs doivent être pris en compte:
                  </p>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 mb-4 space-y-1">
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
                </TabsContent>
                
                <TabsContent value="villes" className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-slate-950">Les villes françaises les plus rentables pour investir</h3>
                  <p>
                    Le rendement locatif varie considérablement selon les villes. D'après nos analyses, les villes moyennes offrent souvent les meilleures rentabilités:
                  </p>
                  <ul className="list-disc pl-4 md:pl-6 mt-2 space-y-1">
                    <li>Le Havre: jusqu'à 8-9% de rentabilité brute</li>
                    <li>Saint-Étienne: entre 7% et 10% selon les quartiers</li>
                    <li>Perpignan: environ 7% de rentabilité moyenne</li>
                    <li>Mulhouse: des rendements pouvant atteindre 9%</li>
                    <li>Limoges: entre 6% et 8% de rendement brut</li>
                  </ul>
                  <p className="mt-4">
                    Les grandes métropoles comme Paris, Lyon ou Bordeaux offrent généralement des rentabilités plus faibles (2-4%) mais compensent par une plus-value potentielle importante à la revente.
                  </p>
                </TabsContent>
              </Tabs>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Regular Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-semibold text-lg">
              <Logo className="text-primary" size="lg" />
              <span className="text-slate-950">RentabilitiQ</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La solution moderne pour calculer et optimiser la rentabilité de vos 
              <Link to="/calculator" className="text-primary hover:underline mx-1">investissements immobiliers</Link>.
            </p>
            <div className="flex pt-2">
              <a href="https://www.instagram.com/rentabilitiq/" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4 text-slate-950">Navigation Principale</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm">Accueil</Link></li>
              <li><Link to="/calculator" className="text-muted-foreground hover:text-primary text-sm">Calculateur de rentabilité</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary text-sm">Nos tarifs</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary text-sm">À propos de nous</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4 text-slate-950">Ressources</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary text-sm">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm">Politique de confidentialité</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-primary text-sm">Politique de cookies</Link></li>
              <li>
                <a href="https://www.impots.gouv.fr/portail/particulier/les-revenus-fonciers" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center" target="_blank" rel="noopener noreferrer">
                  Fiscalité immobilière <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://www.service-public.fr/particuliers/vosdroits/N19808" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center" target="_blank" rel="noopener noreferrer">
                  Législation locative <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4 text-slate-950">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <a href="mailto:veninci.invest@gmail.com" className="text-muted-foreground hover:text-primary text-sm">veninci.invest@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RentabilitiQ. Tous droits réservés. <Link to="/terms" className="text-primary hover:underline">Mentions légales</Link>
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0 justify-center">
            <Link to="/calculator" className="text-muted-foreground hover:text-primary text-sm transition-colors">Simulateur</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-primary text-sm transition-colors">Tarifs</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">À propos</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;