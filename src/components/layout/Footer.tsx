
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-semibold text-lg">
              <Calculator className="h-5 w-5 text-primary" />
              <span>RentabilitiQ</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La solution moderne pour calculer et optimiser la rentabilité de vos 
              <Link to="/calculator" className="text-primary hover:underline mx-1">investissements immobiliers</Link>.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.twitter.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.linkedin.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Navigation Principale</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm">Accueil</Link></li>
              <li><Link to="/calculator" className="text-muted-foreground hover:text-primary text-sm">Calculateur de rentabilité</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary text-sm">Nos tarifs</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary text-sm">À propos de nous</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Ressources</h4>
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
            <h4 className="font-medium text-sm tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <a href="mailto:veninci.invest@gmail.com" className="text-muted-foreground hover:text-primary text-sm">veninci.invest@gmail.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <a href="tel:+33633465641" className="text-muted-foreground hover:text-primary text-sm">06 33 46 56 41</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground text-sm">2 rue de la gravière, Kilstett 67840</span>
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
    </footer>
  );
};

export default Footer;
