// Simple utility to track calculator usage and enforce limits for free users

// Define the structure of our usage data
interface UsageData {
  count: number;
  lastReset: string; // ISO date string
}

// Délai d'expiration pour les paiements en attente (30 minutes en millisecondes)
const PAYMENT_VERIFICATION_TIMEOUT = 30 * 60 * 1000;

// Import types for calculation history
import { CalculationHistory, PropertyData, PropertyResults } from "@/types/property";

// Réinitialiser les données d'abonnement pour commencer en version Basic
export const resetToBasic = (): void => {
  // Supprimer toute information d'abonnement existante
  localStorage.removeItem('user_subscription');
  localStorage.removeItem('pending_subscription');
  localStorage.removeItem('subscription_timestamp');
  localStorage.removeItem('payment_confirmed');
  
  // Réinitialiser le compteur d'utilisation pour avoir un seul essai
  const resetUsage: UsageData = {
    count: 0,
    lastReset: new Date().toISOString()
  };
  localStorage.setItem('calculator_usage', JSON.stringify(resetUsage));
};

// Vérifier si l'utilisateur est abonné (Pro ou Expert)
export const isSubscribed = (): boolean => {
  const subscription = localStorage.getItem('user_subscription');
  const pendingSubscription = localStorage.getItem('pending_subscription');
  const subscriptionTimestamp = localStorage.getItem('subscription_timestamp');
  const paymentConfirmed = localStorage.getItem('payment_confirmed');
  
  // Si l'utilisateur a une souscription active confirmée
  if (subscription === 'pro' || subscription === 'expert') {
    return true;
  }
  
  // Un paiement n'est considéré confirmé que si le flag de confirmation est présent
  if (pendingSubscription && paymentConfirmed === 'true') {
    return true;
  }
  
  // Si l'utilisateur a une souscription en attente, vérifions qu'elle n'a pas expiré
  if (pendingSubscription && subscriptionTimestamp) {
    const timestamp = parseInt(subscriptionTimestamp, 10);
    const now = Date.now();
    
    // Nettoyons les données de souscription en attente si le délai est dépassé
    if (now - timestamp >= PAYMENT_VERIFICATION_TIMEOUT) {
      localStorage.removeItem('pending_subscription');
      localStorage.removeItem('subscription_timestamp');
    }
  }
  
  return false;
};

// Confirmer l'abonnement après vérification du paiement via Stripe
export const confirmSubscription = (): void => {
  const pendingSubscription = localStorage.getItem('pending_subscription');
  
  if (pendingSubscription === 'pro' || pendingSubscription === 'expert') {
    // Marquer le paiement comme confirmé
    localStorage.setItem('payment_confirmed', 'true');
    
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
  localStorage.removeItem('payment_confirmed');
};

// Check if the user has reached their free limit (1 calculation per month)
export const hasReachedUsageLimit = (): boolean => {
  // Les utilisateurs abonnés n'ont pas de limite
  if (isSubscribed()) {
    return false;
  }
  
  const currentUsage = getUsageData();
  return currentUsage.count >= 1; // Strictement limité à 1 essai
};

// Increment the usage counter when a calculation is performed
export const trackCalculatorUsage = (): void => {
  // Les utilisateurs abonnés n'ont pas besoin de suivre l'utilisation
  if (isSubscribed()) {
    return;
  }
  
  const currentUsage = getUsageData();
  
  // Si l'utilisateur a déjà atteint sa limite, ne pas incrémenter
  if (currentUsage.count >= 1) {
    return;
  }
  
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
    if (!storedUsage) {
      // Si aucune donnée n'existe, initialiser avec un usage vide et le sauvegarder
      localStorage.setItem('calculator_usage', JSON.stringify(emptyUsage));
      return emptyUsage;
    }
    
    const usageData: UsageData = JSON.parse(storedUsage);
    
    // Check if we need to reset the counter (new month)
    const lastReset = new Date(usageData.lastReset);
    const currentDate = new Date();
    
    // Reset counter if we're in a new month compared to the last reset
    if (
      lastReset.getMonth() !== currentDate.getMonth() ||
      lastReset.getFullYear() !== currentDate.getFullYear()
    ) {
      // Réinitialiser pour le nouveau mois
      const newUsage = {
        count: 0,
        lastReset: currentDate.toISOString()
      };
      localStorage.setItem('calculator_usage', JSON.stringify(newUsage));
      return newUsage;
    }
    
    return usageData;
  } catch (error) {
    // If any parsing error occurs, return empty usage
    console.error('Error parsing usage data:', error);
    // En cas d'erreur, initialiser avec un usage vide et le sauvegarder
    localStorage.setItem('calculator_usage', JSON.stringify(emptyUsage));
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

// New functions for calculation history

// Save a calculation to history
export const saveCalculationToHistory = (
  propertyData: PropertyData,
  results: PropertyResults,
  city: string
): void => {
  try {
    const historyItem: CalculationHistory = {
      id: generateId(),
      date: new Date().toISOString(),
      propertyData,
      results,
      city
    };

    const history = getCalculationHistory();
    history.unshift(historyItem); // Add new item at the beginning

    // Keep only the most recent 10 calculations to avoid using too much localStorage
    const limitedHistory = history.slice(0, 10);
    
    localStorage.setItem('calculation_history', JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Error saving calculation to history:', error);
  }
};

// Get calculation history
export const getCalculationHistory = (): CalculationHistory[] => {
  try {
    const history = localStorage.getItem('calculation_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error retrieving calculation history:', error);
    return [];
  }
};

// Clear calculation history
export const clearCalculationHistory = (): void => {
  localStorage.removeItem('calculation_history');
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
