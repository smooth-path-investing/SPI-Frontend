export interface Portfolio {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  expectedReturn: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  holdings: number;
  rebalanceFrequency: string;
}

export const PORTFOLIOS: Portfolio[] = [
  {
    id: 'growth-tech',
    name: 'Growth Tech Portfolio',
    description: 'High-growth technology stocks with strong fundamentals and market leadership positions.',
    shortDescription: 'AI-powered tech stocks with explosive growth potential',
    price: 99,
    expectedReturn: '25-35%',
    riskLevel: 'High',
    holdings: 15,
    rebalanceFrequency: 'Monthly'
  },
  {
    id: 'dividend-value',
    name: 'Dividend Value Portfolio',
    description: 'Stable dividend-paying companies with consistent returns and low volatility.',
    shortDescription: 'Reliable income through established dividend aristocrats',
    price: 79,
    expectedReturn: '10-15%',
    riskLevel: 'Low',
    holdings: 20,
    rebalanceFrequency: 'Quarterly'
  },
  {
    id: 'momentum-traders',
    name: 'Momentum Traders Portfolio',
    description: 'High-frequency rebalancing based on technical indicators and momentum signals.',
    shortDescription: 'Active trading strategy leveraging market momentum',
    price: 149,
    expectedReturn: '30-45%',
    riskLevel: 'High',
    holdings: 10,
    rebalanceFrequency: 'Weekly'
  },
  {
    id: 'balanced-growth',
    name: 'Balanced Growth Portfolio',
    description: 'Diversified mix of growth and value stocks across multiple sectors.',
    shortDescription: 'Perfect balance of growth and stability for long-term investors',
    price: 89,
    expectedReturn: '15-20%',
    riskLevel: 'Medium',
    holdings: 25,
    rebalanceFrequency: 'Bi-monthly'
  }
];
