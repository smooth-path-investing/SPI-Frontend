export interface StockData {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  description: string;
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  confidence: number; // 0-100
  keyMetrics: {
    marketCap: string;
    peRatio: string;
    dividend: string;
    beta: string;
  };
  factors: string[];
}

// Stock data for Long Contrarian Portfolio
export const LONG_CONTRARIAN_STOCKS: StockData[] = [
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    price: 142.58,
    change: 2.34,
    changePercent: 1.67,
    description: 'A leading technology company specializing in internet-related services and products, including search, advertising, cloud computing, and artificial intelligence.',
    recommendation: 'Strong Buy',
    confidence: 92,
    keyMetrics: {
      marketCap: '$1.8T',
      peRatio: '27.4',
      dividend: 'N/A',
      beta: '1.05'
    },
    factors: ['USACOR', 'IWO', 'USARSY', 'receivables', 'ebitdamargin']
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer Discretionary',
    price: 178.25,
    change: -1.45,
    changePercent: -0.81,
    description: 'Global e-commerce and cloud computing giant, operating in retail, digital streaming, and artificial intelligence sectors.',
    recommendation: 'Strong Buy',
    confidence: 88,
    keyMetrics: {
      marketCap: '$1.9T',
      peRatio: '68.2',
      dividend: 'N/A',
      beta: '1.15'
    },
    factors: ['USAFDI', 'EWP', 'USAMKT', 'USACNCN', 'EWH']
  },
  {
    ticker: 'BAC',
    name: 'Bank of America',
    sector: 'Financial Services',
    price: 36.89,
    change: 0.78,
    changePercent: 2.16,
    description: 'Major American multinational investment bank and financial services company.',
    recommendation: 'Buy',
    confidence: 85,
    keyMetrics: {
      marketCap: '$285B',
      peRatio: '12.1',
      dividend: '2.8%',
      beta: '1.22'
    },
    factors: ['FXI', 'USATVS', 'USACARS', 'invcap', 'USAGYLD']
  },
  {
    ticker: 'DIS',
    name: 'The Walt Disney Company',
    sector: 'Communication Services',
    price: 112.45,
    change: 1.23,
    changePercent: 1.11,
    description: 'Diversified multinational entertainment and media conglomerate with theme parks, film studios, and streaming services.',
    recommendation: 'Buy',
    confidence: 82,
    keyMetrics: {
      marketCap: '$205B',
      peRatio: '45.3',
      dividend: 'N/A',
      beta: '0.98'
    },
    factors: ['pb', 'USAGD', 'USAMKT', 'de', 'USAEHS']
  },
  {
    ticker: 'WFC',
    name: 'Wells Fargo & Company',
    sector: 'Financial Services',
    price: 58.92,
    change: -0.34,
    changePercent: -0.57,
    description: 'Diversified financial services company providing banking, investment, and mortgage services.',
    recommendation: 'Buy',
    confidence: 80,
    keyMetrics: {
      marketCap: '$210B',
      peRatio: '11.8',
      dividend: '2.5%',
      beta: '1.18'
    },
    factors: ['accoci', 'EWZ', 'EWH', 'USAPSAV', 'USAEMPST']
  },
  {
    ticker: 'CVX',
    name: 'Chevron Corporation',
    sector: 'Energy',
    price: 156.78,
    change: 2.15,
    changePercent: 1.39,
    description: 'Integrated energy corporation engaged in petroleum, chemicals, mining, and power generation.',
    recommendation: 'Buy',
    confidence: 78,
    keyMetrics: {
      marketCap: '$295B',
      peRatio: '10.4',
      dividend: '3.6%',
      beta: '0.87'
    },
    factors: ['IYJ', 'IBB', 'USAFOET', 'USARSY', 'USAMKT']
  },
  {
    ticker: 'MRK',
    name: 'Merck & Co.',
    sector: 'Healthcare',
    price: 118.34,
    change: 0.89,
    changePercent: 0.76,
    description: 'Global healthcare company delivering innovative health solutions through prescription medicines and vaccines.',
    recommendation: 'Buy',
    confidence: 86,
    keyMetrics: {
      marketCap: '$299B',
      peRatio: '16.7',
      dividend: '2.8%',
      beta: '0.45'
    },
    factors: ['pb', 'EZA', 'IGM', 'USANAHB', 'USAGPAY']
  },
  {
    ticker: 'UPS',
    name: 'United Parcel Service',
    sector: 'Industrials',
    price: 145.67,
    change: -0.92,
    changePercent: -0.63,
    description: 'Package delivery and supply chain management company operating worldwide.',
    recommendation: 'Hold',
    confidence: 75,
    keyMetrics: {
      marketCap: '$125B',
      peRatio: '18.9',
      dividend: '3.9%',
      beta: '0.92'
    },
    factors: ['USARSY', 'USACCPI', 'USADPINC', 'EWU', 'USAPFED']
  },
  {
    ticker: 'ADBE',
    name: 'Adobe Inc.',
    sector: 'Technology',
    price: 568.92,
    change: 4.56,
    changePercent: 0.81,
    description: 'Software company known for creative, marketing, and document management solutions.',
    recommendation: 'Buy',
    confidence: 84,
    keyMetrics: {
      marketCap: '$258B',
      peRatio: '48.2',
      dividend: 'N/A',
      beta: '1.12'
    },
    factors: ['EWS', 'USANFIB', 'IYJ', 'sgna', 'EWA']
  },
  {
    ticker: 'TSCO',
    name: 'Tractor Supply Company',
    sector: 'Consumer Discretionary',
    price: 234.56,
    change: 1.78,
    changePercent: 0.76,
    description: 'Retail chain selling products for home improvement, agriculture, lawn and garden maintenance, and livestock care.',
    recommendation: 'Buy',
    confidence: 79,
    keyMetrics: {
      marketCap: '$25B',
      peRatio: '24.5',
      dividend: '1.8%',
      beta: '0.88'
    },
    factors: ['USACOSC', 'IOO', 'USAMKT', 'EWJ', 'EWP']
  }
];

