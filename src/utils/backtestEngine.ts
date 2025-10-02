import { StrategyRow } from './csvParser';
import { PriceData, getClosestPrice } from './mockPrices';

export interface BacktestResult {
  portfolioValue: { date: Date; value: number }[];
  metrics: {
    totalReturn: number;
    cagr: number;
    maxDrawdown: number;
    volatility: number;
    sharpeRatio: number;
  };
  holdings: {
    date: Date;
    positions: { ticker: string; shares: number; value: number; weight: number }[];
    totalValue: number;
  }[];
}

export function runBacktest(
  strategy: StrategyRow[],
  prices: PriceData,
  initialCapital: number
): BacktestResult {
  const portfolioValue: { date: Date; value: number }[] = [];
  const holdings: BacktestResult['holdings'] = [];
  
  let currentCash = initialCapital;
  let currentPositions: { [ticker: string]: number } = {}; // ticker -> shares
  
  // Track daily portfolio values for volatility calculation
  const dailyReturns: number[] = [];
  let previousValue = initialCapital;
  
  strategy.forEach((rebalance, index) => {
    const { date, assets, weights } = rebalance;
    
    // Sell all current positions
    Object.keys(currentPositions).forEach(ticker => {
      const shares = currentPositions[ticker];
      const price = getClosestPrice(prices, ticker, date);
      currentCash += shares * price;
    });
    
    // Clear positions
    currentPositions = {};
    
    // Buy new positions
    const positions: BacktestResult['holdings'][0]['positions'] = [];
    
    assets.forEach((ticker, i) => {
      const weight = weights[i];
      const allocatedAmount = currentCash * weight;
      const price = getClosestPrice(prices, ticker, date);
      const shares = allocatedAmount / price;
      
      currentPositions[ticker] = shares;
      
      positions.push({
        ticker,
        shares,
        value: allocatedAmount,
        weight
      });
    });
    
    holdings.push({
      date,
      positions,
      totalValue: currentCash
    });
    
    portfolioValue.push({
      date,
      value: currentCash
    });
    
    // Calculate daily returns between rebalances
    if (index < strategy.length - 1) {
      const nextDate = strategy[index + 1].date;
      const currentDate = new Date(date);
      
      while (currentDate < nextDate) {
        let portfolioVal = 0;
        
        Object.keys(currentPositions).forEach(ticker => {
          const shares = currentPositions[ticker];
          const price = getClosestPrice(prices, ticker, currentDate);
          portfolioVal += shares * price;
        });
        
        portfolioValue.push({
          date: new Date(currentDate),
          value: portfolioVal
        });
        
        if (previousValue > 0) {
          dailyReturns.push((portfolioVal - previousValue) / previousValue);
        }
        previousValue = portfolioVal;
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    currentCash = currentCash; // Reset for next iteration
  });
  
  // Calculate final portfolio value
  const lastRebalance = strategy[strategy.length - 1];
  let finalValue = 0;
  Object.keys(currentPositions).forEach(ticker => {
    const shares = currentPositions[ticker];
    const price = getClosestPrice(prices, ticker, lastRebalance.date);
    finalValue += shares * price;
  });
  
  // Calculate metrics
  const totalReturn = ((finalValue - initialCapital) / initialCapital) * 100;
  
  const years = (lastRebalance.date.getTime() - strategy[0].date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const cagr = (Math.pow(finalValue / initialCapital, 1 / years) - 1) * 100;
  
  // Max drawdown
  let maxDrawdown = 0;
  let peak = initialCapital;
  portfolioValue.forEach(({ value }) => {
    if (value > peak) peak = value;
    const drawdown = ((peak - value) / peak) * 100;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  });
  
  // Volatility (annualized)
  const avgReturn = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
  const variance = dailyReturns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / dailyReturns.length;
  const volatility = Math.sqrt(variance * 252) * 100; // Annualized
  
  // Sharpe Ratio (assuming 2% risk-free rate)
  const riskFreeRate = 0.02;
  const excessReturn = (cagr / 100) - riskFreeRate;
  const sharpeRatio = volatility > 0 ? excessReturn / (volatility / 100) : 0;
  
  return {
    portfolioValue,
    metrics: {
      totalReturn,
      cagr,
      maxDrawdown,
      volatility,
      sharpeRatio
    },
    holdings
  };
}
