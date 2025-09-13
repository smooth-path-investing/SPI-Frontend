import React from 'react';
import { Card } from '@/components/ui/card';
import { KEYWORDS } from '@/constants/keywords';

interface MissionPointProps {
  point: string | React.ReactNode;
  index: number;
  onKeywordClick: (keyword: string) => void;
}

export const MissionPoint: React.FC<MissionPointProps> = ({ 
  point, 
  index, 
  onKeywordClick 
}) => {
  const renderTextWithKeywords = (text: string) => {
    let result = text;
    
    KEYWORDS.forEach(keyword => {
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
            onKeywordClick(keyword);
          }
        }}
      />
    );
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
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
  );
};