// Placeholder stocks for other portfolios
export const SHORT_CONTRARIAN_STOCKS: StockData[] = [
  {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    sector: 'Streaming',
    price: 445.50,
    change: -10.25,
    changePercent: -2.30,
    description: 'Netflix appears overvalued following aggressive price increases and market saturation concerns. Competition from Disney+, Apple TV+, and others has intensified.',
    recommendation: 'Sell',
    confidence: 87,
    keyMetrics: {
      marketCap: '$195B',
      peRatio: '38.5',
      dividend: 'N/A',
      beta: '1.32'
    },
    factors: ['valuation', 'competition', 'subscriber_momentum', 'content_roi', 'market_saturation']
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive',
    price: 178.25,
    change: -9.65,
    changePercent: -5.40,
    description: 'Tesla trading at historically high multiples despite increasing competition in the EV market. Traditional automakers are rapidly catching up with competitive offerings.',
    recommendation: 'Strong Sell',
    confidence: 91,
    keyMetrics: {
      marketCap: '$565B',
      peRatio: '52.3',
      dividend: 'N/A',
      beta: '2.01'
    },
    factors: ['valuation_risk', 'market_share', 'margin_compression', 'execution_risk', 'competition']
  },
  {
    ticker: 'COIN',
    name: 'Coinbase Global',
    sector: 'Cryptocurrency',
    price: 89.75,
    change: -3.41,
    changePercent: -3.80,
    description: 'Coinbase highly dependent on volatile crypto market conditions. Regulatory headwinds increasing with SEC scrutiny.',
    recommendation: 'Sell',
    confidence: 84,
    keyMetrics: {
      marketCap: '$22.8B',
      peRatio: 'N/A',
      dividend: 'N/A',
      beta: '3.45'
    },
    factors: ['regulatory_risk', 'volume_decline', 'crypto_correlation', 'competition', 'volatility']
  },
  {
    ticker: 'SNAP',
    name: 'Snap Inc.',
    sector: 'Social Media',
    price: 12.30,
    change: -0.76,
    changePercent: -6.20,
    description: 'Snapchat struggling to compete with TikTok and Instagram Reels. User growth stagnating in key demographics.',
    recommendation: 'Strong Sell',
    confidence: 89,
    keyMetrics: {
      marketCap: '$19.5B',
      peRatio: 'N/A',
      dividend: 'N/A',
      beta: '1.88'
    },
    factors: ['user_growth', 'ad_revenue', 'platform_competition', 'profitability', 'engagement']
  },
  {
    ticker: 'ROKU',
    name: 'Roku Inc.',
    sector: 'Streaming Tech',
    price: 67.85,
    change: -2.78,
    changePercent: -4.10,
    description: 'Roku facing intense competition from smart TV manufacturers and streaming giants. Advertising revenue under pressure.',
    recommendation: 'Sell',
    confidence: 82,
    keyMetrics: {
      marketCap: '$9.2B',
      peRatio: 'N/A',
      dividend: 'N/A',
      beta: '1.65'
    },
    factors: ['platform_risk', 'ad_spend', 'margin_pressure', 'market_saturation', 'competition']
  },
  {
    ticker: 'ZM',
    name: 'Zoom Video Communications',
    sector: 'Communication',
    price: 68.90,
    change: -2.00,
    changePercent: -2.90,
    description: 'Zoom experiencing post-pandemic demand normalization. Enterprise customers consolidating collaboration tools.',
    recommendation: 'Sell',
    confidence: 85,
    keyMetrics: {
      marketCap: '$20.8B',
      peRatio: '24.7',
      dividend: 'N/A',
      beta: '1.12'
    },
    factors: ['demand_normalization', 'enterprise_competition', 'pricing_pressure', 'growth_deceleration', 'teams']
  },
  {
    ticker: 'SHOP',
    name: 'Shopify Inc.',
    sector: 'E-commerce',
    price: 78.40,
    change: -2.74,
    changePercent: -3.50,
    description: 'Shopify trading at premium valuation despite slowing merchant growth. E-commerce normalization post-pandemic affecting core business.',
    recommendation: 'Sell',
    confidence: 83,
    keyMetrics: {
      marketCap: '$98.5B',
      peRatio: 'N/A',
      dividend: 'N/A',
      beta: '1.54'
    },
    factors: ['merchant_growth', 'ecommerce_normalization', 'competitive_pressure', 'valuation', 'take_rate']
  },
  {
    ticker: 'SQ',
    name: 'Block Inc.',
    sector: 'Fintech',
    price: 54.20,
    change: -2.55,
    changePercent: -4.70,
    description: 'Block facing challenges in both Cash App and Square ecosystems. Buy Now Pay Later market becoming oversaturated.',
    recommendation: 'Sell',
    confidence: 80,
    keyMetrics: {
      marketCap: '$31.2B',
      peRatio: 'N/A',
      dividend: 'N/A',
      beta: '2.34'
    },
    factors: ['bnpl_saturation', 'crypto_volatility', 'regulatory_risk', 'profitability', 'competition']
  },
  {
    ticker: 'PLTR',
    name: 'Palantir Technologies',
    sector: 'Data Analytics',
    price: 22.15,
    change: -1.28,
    changePercent: -5.80,
    description: 'Palantir trading at significant premium despite inconsistent commercial growth. Heavy reliance on government contracts.',
    recommendation: 'Strong Sell',
    confidence: 88,
    keyMetrics: {
      marketCap: '$47.3B',
      peRatio: '78.2',
      dividend: 'N/A',
      beta: '2.12'
    },
    factors: ['commercial_traction', 'government_dependence', 'sbc_dilution', 'valuation', 'margins']
  },
  {
    ticker: 'HOOD',
    name: 'Robinhood Markets',
    sector: 'Brokerage',
    price: 11.45,
    change: -0.74,
    changePercent: -6.50,
    description: 'Robinhood suffering from declining retail trading activity. Crypto revenue collapsed from peak.',
    recommendation: 'Strong Sell',
    confidence: 90,
    keyMetrics: {
      marketCap: '$10.1B',
      peRatio: 'N/A',
      dividend: 'N/A',
      beta: '2.89'
    },
    factors: ['retail_activity', 'crypto_revenue', 'pfof_risk', 'engagement', 'volatility']
  }
];

