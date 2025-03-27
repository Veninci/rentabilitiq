import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, ExternalLink } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  return <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-semibold text-lg">
              <Logo className="text-primary" size="sm" />
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
