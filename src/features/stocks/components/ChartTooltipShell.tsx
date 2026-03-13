import React from 'react';

interface ChartTooltipShellProps {
  children: React.ReactNode;
}

export const ChartTooltipShell: React.FC<ChartTooltipShellProps> = ({ children }) => {
  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 px-3.5 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
      {children}
    </div>
  );
};
