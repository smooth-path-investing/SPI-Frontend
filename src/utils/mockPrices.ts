// Mock historical price data generator
// In production, this would fetch from a real API

export interface PriceData {
  [ticker: string]: {
    [date: string]: number; // YYYY-MM-DD format
  };
}

// Generate mock price data with realistic movements
export function generateMockPrices(tickers: string[], startDate: Date, endDate: Date): PriceData {
  const prices: PriceData = {};
  
  tickers.forEach(ticker => {
    prices[ticker] = {};
    let currentPrice = 50 + Math.random() * 150; // Start between $50-$200
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Simulate daily price movements (-3% to +3%)
      const change = (Math.random() - 0.5) * 0.06;
      currentPrice = currentPrice * (1 + change);
      
      // Keep prices positive and realistic
      currentPrice = Math.max(5, Math.min(1000, currentPrice));
      
      prices[ticker][dateStr] = parseFloat(currentPrice.toFixed(2));
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  
  return prices;
}

export function getClosestPrice(prices: PriceData, ticker: string, targetDate: Date): number {
  const dateStr = targetDate.toISOString().split('T')[0];
  
  if (prices[ticker] && prices[ticker][dateStr]) {
    return prices[ticker][dateStr];
  }
  
  // If exact date not found, look for closest previous date (within 7 days)
  for (let i = 1; i <= 7; i++) {
    const checkDate = new Date(targetDate);
    checkDate.setDate(checkDate.getDate() - i);
    const checkDateStr = checkDate.toISOString().split('T')[0];
    
    if (prices[ticker] && prices[ticker][checkDateStr]) {
      return prices[ticker][checkDateStr];
    }
  }
  
  // Fallback
  return 100;
}
