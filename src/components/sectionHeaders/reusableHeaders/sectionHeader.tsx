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
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.12] text-[var(--foreground)] mb-4 sm:mb-5 max-w-3xl mx-auto">
        {shouldSplit ? (
          <>
            {splitText[0]}
            <span className="block">for {splitText[1]}</span>
          </>
        ) : (
          mainText
        )}
        <span className="block h-[2px] w-24 sm:w-28 mx-auto mt-4 bg-[var(--accent)]" />
      </h2>

      {subText && (
        <p className="text-sm sm:text-base lg:text-lg text-[var(--muted-text)] max-w-3xl mx-auto px-2 leading-relaxed">
          {subText}
        </p>
      )}
    </div>
  );
};
