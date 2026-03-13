import React from 'react';

interface SectionHeaderProps {
  mainText: string;
  subText?: string;
  className?: string;
}

export const SectionHeader = ({
  mainText,
  subText,
  className = '',
}: SectionHeaderProps): JSX.Element => {
  const splitText = mainText.split(' for ');

  const shouldSplit = splitText.length === 2;

  return (
    <div className={`text-center mb-10 sm:mb-14 ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-semibold tracking-[-0.03em] leading-[1.08] text-[var(--foreground)] mb-4 sm:mb-5 max-w-4xl mx-auto">
        {shouldSplit ? (
          <>
            {splitText[0]}
            <span className="block">for {splitText[1]}</span>
          </>
        ) : (
          mainText
        )}
        <span className="block h-[2px] w-24 sm:w-28 mx-auto mt-5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
      </h2>

      {subText && (
        <p className="text-sm sm:text-base lg:text-lg text-[var(--muted-text)]/95 max-w-3xl mx-auto px-2 leading-relaxed">
          {subText}
        </p>
      )}
    </div>
  );
};
