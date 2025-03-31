
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Interface pour le dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface GTMProps {
  gtmId: string;
}

/**
 * Composant pour gérer les événements Google Tag Manager
 */
export const GoogleTagManager = ({ gtmId }: GTMProps) => {
  const location = useLocation();

  useEffect(() => {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    
    // Envoyer un événement de changement de page
    window.dataLayer.push({
      event: 'pageview',
      page: {
        path: location.pathname,
        title: document.title
      }
    });
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
};

/**
 * Fonction utilitaire pour envoyer des événements personnalisés à GTM
 */
export const sendGTMEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
  }
};
