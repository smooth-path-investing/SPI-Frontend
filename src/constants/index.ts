import { IStock, IPerformanceMetric, IApproachSection, INavItem, ITeamMember } from '../types';

export const NAVIGATION_ITEMS: INavItem[] = [
  { label: 'Our Approach', href: '/approach' },
  { label: 'Backtests', href: '/performance' },
  { label: 'Recommended Stocks', href: '/stocks' },
  { label: 'Portfolio Simulator', href: '/backtest' },
  { label: 'About Us', href: '/about' }
];

export const SAMPLE_STOCKS: IStock[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 185.25,
    change: 2.15,
    changePercent: 1.17,
    reason: ['Strong earnings growth', 'Dominant market position', 'Strong cash flow'],
    indicators: ['High RSI momentum', 'Beating EPS 3Q straight', 'AI factor score: 9.2/10']
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 412.80,
    change: -1.25,
    changePercent: -0.30,
    reason: ['Cloud growth acceleration', 'AI integration leadership', 'Subscription model strength'],
    indicators: ['Revenue growth trending up', 'Market leader in cloud', 'Strong balance sheet']
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: 3.42,
    changePercent: 2.46,
    reason: ['Search dominance', 'YouTube revenue growth', 'AI capabilities'],
    indicators: ['Technical breakout pattern', 'Undervalued vs peers', 'Strong ad revenue recovery']
  }
];

export const PERFORMANCE_METRICS: IPerformanceMetric[] = [
  { label: 'Total Return', value: '+23.4%', change: '+2.1%', isPositive: true },
  { label: 'Sharpe Ratio', value: '1.42', change: '+0.08', isPositive: true },
  { label: 'Max Drawdown', value: '-8.2%', change: '+1.3%', isPositive: true },
  { label: 'Win Rate', value: '68%', change: '+4%', isPositive: true }
];

export const APPROACH_SECTIONS: IApproachSection[] = [
  {
    title: 'Factor Models',
    description: 'Multi-factor quantitative models analyzing fundamentals, technicals, and sentiment',
    icon: '📊',
    details: [
      'Value, Growth, Quality, and Momentum factors',
      'Sector-specific factor adjustments',
      'Real-time factor score updates'
    ]
  },
  {
    title: 'AI Signals',
    description: 'Machine learning algorithms processing market data and alternative datasets',
    icon: '🤖',
    details: [
      'Neural networks for pattern recognition',
      'Sentiment analysis from news and social media',
      'Alternative data integration'
    ]
  },
  {
    title: 'Backtested Rules',
    description: 'Rigorously tested investment rules based on historical market performance',
    icon: '📈',
    details: [
      '10+ years of historical validation',
      'Out-of-sample testing protocols',
      'Risk-adjusted performance metrics'
    ]
  }
];

