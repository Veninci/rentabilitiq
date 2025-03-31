
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Déclaration pour TypeScript - dataLayer global
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// ID de votre conteneur GTM
const GTM_ID = 'GTM-MP2V54MJ';

// Initialiser dataLayer s'il n'existe pas déjà
if (!window.dataLayer) {
  window.dataLayer = [];
}

/**
 * Envoie un événement au dataLayer pour Google Tag Manager
 */
export const sendGTMEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  window.dataLayer.push({
    event: eventName,
    ...eventParams
  });
};

/**
 * Composant GoogleTagManager qui suit automatiquement les changements de page
 */
const GoogleTagManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Envoyer un événement de changement de page
    sendGTMEvent('pageview', {
      page_path: location.pathname,
      page_search: location.search,
      page_hash: location.hash
    });
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
};

export default GoogleTagManager;
