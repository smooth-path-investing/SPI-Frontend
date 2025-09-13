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
      title: 'Risk Budget Management',
      description: 'Strategic allocation of risk to maximize returns while protecting capital.',
      details: [
        'Systematic risk allocation across asset classes',
        'Dynamic position sizing based on volatility',
        'Stress testing under various market conditions',
        'Portfolio-level risk monitoring and adjustment'
      ]
    },
    'market expertise': {
      title: 'Market Expertise',
      description: 'Deep understanding of market dynamics and institutional insights.',
      details: [
        'Sector-specific analysis and industry knowledge',
        'Institutional-grade research and due diligence',
        'Market timing and cyclical awareness',
        'Regulatory and macroeconomic impact assessment'
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
    const keywords = ['math', 'risk budgets', 'market expertise'];
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
    <>Offer A-to-Z stock investing, from signals to portfolios in your pocket, A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P.</>,
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