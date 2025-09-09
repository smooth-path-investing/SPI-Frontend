
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRICING_PLANS } from '../data/pricing';

export const Pricing: React.FC = () => {
  const plans = [
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-20 pb-8 sm:pt-24 sm:pb-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 text-foreground">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto px-2">
            Get access to AI-powered stock recommendations and professional-grade investment tools
          </p>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'} ${index === 1 ? 'lg:scale-105 lg:z-10' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-2 sm:mt-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm sm:text-base text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Included:</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Not included:</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start">
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-muted-foreground leading-tight">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-2 sm:pt-4">
                  <Button 
                    className={`w-full text-sm sm:text-base py-2.5 sm:py-3 ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="bg-muted rounded-lg p-4 sm:p-6 lg:p-8 text-center mx-2 sm:mx-0">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4">Need a Custom Solution?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2 leading-relaxed">
            Enterprise plans available with custom integrations, dedicated infrastructure, and personalized support.
          </p>
          <Button variant="outline" size="lg" className="text-sm sm:text-base">
            Contact Enterprise Sales
          </Button>
        </div>
      </div>
    </div>
  );
};