export const LONG_TREND_STOCKS: StockData[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Semiconductors',
    price: 485.60,
    change: 41.26,
    changePercent: 8.50,
    description: 'NVIDIA demonstrating exceptional momentum driven by AI chip demand. Data center revenue accelerating with strong visibility into 2025.',
    recommendation: 'Strong Buy',
    confidence: 94,
    keyMetrics: {
      marketCap: '$1.2T',
      peRatio: '68.4',
      dividend: '0.03%',
      beta: '1.68'
    },
    factors: ['ai_demand', 'data_center', 'market_leadership', 'earnings_momentum', 'gpu_dominance']
  },
  {
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    sector: 'Social Media',
    price: 312.45,
    change: 19.37,
    changePercent: 6.20,
    description: 'Meta showing strong recovery with improving ad metrics and efficiency gains. Reality Labs losses declining while core business accelerates.',
    recommendation: 'Strong Buy',
    confidence: 89,
    keyMetrics: {
      marketCap: '$815B',
      peRatio: '26.3',
      dividend: 'N/A',
      beta: '1.42'
    },
    factors: ['ad_revenue', 'efficiency', 'ai_monetization', 'user_engagement', 'reels']
  },
  {
    ticker: 'AVGO',
    name: 'Broadcom Inc.',
    sector: 'Semiconductors',
    price: 892.30,
    change: 51.73,
    changePercent: 5.80,
    description: 'Broadcom benefiting from AI infrastructure buildout and VMware acquisition synergies. Strong pricing power in networking chips.',
    recommendation: 'Buy',
    confidence: 87,
    keyMetrics: {
      marketCap: '$412B',
      peRatio: '34.7',
      dividend: '2.1%',
      beta: '1.21'
    },
    factors: ['ai_infrastructure', 'vmware_synergies', 'pricing_power', 'fcf_generation', 'networking']
  },
  {
    ticker: 'AMD',
    name: 'Advanced Micro Devices',
    sector: 'Semiconductors',
    price: 145.75,
    change: 10.64,
    changePercent: 7.30,
    description: 'AMD gaining share in both CPU and GPU markets. MI300 AI chip seeing strong customer adoption.',
    recommendation: 'Strong Buy',
    confidence: 91,
    keyMetrics: {
      marketCap: '$235B',
      peRatio: '142.8',
      dividend: 'N/A',
      beta: '1.89'
    },
    factors: ['market_share', 'ai_chip', 'data_center', 'xilinx_integration', 'momentum']
  },
  {
    ticker: 'ANET',
    name: 'Arista Networks',
    sector: 'Networking',
    price: 267.85,
    change: 13.12,
    changePercent: 4.90,
    description: 'Arista benefiting from cloud titans expanding AI infrastructure. Networking equipment essential for AI data centers.',
    recommendation: 'Buy',
    confidence: 86,
    keyMetrics: {
      marketCap: '$84B',
      peRatio: '45.2',
      dividend: 'N/A',
      beta: '1.15'
    },
    factors: ['ai_datacenter', 'customer_diversification', 'margin_expansion', 'enterprise', 'cloud']
  },
  {
    ticker: 'CRM',
    name: 'Salesforce Inc.',
    sector: 'Software',
    price: 234.20,
    change: 12.65,
    changePercent: 5.40,
    description: 'Salesforce showing renewed growth with AI-powered features driving upsells. Margin expansion story playing out.',
    recommendation: 'Buy',
    confidence: 84,
    keyMetrics: {
      marketCap: '$228B',
      peRatio: '38.6',
      dividend: 'N/A',
      beta: '1.08'
    },
    factors: ['ai_features', 'margin_expansion', 'enterprise_resilience', 'agentforce', 'crm']
  },
  {
    ticker: 'NOW',
    name: 'ServiceNow Inc.',
    sector: 'Software',
    price: 678.90,
    change: 41.41,
    changePercent: 6.10,
    description: 'ServiceNow maintaining premium growth in enterprise IT management. AI workflow automation resonating strongly with large enterprises.',
    recommendation: 'Strong Buy',
    confidence: 90,
    keyMetrics: {
      marketCap: '$139B',
      peRatio: '92.5',
      dividend: 'N/A',
      beta: '1.25'
    },
    factors: ['ai_workflow', 'net_retention', 'tam_expansion', 'enterprise_momentum', 'automation']
  },
  {
    ticker: 'PANW',
    name: 'Palo Alto Networks',
    sector: 'Cybersecurity',
    price: 298.45,
    change: 17.02,
    changePercent: 5.70,
    description: 'Palo Alto Networks benefiting from platform consolidation trend in cybersecurity. AI-powered threat detection showing clear advantages.',
    recommendation: 'Buy',
    confidence: 85,
    keyMetrics: {
      marketCap: '$98B',
      peRatio: '48.3',
      dividend: 'N/A',
      beta: '1.18'
    },
    factors: ['platform_consolidation', 'ai_detection', 'rpo_growth', 'federal_demand', 'security']
  },
  {
    ticker: 'CRWD',
    name: 'CrowdStrike Holdings',
    sector: 'Cybersecurity',
    price: 178.30,
    change: 13.91,
    changePercent: 7.80,
    description: 'CrowdStrike maintaining leadership in endpoint security with strong module attach rates. Cloud-native architecture proving advantageous.',
    recommendation: 'Strong Buy',
    confidence: 92,
    keyMetrics: {
      marketCap: '$42B',
      peRatio: '248.5',
      dividend: 'N/A',
      beta: '1.34'
    },
    factors: ['module_attach', 'cloud_architecture', 'international_growth', 'arr_acceleration', 'endpoint']
  },
  {
    ticker: 'ADBE',
    name: 'Adobe Inc.',
    sector: 'Software',
    price: 512.60,
    change: 21.53,
    changePercent: 4.20,
    description: 'Adobe successfully integrating generative AI into Creative Cloud suite. Firefly monetization gaining traction.',
    recommendation: 'Buy',
    confidence: 83,
    keyMetrics: {
      marketCap: '$235B',
      peRatio: '42.7',
      dividend: 'N/A',
      beta: '1.12'
    },
    factors: ['generative_ai', 'firefly', 'enterprise_demand', 'creative_cloud', 'innovation']
  }
];

