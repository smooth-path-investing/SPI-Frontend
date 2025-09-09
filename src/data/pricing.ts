export const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Basic market insights',
    features: [
      'Weekly market updates',
      'Basic stock analysis',
      'Performance dashboard',
      'Community access'
    ],
    limitations: [
      'No stock recommendations',
      'Limited historical data',
      'No advanced analytics'
    ],
    buttonText: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'Complete investment toolkit',
    features: [
      'All Free features',
      'AI-powered stock picks',
      'Real-time alerts',
      'Advanced analytics',
      'Risk assessment tools',
      'Portfolio optimization',
      'Priority support'
    ],
    limitations: [],
    buttonText: 'Start Pro Trial',
    popular: true
  },
  {
    name: 'Elite',
    price: '$149',
    period: '/month',
    description: 'Professional-grade analysis',
    features: [
      'All Pro features',
      'Custom strategies',
      '1-on-1 consultation',
      'Institutional-grade research',
      'API access',
      'White-label reports',
      'Dedicated account manager'
    ],
    limitations: [],
    buttonText: 'Contact Sales',
    popular: false
  }
];