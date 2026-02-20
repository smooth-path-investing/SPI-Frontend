// src/components/mission/MissionPoint.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { KEYWORDS } from '@/constants/keywords';

interface MissionPointProps {
  point: string;
  index: number;
  onKeywordClick: (keyword: string) => void;
}

/** Formula Block for index 3 */
const FormulaBlock: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        relative z-10 mt-4 sm:mt-6 md:mt-10
        flex flex-wrap items-center justify-center gap-2 sm:gap-3
        cursor-pointer select-none
        transition-transform duration-300 hover:scale-[1.02]
        text-[var(--accent)]
      "
    >
      {/* Az² */}
      <span className="text-xl sm:text-2xl md:text-3xl flex items-center">
        A<sup className="font-bold text-[0.55em] sm:text-[0.65em] md:text-[0.7em]">2</sup>z
      </span>

      {/* Arrow */}
      <span className="mx-1 sm:mx-2 text-sm sm:text-base md:text-lg font-mono">→</span>

      {/* Si */}
      <span className="text-xl sm:text-2xl md:text-3xl flex items-baseline">
        S<sub className="text-[0.55em] sm:text-[0.65em] md:text-[0.7em] ml-0.5">i</sub>
      </span>

      {/* ∈ */}
      <span className="mx-1 sm:mx-2 text-sm sm:text-base md:text-lg font-mono">∈</span>

      {/* P */}
      <span className="text-xl sm:text-2xl md:text-3xl font-bold">P</span>
    </div>
  );
};

export const MissionPoint: React.FC<MissionPointProps> = ({ point, index, onKeywordClick }) => {
  /** Highlight and attach onClick to keywords in text */
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
              cursor-pointer
              font-semibold
              px-2
              py-0.5
              text-[var(--accent)]
              hover:text-[var(--accent-light)]
              hover:scale-110
              transform-gpu
              transition-all duration-300
              antialiased
              hover:drop-shadow-[0_0_4px_var(--accent)]
              rounded
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
    mb-6 sm:mb-0
    bg-[var(--card-bg)]
    border border-[var(--card-border)]
    px-5 py-6 sm:p-8 lg:p-12
    rounded-[var(--radius)]
    transition-all duration-300
    sm:hover:-translate-y-0.5
    hover:border-[var(--accent)]/70
    hover:shadow-[0_10px_26px_rgba(0,0,0,0.2)]
    min-h-fit sm:min-h-fit
    relative
  "
    >
      {/* Section number */}
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
          tracking-wide text-[var(--foreground)]/85 text-center
          antialiased
        "
      >
        {renderTextWithInteractions(point)}
      </div>

      {/* Formula block for index 3 */}
      {index === 3 && <FormulaBlock onClick={() => onKeywordClick('Az2→Sp∈P')} />}
    </Card>
  );
};