export const SHORT_TREND_STOCKS: StockData[] = [
  {
    ticker: 'CVX',
    name: 'Chevron Corporation',
    sector: 'Energy',
    price: 142.30,
    change: -4.55,
    changePercent: -3.20,
    description: 'Chevron facing sustained pressure from declining oil prices and weakening global demand. Renewable energy transition accelerating.',
    recommendation: 'Sell',
    confidence: 86,
    keyMetrics: {
      marketCap: '$262B',
      peRatio: '10.8',
      dividend: '3.6%',
      beta: '0.87'
    },
    factors: ['oil_price', 'demand_weakness', 'energy_transition', 'china_slowdown', 'renewables']
  },
  {
    ticker: 'XOM',
    name: 'Exxon Mobil Corporation',
    sector: 'Energy',
    price: 98.75,
    change: -2.76,
    changePercent: -2.80,
    description: 'Exxon experiencing margin compression from oversupply in refined products. OPEC+ production cuts proving ineffective.',
    recommendation: 'Sell',
    confidence: 82,
    keyMetrics: {
      marketCap: '$385B',
      peRatio: '11.2',
      dividend: '3.4%',
      beta: '0.92'
    },
    factors: ['refining_margins', 'oversupply', 'policy_headwinds', 'demand_destruction', 'opec']
  },
  {
    ticker: 'MRO',
    name: 'Marathon Oil Corporation',
    sector: 'Energy',
    price: 24.50,
    change: -1.10,
    changePercent: -4.50,
    description: 'Marathon Oil suffering from declining production efficiency and rising costs. Permian Basin facing increasing competition.',
    recommendation: 'Strong Sell',
    confidence: 88,
    keyMetrics: {
      marketCap: '$16.2B',
      peRatio: '8.4',
      dividend: '1.9%',
      beta: '1.45'
    },
    factors: ['production_decline', 'cost_inflation', 'hedging_losses', 'leverage', 'permian']
  },
  {
    ticker: 'HAL',
    name: 'Halliburton Company',
    sector: 'Oilfield Services',
    price: 31.20,
    change: -1.22,
    changePercent: -3.90,
    description: 'Halliburton facing reduced drilling activity as operators cut capital spending. International markets showing particular weakness.',
    recommendation: 'Sell',
    confidence: 84,
    keyMetrics: {
      marketCap: '$27.8B',
      peRatio: '9.7',
      dividend: '2.1%',
      beta: '1.68'
    },
    factors: ['drilling_activity', 'international_weakness', 'pricing_pressure', 'utilization', 'capex']
  },
  {
    ticker: 'SLB',
    name: 'Schlumberger N.V.',
    sector: 'Oilfield Services',
    price: 43.85,
    change: -1.84,
    changePercent: -4.20,
    description: 'Schlumberger experiencing order cancellations and project delays globally. Middle East spending plans being revised downward.',
    recommendation: 'Sell',
    confidence: 85,
    keyMetrics: {
      marketCap: '$62.1B',
      peRatio: '14.3',
      dividend: '2.5%',
      beta: '1.52'
    },
    factors: ['order_cancellations', 'middle_east', 'digital_adoption', 'cost_structure', 'delays']
  },
  {
    ticker: 'DVN',
    name: 'Devon Energy Corporation',
    sector: 'Energy',
    price: 45.60,
    change: -1.60,
    changePercent: -3.50,
    description: 'Devon Energy seeing natural gas prices remain depressed with oversupply. Variable dividend policy creating shareholder uncertainty.',
    recommendation: 'Sell',
    confidence: 80,
    keyMetrics: {
      marketCap: '$29.4B',
      peRatio: '7.9',
      dividend: '3.8%',
      beta: '1.38'
    },
    factors: ['natgas_weakness', 'dividend_uncertainty', 'productivity_decline', 'mna_risk', 'oversupply']
  },
  {
    ticker: 'FANG',
    name: 'Diamondback Energy',
    sector: 'Energy',
    price: 152.30,
    change: -7.32,
    changePercent: -4.80,
    description: 'Diamondback facing inventory exhaustion in premium drilling locations. Permian Basin seeing increased competition.',
    recommendation: 'Strong Sell',
    confidence: 87,
    keyMetrics: {
      marketCap: '$26.8B',
      peRatio: '9.2',
      dividend: '4.2%',
      beta: '1.62'
    },
    factors: ['inventory_quality', 'service_cost', 'growth_deceleration', 'fcf_decline', 'competition']
  },
  {
    ticker: 'OXY',
    name: 'Occidental Petroleum',
    sector: 'Energy',
    price: 58.90,
    change: -2.18,
    changePercent: -3.70,
    description: 'Occidental struggling with Anadarko acquisition debt burden. Carbon capture investments not generating expected returns.',
    recommendation: 'Sell',
    confidence: 81,
    keyMetrics: {
      marketCap: '$53.7B',
      peRatio: '8.6',
      dividend: '1.5%',
      beta: '1.74'
    },
    factors: ['debt_burden', 'carbon_capture_roi', 'dividend_risk', 'asset_quality', 'anadarko']
  },
  {
    ticker: 'COP',
    name: 'ConocoPhillips',
    sector: 'Energy',
    price: 107.45,
    change: -4.41,
    changePercent: -4.10,
    description: 'ConocoPhillips facing production disruptions and operational challenges. Alaska portfolio showing signs of maturity.',
    recommendation: 'Sell',
    confidence: 83,
    keyMetrics: {
      marketCap: '$128B',
      peRatio: '11.5',
      dividend: '3.1%',
      beta: '1.12'
    },
    factors: ['production_disruptions', 'portfolio_maturity', 'lng_volatility', 'buyback_capacity', 'alaska']
  },
  {
    ticker: 'EOG',
    name: 'EOG Resources',
    sector: 'Energy',
    price: 118.25,
    change: -4.02,
    changePercent: -3.40,
    description: 'EOG Resources experiencing declining returns on capital employed. Premium drilling inventory being depleted.',
    recommendation: 'Sell',
    confidence: 79,
    keyMetrics: {
      marketCap: '$68.4B',
      peRatio: '10.3',
      dividend: '3.3%',
      beta: '1.28'
    },
    factors: ['roce_decline', 'inventory_depletion', 'ngl_pricing', 'execution', 'returns']
  }
];

export const getStocksForPortfolio = (portfolioId: string): StockData[] => {
  switch (portfolioId) {
    case 'long-contrarian':
      return LONG_CONTRARIAN_STOCKS;
    case 'short-contrarian':
      return SHORT_CONTRARIAN_STOCKS;
    case 'long-trend':
      return LONG_TREND_STOCKS;
    case 'short-trend':
      return SHORT_TREND_STOCKS;
    default:
      return [];
  }
};
