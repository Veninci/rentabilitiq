
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Calculateur', path: '/calculator' },
    { name: 'Tarifs', path: '/pricing' },
    { name: 'À propos', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || mobileMenuOpen
          ? 'py-2 md:py-3 bg-white/90 backdrop-blur-md shadow-sm'
          : 'py-3 md:py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-1 md:space-x-2 font-semibold text-lg md:text-xl"
        >
          <Calculator className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          <span className="animate-fade-in">RentabilitiQ</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'transition-all duration-300 relative py-1',
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </div>
          <Button size="sm" className="rounded-full px-4 animate-fade-in">
            Essai gratuit
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 transition-all duration-300 ease-in-out" />
          ) : (
            <Menu className="h-5 w-5 transition-all duration-300 ease-in-out" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 animate-slide-down">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'py-2 px-3 rounded-lg transition-all text-sm',
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-gray-100'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
              <Button className="h-9 text-sm">Essai gratuit</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
