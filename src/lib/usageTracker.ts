
// Simple utility to track calculator usage and enforce limits for free users

// Define the structure of our usage data
interface UsageData {
  count: number;
  lastReset: string; // ISO date string
}

// Délai d'expiration pour les paiements en attente (30 minutes en millisecondes)
const PAYMENT_VERIFICATION_TIMEOUT = 30 * 60 * 1000;

// Vérifier si l'utilisateur est abonné (Pro ou Expert)
export const isSubscribed = (): boolean => {
  const subscription = localStorage.getItem('user_subscription');
  const pendingSubscription = localStorage.getItem('pending_subscription');
  const subscriptionTimestamp = localStorage.getItem('subscription_timestamp');
  
  // Si l'utilisateur a une souscription active confirmée
  if (subscription === 'pro' || subscription === 'expert') {
    return true;
  }
  
  // Si l'utilisateur a une souscription en attente, vérifions qu'elle n'a pas expiré
  if (pendingSubscription && subscriptionTimestamp) {
    const timestamp = parseInt(subscriptionTimestamp, 10);
    const now = Date.now();
    
    // Si le paiement est en attente depuis moins de 30 minutes, considérons l'utilisateur comme abonné temporairement
    if (now - timestamp < PAYMENT_VERIFICATION_TIMEOUT) {
      // L'utilisateur sera considéré comme abonné pendant 30 minutes après redirection vers Stripe
      // C'est une solution temporaire en attendant de vérifier le paiement via webhook
      return true;
    } else {
      // Si le délai est dépassé et que l'abonnement n'a pas été confirmé, nettoyons ces données
      localStorage.removeItem('pending_subscription');
      localStorage.removeItem('subscription_timestamp');
    }
  }
  
  return false;
};

// Confirmer l'abonnement après vérification du paiement
export const confirmSubscription = (): void => {
  const pendingSubscription = localStorage.getItem('pending_subscription');
  
  if (pendingSubscription === 'pro' || pendingSubscription === 'expert') {
    // Confirmer l'abonnement
    localStorage.setItem('user_subscription', pendingSubscription);
    
    // Nettoyer les données temporaires
    localStorage.removeItem('pending_subscription');
    localStorage.removeItem('subscription_timestamp');
  }
};

// Si l'utilisateur est abonné, nous enregistrons son abonnement
export const setUserSubscription = (plan: 'pro' | 'expert'): void => {
  localStorage.setItem('user_subscription', plan);
  
  // Nettoyer les données temporaires si elles existent
  localStorage.removeItem('pending_subscription');
  localStorage.removeItem('subscription_timestamp');
};

// Check if the user has reached their free limit (1 calculation per month)
export const hasReachedUsageLimit = (): boolean => {
  // Les utilisateurs abonnés n'ont pas de limite
  if (isSubscribed()) {
    return false;
  }
  
  const currentUsage = getUsageData();
  return currentUsage.count >= 1;
};

// Increment the usage counter when a calculation is performed
export const trackCalculatorUsage = (): void => {
  // Les utilisateurs abonnés n'ont pas besoin de suivre l'utilisation
  if (isSubscribed()) {
    return;
  }
  
  const currentUsage = getUsageData();
  const updatedUsage: UsageData = {
    ...currentUsage,
    count: currentUsage.count + 1
  };
  
  localStorage.setItem('calculator_usage', JSON.stringify(updatedUsage));
};

// Get current usage data, with monthly reset logic
export const getUsageData = (): UsageData => {
  // Default empty usage data
  const emptyUsage: UsageData = {
    count: 0,
    lastReset: new Date().toISOString()
  };
  
  try {
    // Get stored usage data
    const storedUsage = localStorage.getItem('calculator_usage');
    if (!storedUsage) return emptyUsage;
    
    const usageData: UsageData = JSON.parse(storedUsage);
    
    // Check if we need to reset the counter (new month)
    const lastReset = new Date(usageData.lastReset);
    const currentDate = new Date();
    
    // Reset counter if we're in a new month compared to the last reset
    if (
      lastReset.getMonth() !== currentDate.getMonth() ||
      lastReset.getFullYear() !== currentDate.getFullYear()
    ) {
      return emptyUsage;
    }
    
    return usageData;
  } catch (error) {
    // If any parsing error occurs, return empty usage
    console.error('Error parsing usage data:', error);
    return emptyUsage;
  }
};

// Get remaining free calculations this month
export const getRemainingCalculations = (): number => {
  // Les utilisateurs abonnés ont des calculs illimités
  if (isSubscribed()) {
    return Infinity; // Représente un nombre illimité
  }
  
  const currentUsage = getUsageData();
  const remaining = Math.max(0, 1 - currentUsage.count);
  return remaining;
};
