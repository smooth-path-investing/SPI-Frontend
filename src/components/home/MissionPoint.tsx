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
    // Escape special characters in keywords (like → and ∈) for the Regex
    const escapedKeywords = KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      // Find the original keyword matching the part (case-insensitive)
      const originalKeyword = KEYWORDS.find((k) => k.toLowerCase() === part.toLowerCase());

      if (originalKeyword) {
        return (
          <span
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              // Pass the ORIGINAL keyword (exactly as it appears in KEYWORD_DATA)
              onKeywordClick(originalKeyword);
            }}
            className="cursor-pointer text-yellow-500 font-bold border-b border-dashed border-yellow-500/30 hover:border-yellow-500 hover:text-yellow-400 transition-all duration-300"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Card className="group relative overflow-hidden rounded-2xl p-10 flex flex-col justify-center items-center text-center bg-black border border-white/10 hover:border-yellow-500/40 shadow-2xl transition-all duration-700 min-h-[250px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 text-lg sm:text-xl font-medium leading-relaxed text-white/90 tracking-tight">
        {renderTextWithInteractions(point)}
      </div>

      {index === 3 && (
        <div
          className="relative z-10 mt-10 font-mono text-2xl tracking-[0.15em] text-yellow-500/90 cursor-pointer hover:text-yellow-400 transition-colors"
          onClick={() => onKeywordClick('Az2→Sp∈P')}
        >
          <span>
            A<sub>z</sub>
            <sup>2</sup>
          </span>
          <span>→</span>
          <span>
            S<sub>i</sub>
          </span>
          <span>∈</span>
          <span>P</span>
        </div>
      )}
    </Card>
  );
};
