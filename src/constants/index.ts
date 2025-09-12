import { IStock, IPerformanceMetric, IApproachSection, INavItem, ITeamMember } from '../types';

export const NAVIGATION_ITEMS: INavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Approach', href: '/approach' },
  { label: 'Backtests', href: '/performance' },
  { label: 'Recommended Stocks', href: '/stocks' }
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
    name: 'Sarah Chen',
    role: 'Chief Investment Officer',
    bio: 'Former Goldman Sachs quantitative researcher with 15+ years in algorithmic trading',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Sarah leads our quantitative research team and has developed proprietary factor models that consistently outperform market benchmarks.',
      achievements: [
        'Developed ML models with 23% annual returns',
        'Published 12 research papers on factor investing',
        'Led $2B+ institutional portfolio at Goldman Sachs'
      ],
      experience: [
        'Goldman Sachs - Senior Quantitative Researcher (2015-2023)',
        'BlackRock - Portfolio Analyst (2012-2015)',
        'MIT - PhD in Financial Engineering (2010-2012)'
      ],
      websites: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/sarahchen' },
        { label: 'Research Papers', url: 'https://scholar.google.com/sarahchen' }
      ]
    }
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Head of AI & Machine Learning',
    bio: 'Former Google AI researcher specializing in financial market prediction algorithms',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Marcus architected our AI-driven stock selection system, combining deep learning with traditional financial analysis.',
      achievements: [
        'Built neural networks processing 1M+ data points daily',
        'Improved prediction accuracy by 40% over traditional models',
        'Led AI team at Google focusing on financial applications'
      ],
      experience: [
        'Google AI - Senior Research Scientist (2018-2023)',
        'DeepMind - Research Engineer (2016-2018)',
        'Stanford - PhD in Computer Science, AI Focus (2014-2016)'
      ],
      websites: [
        { label: 'GitHub', url: 'https://github.com/marcusrodriguez' },
        { label: 'AI Research Blog', url: 'https://marcusai.blog' }
      ]
    }
  },
  {
    id: '3',
    name: 'Emily Thompson',
    role: 'Director of Risk Management',
    bio: 'Risk management expert with background at JP Morgan and extensive derivatives experience',
    image: '/placeholder.svg',
    portfolio: {
      description: 'Emily ensures our strategies maintain optimal risk-adjusted returns through sophisticated portfolio construction and hedging techniques.',
      achievements: [
        'Reduced portfolio volatility by 35% while maintaining returns',
        'Managed $5B+ derivatives portfolio at JP Morgan',
        'Created proprietary risk assessment framework'
      ],
      experience: [
        'JP Morgan - VP Risk Management (2017-2023)',
        'Morgan Stanley - Risk Analyst (2014-2017)',
        'Wharton - MBA in Finance (2012-2014)'
      ],
      websites: [
        { label: 'LinkedIn', url: 'https://linkedin.com/in/emilythompson' },
        { label: 'Risk Management Blog', url: 'https://riskinsights.emily.com' }
      ]
    }
  }
];
