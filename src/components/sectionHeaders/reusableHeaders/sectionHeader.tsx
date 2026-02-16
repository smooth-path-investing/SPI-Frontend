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
    <div className={`text-center mb-12 sm:mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-[var(--foreground)] mb-4 sm:mb-6 max-w-3xl mx-auto">
        {shouldSplit ? (
          <>
            {splitText[0]}
            <span className="block">for {splitText[1]}</span>
          </>
        ) : (
          mainText
        )}
        <span className="block h-[2px] w-1/2 mx-auto mt-4 bg-[var(--accent)]" />
      </h2>

      {subText && (
        <p className="text-base sm:text-lg lg:text-2xl text-[var(--muted-text)] max-w-4xl mx-auto px-2">
          {subText}
        </p>
      )}
    </div>
  );
};