export const TEAM_MEMBERS: ITeamMember[] = [
  {
    id: '1',
    name: 'Ramy Sukarieh',
    role: 'Chief Investment Officer',
    bio: 'Quantitative researcher and algorithm developer with expertise in financial modeling',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Ramy leads our quantitative research team and has developed proprietary factor models that consistently outperform market benchmarks.',
      achievements: [
        'Developed ML models with 23% annual returns',
        'Published 12 research papers on factor investing',
        'Led $2B+ institutional portfolio management'
      ],
      experience: [
        'Senior Quantitative Researcher (2015-2023)',
        'Portfolio Analyst (2012-2015)',
        'PhD in Financial Engineering (2010-2012)'
      ],
      websites: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/ramysukarieh' },
        { label: 'Research Papers', url: 'https://scholar.google.com/ramysukarieh' }
      ]
    }
  },
  {
    id: '2',
    name: 'Fadel Kassab',
    role: 'Head of AI & Machine Learning',
    bio: 'AI researcher specializing in financial market prediction algorithms and machine learning',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Fadel architected our AI-driven stock selection system, combining deep learning with traditional financial analysis.',
      achievements: [
        'Built neural networks processing 1M+ data points daily',
        'Improved prediction accuracy by 40% over traditional models',
        'Led AI development for financial applications'
      ],
      experience: [
        'Senior Research Scientist (2018-2023)',
        'Research Engineer (2016-2018)',
        'PhD in Computer Science, AI Focus (2014-2016)'
      ],
      websites: [
        { label: 'GitHub', url: 'https://github.com/fadelkassab' },
        { label: 'AI Research Blog', url: 'https://fadelai.blog' }
      ]
    }
  },
  {
    id: '3',
    name: 'Karim Alameh',
    role: 'Director of Risk Management',
    bio: 'Risk management expert with extensive derivatives and portfolio construction experience',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Karim ensures our strategies maintain optimal risk-adjusted returns through sophisticated portfolio construction and hedging techniques.',
      achievements: [
        'Reduced portfolio volatility by 35% while maintaining returns',
        'Managed $5B+ derivatives portfolio',
        'Created proprietary risk assessment framework'
      ],
      experience: [
        'VP Risk Management (2017-2023)',
        'Risk Analyst (2014-2017)',
        'MBA in Finance (2012-2014)'
      ],
      websites: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/karimalamet' },
        { label: 'Risk Management Blog', url: 'https://riskinsights.karim.com' }
      ]
    }
  },
  {
    id: '4',
    name: 'Jason',
    role: 'Senior Financial Analyst',
    bio: 'Financial analyst with deep expertise in market research and strategic investment planning',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Jason provides comprehensive market analysis and strategic insights to support our investment decision-making process.',
      achievements: [
        'Identified high-growth opportunities with 30%+ returns',
        'Developed comprehensive market analysis frameworks',
        'Successfully managed multi-million dollar portfolios'
      ],
      experience: [
        'Senior Financial Analyst (2019-2023)',
        'Investment Analyst (2016-2019)',
        'CFA Charter (2018)'
      ],
      websites: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/jason' },
        { label: 'Market Analysis Blog', url: 'https://marketinsights.jason.com' }
      ]
    }
  },
  {
    id: '5',
    name: 'Member 1',
    role: 'Head of Research',
    bio: 'Research director specializing in emerging markets and alternative investment strategies',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Sarah leads our research initiatives, identifying new market opportunities and developing innovative investment strategies.',
      achievements: [
        'Discovered untapped sectors delivering 45% returns',
        'Published 25+ investment research reports',
        'Led research team of 15+ analysts'
      ],
      experience: [
        'Head of Research (2020-2023)',
        'Senior Research Analyst (2017-2020)',
        'PhD in Economics (2015-2017)'
      ],
      websites: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/sarahchen' },
        { label: 'Research Publications', url: 'https://research.sarahchen.com' }
      ]
    }
  },
  {
    id: '6',
    name: 'Member 2',
    role: 'Data Science Lead',
    bio: 'Data scientist focused on alternative datasets and predictive modeling for financial markets',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Michael harnesses big data and advanced analytics to uncover market signals invisible to traditional analysis.',
      achievements: [
        'Built models processing 10TB+ of market data daily',
        'Improved signal accuracy by 55% using satellite data',
        'Created proprietary ESG scoring algorithms'
      ],
      experience: [
        'Senior Data Scientist (2018-2023)',
        'Data Analyst (2015-2018)',
        'MS in Statistics & Machine Learning (2013-2015)'
      ],
      websites: [
        { label: 'GitHub', url: 'https://github.com/michaeltorres' },
        { label: 'Data Science Portfolio', url: 'https://datascience.torres.com' }
      ]
    }
  },
  {
    id: '7',
    name: 'Member 3',
    role: 'Portfolio Strategy Director',
    bio: 'Strategic portfolio architect with expertise in asset allocation and systematic trading',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Emily designs and optimizes our portfolio construction strategies, ensuring consistent risk-adjusted performance across market cycles.',
      achievements: [
        'Achieved 28% annual returns with 15% volatility',
        'Developed multi-asset allocation framework',
        'Managed $3B+ in systematic strategies'
      ],
      experience: [
        'Portfolio Strategy Director (2019-2023)',
        'Quantitative Portfolio Manager (2016-2019)',
        'CFA & FRM Certified (2016)'
      ],
      websites: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/emilyrodriguez' },
        { label: 'Strategy Insights', url: 'https://portfolio.emily.com' }
      ]
    }
  }
];
