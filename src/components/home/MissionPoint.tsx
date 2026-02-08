import React from 'react';
import { Card } from '@/components/ui/card';
import { KEYWORDS } from '@/constants/keywords';

interface MissionPointProps {
  point: string;
  index: number;
  onKeywordClick: (keyword: string) => void;
}

export const MissionPoint: React.FC<MissionPointProps> = ({ point, index, onKeywordClick }) => {
  const renderTextWithInteractions = (text: string) => {
    const escapedKeywords = KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const originalKeyword = KEYWORDS.find((k) => k.toLowerCase() === part.toLowerCase());

      if (originalKeyword) {
        return (
          <span
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              onKeywordClick(originalKeyword);
            }}
            className="cursor-pointer text-[#EAB308] font-bold px-1 rounded-sm hover:bg-[#EAB308]/10 transition-all duration-300 antialiased"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl p-8 sm:p-10 flex flex-col justify-center items-center text-center bg-[#030303] border border-white/[0.05] hover:border-[#EAB308]/30 transition-all duration-500 min-h-[220px]">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EAB308]/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Content: Tightened leading to 1.4 for a professional feel */}
      <div className="relative z-10 text-base sm:text-lg lg:text-xl font-medium leading-[1.4] text-white/90 tracking-tight antialiased">
        {renderTextWithInteractions(point)}
      </div>

      {/* Formula: Optimized spacing and dimmed operators */}
      {index === 3 && (
        <div
          className="relative z-10 mt-8 font-mono text-2xl tracking-[0.05em] text-[#EAB308] cursor-pointer select-none hover:scale-[1.02] transition-transform duration-300 flex items-baseline gap-1"
          onClick={() => onKeywordClick('Az2→Sp∈P')}
        >
          <span>
            A<sub>z</sub>
            <sup>2</sup>
          </span>
          <span className="mx-1 text-white font-sans italic text-xl">→</span>
          <span>
            S<sub>i</sub>
          </span>
          <span className="mx-1 text-white font-sans text-xl">∈</span>
          <span>P</span>
        </div>
      )}
    </Card>
  );
};
