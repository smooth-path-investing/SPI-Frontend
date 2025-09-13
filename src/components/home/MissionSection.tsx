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
    "Offer A-to-Z stock investing, from signals to portfolios in your pocket, Az2→Sp∈P.",
    "Order, segregate, integrate, condition, exclude, and concentrate"
  ];

  return (
    <>
      <KeywordModal 
        keyword={selectedKeyword}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-foreground tracking-wide">
              Our Mission
            </h2>
          </div>
          
          <div className="space-y-12">
            {missionPoints.map((point, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-0.5 bg-muted-foreground/30 group-hover:bg-primary/50 transition-colors duration-300"></div>
                  <span className="mx-4 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300 tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-0.5 bg-muted-foreground/30 group-hover:bg-primary/50 transition-colors duration-300"></div>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-foreground/90 group-hover:text-foreground transition-colors duration-300 max-w-3xl mx-auto">
                  {typeof point === 'string' ? renderTextWithKeywords(point) : point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};