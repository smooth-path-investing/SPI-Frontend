// src/components/mission/MissionPoint.tsx
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
            className="
              inline-block
              cursor-pointer font-semibold px-1
              text-[var(--accent)]
              hover:text-[var(--accent-light)]
              hover:scale-[1.02]
              transform-gpu
              transition-all duration-300
              antialiased
            "
          >
            {part}
          </span>
        );
      }

      return part;
    });
  };

  return (
    <Card
      className="
        group relative overflow-hidden rounded-xl
        p-4 sm:p-8 md:p-10
        flex flex-col justify-center items-center text-center
        bg-transparent border border-[#222]
        transition-all duration-500
        hover:border-[var(--accent)]/40 hover:bg-[#0A0A0A]
        min-h-[200px] sm:min-h-[220px]
      "
    >
      {/* Subtle glow on hover */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.08),transparent_70%)]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
          pointer-events-none
        "
      />

      {/* Utility label (dashboard detail) */}
      <div
        className="
          absolute top-3 left-4
          text-[10px] tracking-widest
          text-white/30
          font-mono
        "
      >
        SEC. 0{index + 1} // CORE
      </div>

      {/* Main content */}
      <div
        className="
          relative z-10
          text-sm sm:text-base md:text-lg
          font-light
          leading-[1.5] sm:leading-[1.65]
          tracking-wide text-white/80
          antialiased
        "
      >
        {renderTextWithInteractions(point)}
      </div>

      {/* Formula block */}
      {index === 3 && (
        <div
          onClick={() => onKeywordClick('Az2→Sp∈P')}
          className="
            relative z-10 mt-4 sm:mt-6 md:mt-10
            font-mono
            text-xl sm:text-2xl md:text-3xl
            flex flex-wrap items-center justify-center
            gap-1 sm:gap-2
            cursor-pointer select-none
            transition-transform duration-500
            hover:scale-[1.02]
            text-[var(--accent)]
          "
        >
          {/* Term 1: Az^2 */}
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl md:text-3xl">A</span>
            <span className="ml-0.5 flex flex-col items-center leading-none">
              <span className="text-[0.55em] sm:text-[0.65em] md:text-[0.7em] font-bold">2</span>
              <span className="text-[0.55em] sm:text-[0.65em] md:text-[0.7em]">z</span>
            </span>
          </div>

          <span className="font-mono text-white text-sm sm:text-base md:text-lg mx-1 sm:mx-2">
            →
          </span>

          <div className="flex items-baseline">
            <span className="leading-none text-xl sm:text-2xl md:text-3xl">S</span>
            <span className="text-[0.55em] sm:text-[0.65em] md:text-[0.7em] ml-0.5 translate-y-[0.1em]">
              i
            </span>
          </div>

          <span className="font-mono text-white text-sm sm:text-base md:text-lg mx-1 sm:mx-2">
            ∈
          </span>

          <span className="leading-none font-bold text-xl sm:text-2xl md:text-3xl">P</span>
        </div>
      )}
    </Card>
  );
};
