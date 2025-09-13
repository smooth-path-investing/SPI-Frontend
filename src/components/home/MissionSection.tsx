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
      title: 'Mathematical Analysis',
      description: 'Rigorous quantitative models drive our investment decisions.',
      details: [
        'Statistical analysis of market patterns and trends',
        'Algorithmic risk assessment and probability calculations',
        'Mathematical modeling of portfolio optimization',
        'Quantitative backtesting of investment strategies'
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
    <section className="relative min-h-screen flex items-center py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {missionPoints.map((point, index) => (
            <Card key={index} className="group relative p-8 border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-foreground font-bold text-lg">→</span>
                </div>
                <p className="text-lg sm:text-xl text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">
                  {typeof point === 'string' ? renderTextWithKeywords(point) : point}
                </p>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};