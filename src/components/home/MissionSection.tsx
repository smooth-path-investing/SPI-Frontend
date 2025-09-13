import React, { useState } from 'react';
import { KeywordModal } from '@/components/ui/keyword-modal';
import { Card } from '@/components/ui/card';

interface KeywordInfo {
  title: string;
  description: string;
  details: string[];
}

export const MissionSection: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keywordData: Record<string, KeywordInfo> = {
    'math': {
      title: 'SigGA (Signature Genetic Algorithm)',
      description: 'A proprietary quantitative modeling framework developed entirely in-house by Ramy Sukarieh.',
      details: [
        'Not an off-the-shelf or pre-packaged machine learning solution',
        'Integrates advanced mathematical tools including path signatures from rough path theory',
        'Uses genetic algorithms - a biology-inspired evolutionary computation for factor selection',
        'Features custom regression architectures to identify predictive signals in financial time series',
        'Supported by original academic research and purpose-built for asset ranking',
        'Designed for portfolio construction and signal interpretation',
        'Reflects deep domain expertise and addresses structural limitations found in standard machine learning approaches when applied to financial data'
      ]
    },
    'risk budgets': {
      title: 'Risk Budget Management & Portfolio Allocation',
      description: 'Guide investors to dial up or down risks in their portfolio based on their risk tolerance.',
      details: [
        'Aggressive investor (high risk tolerance): Hold no more than 10-13 stocks in portfolio, allocate at least 8-10% of your money in each stock',
        'Moderate investor: Aim to have 14-25 stocks portfolio, hold no less than 4-5% in each stock, with 5-10% in market index (S&P500)',
        'Conservative investor (low risk tolerance): Hold between 27-40 stocks, hold no less than 2-3% in each stock with 10-25% in market index',
        'When you sell a stock, buy another stock from the same sector or industry',
        'Our in-house AI system RAs "the Sun God of Stocks" will guide you through when to sell existing stock(s) and when to buy new ones',
        'RAs can tell you what to do if you want to buy a particular stock, but waiting until it goes down',
        'RAs can help you place a bet that makes you money while waiting until the stock goes down, such as selling put options'
      ]
    },
    'market expertise': {
      title: 'Market Expertise & Trading Principles',
      description: 'Core trading principles and market insights for successful long-term investing.',
      details: [
        'Sell only if returned at least >= 30% or 10-15% above S&P500. Always sell in 2-3 stages',
        'Increase stocks\' weights, only after at least 5-7% drop. Always buy in 2-3 stages',
        'Best stock prediction, never listen to daily news',
        'The S&P 500 has an unparalleled/unmatched desire & ability to always climb up',
        'Never bet against the S&P 500/U.S. stock market, especially long-term',
        'Never bet the world is going to end',
        'Never, sell when the market is down, especially significantly down',
        'Always, buy when the market drops, especially when it significantly drops',
        'Always, sell following 40-50% increase. But, never sell all holdings in one trade',
        'Always, have at least 3-7 stocks on your to-buy list, waiting for the right price'
      ]
    },
    'reflections': {
      title: 'Reflections',
      description: 'To be continued...',
      details: [
        'Content coming soon'
      ]
    },
    'Az2→Sp∈P': {
      title: 'Smooth Path Investing Framework',
      description: 'Encapsulates our complete investment framework from A to Z, delivering comprehensive services to put smart stock portfolios in your pocket.',
      details: [
        'A_z^2 (From A to Z, Squared): Complete and optimized investment pipeline from signal extraction to stock selection, sizing, re-sizing, balancing, re-balancing, risk calibration, and derivative overlays',
        'The "squared" aspect suggests a richer, second-order layer of refinement and depth of ranking and all service offerings',
        'Covers what/when/how/why to: buy/sell, risk/de-risk, weight/min/max stocks, + personalize AI RAs',
        'S_p (Stock Portfolios): Personalized or strategy-specific portfolio output created by our system',
        'Each portfolio is dynamically constructed based on unique combinations of company financials, macroeconomic, and market factors (e.g., PE, GDP, Gold)',
        'P (Portfolio Space): The set of all possible investment strategies generated under our modeling framework',
        'Includes contrarian, trend-following, smart beta, country/sector allocations, and more',
        'The space of dynamically generated investment strategies in your Pocket'
      ]
    }
  };

  const handleKeywordClick = (keyword: string) => {
    const keywordInfo = keywordData[keyword];
    if (keywordInfo) {
      setSelectedKeyword(keywordInfo);
      setIsModalOpen(true);
    }
  };

  const renderTextWithKeywords = (text: string) => {
    const keywords = ['math', 'risk budgets', 'market expertise', 'reflections', 'Az2→Sp∈P'];
    let result = text;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      result = result.replace(regex, `<span class="keyword-link">${keyword}</span>`);
    });
    
    return (
      <span 
        dangerouslySetInnerHTML={{ __html: result }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('keyword-link')) {
            const keyword = target.textContent || '';
            handleKeywordClick(keyword);
          }
        }}
      />
    );
  };

  const missionPoints = [
    "Make institutional stock investment available to retail investors.",
    "Integrate common sense, math, risk budgets, market expertise and reflections.",
    <>Offer A-to-Z stock investing, from signals to portfolios in your pocket, <span 
      className="keyword-link cursor-pointer font-bold text-primary hover:text-primary/80 transition-colors duration-200"
      onClick={() => handleKeywordClick('Az2→Sp∈P')}
    >
      A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P
    </span>.</>,
    "Order, segregate, integrate, condition, exclude, and concentrate"
  ];

  return (
    <>
      <KeywordModal 
        keyword={selectedKeyword}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transforming institutional-grade investment strategies for every investor
            </p>
          </div>
          
          {/* Mission Points Grid */}
          <div className="grid gap-8 md:gap-10">
            {missionPoints.map((point, index) => (
              <Card key={index} className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="p-8 sm:p-10">
                  <div className="flex items-start gap-6">
                    {/* Number Badge */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                          <span className="text-lg font-bold text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground group-hover:text-foreground transition-colors duration-300">
                        {typeof point === 'string' ? renderTextWithKeywords(point) : point}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};