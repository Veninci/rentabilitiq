
// Simple utility to track calculator usage and enforce limits for free users

// Define the structure of our usage data
interface UsageData {
  count: number;
  lastReset: string; // ISO date string
}

// Check if the user has reached their free limit (3 calculations per month)
export const hasReachedUsageLimit = (): boolean => {
  const currentUsage = getUsageData();
  return currentUsage.count >= 3;
};

// Increment the usage counter when a calculation is performed
export const trackCalculatorUsage = (): void => {
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
  const currentUsage = getUsageData();
  const remaining = Math.max(0, 3 - currentUsage.count);
  return remaining;
};
