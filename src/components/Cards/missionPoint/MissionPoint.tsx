import React, { type ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { KEYWORD_DATA, KEYWORDS } from '@/constants/keywords';

interface MissionPointProps {
  point: string;
  index: number;
}

const keywordBaseClassName =
  'inline-block align-baseline cursor-help font-semibold px-2 py-0.5 text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors duration-300 antialiased rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]';

const keywordTooltipClassName =
  'max-w-sm sm:max-w-md border-2 border-[var(--accent)]/80 bg-[var(--card-bg)] text-[var(--foreground)] shadow-[0_0_0_1px_rgba(234,179,8,0.25)]';

const FormulaBlock: React.FC = () => {
  return (
    <span
      className="
        relative z-10 mt-4 sm:mt-6 md:mt-10
        flex flex-wrap items-center justify-center gap-2 sm:gap-3
        select-none text-[var(--accent)]
      "
    >
      <span className="text-xl sm:text-2xl md:text-3xl inline-flex items-baseline">
        <span className="relative inline-block pr-[0.28em] leading-none">
          <span className="mr-[-0.08em] inline-block">A</span>
          <span className="absolute left-full top-1/2 ml-0 -translate-y-1/2 inline-flex flex-col items-center leading-none">
            <sup className="font-bold text-[0.5em] sm:text-[0.58em] md:text-[0.62em] leading-none">
              2
            </sup>
            <sub className="text-[0.5em] sm:text-[0.58em] md:text-[0.62em] leading-none -mt-[0.08em]">
              z
            </sub>
          </span>
        </span>
      </span>
      <span className="mx-1 sm:mx-2 text-sm sm:text-base md:text-lg font-mono">→</span>
      <span className="text-xl sm:text-2xl md:text-3xl flex items-baseline">
        S<sub className="text-[0.55em] sm:text-[0.65em] md:text-[0.7em] ml-0.5">i</sub>
      </span>
      <span className="mx-1 sm:mx-2 text-sm sm:text-base md:text-lg font-mono">∈</span>
      <span className="text-xl sm:text-2xl md:text-3xl font-bold">P</span>
    </span>
  );
};

const KeywordTooltip = ({ keyword, children }: { keyword: string; children: ReactNode }) => {
  const keywordInfo = KEYWORD_DATA[keyword.toLowerCase()];

  if (!keywordInfo) {
    return <>{children}</>;
  }

  return (
    <Tooltip delayDuration={120}>
      <TooltipTrigger asChild>
        <button type="button" className={keywordBaseClassName} onClick={(e) => e.stopPropagation()}>
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent className={keywordTooltipClassName}>
        <p className="text-xs sm:text-sm uppercase tracking-[0.12em] text-[var(--accent)] mb-1.5">
          {keywordInfo.title}
        </p>
        <p className="text-[15px] sm:text-base leading-relaxed text-[var(--foreground)]">
          {keywordInfo.description}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export const MissionPoint: React.FC<MissionPointProps> = ({ point, index }) => {
  const renderTextWithInteractions = (text: string) => {
    const escapedKeywords = KEYWORDS.map((keyword) =>
      keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    );
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, partIndex) => {
      const originalKeyword = KEYWORDS.find((keyword) => keyword.toLowerCase() === part.toLowerCase());
      if (originalKeyword) {
        return (
          <KeywordTooltip key={`${index}-${partIndex}`} keyword={originalKeyword}>
            {part}
          </KeywordTooltip>
        );
      }

      return <React.Fragment key={`${index}-${partIndex}`}>{part}</React.Fragment>;
    });
  };

  return (
    <Card
      className="
        relative mb-6 min-h-fit overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/35 px-5 py-6 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 sm:mb-0 sm:min-h-fit sm:hover:-translate-y-0.5 sm:p-8 hover:border-[var(--accent)]/70 hover:shadow-[0_18px_38px_rgba(0,0,0,0.24)] lg:p-12
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />

      <div
        className="
          relative z-10
          text-sm sm:text-base md:text-lg
          font-light
          leading-[1.5] sm:leading-[1.65]
          tracking-wide text-[var(--foreground)]/88 text-center
          antialiased
        "
      >
        {renderTextWithInteractions(point)}
      </div>

      {index === 3 && (
        <div className="flex justify-center">
          <KeywordTooltip keyword="Az2→Sp∈P">
            <FormulaBlock />
          </KeywordTooltip>
        </div>
      )}
    </Card>
  );
};
