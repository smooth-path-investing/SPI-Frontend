import React from 'react';
import { cn } from '@/lib/utils';

interface ChartTooltipShellProps {
  children: React.ReactNode;
  className?: string;
}

export const ChartTooltipShell: React.FC<ChartTooltipShellProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'min-w-[176px] rounded-[20px] border border-white/16 bg-[linear-gradient(180deg,rgba(18,24,38,0.96),rgba(8,11,18,0.92))] px-4 py-3.5 text-left shadow-[0_24px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/5 backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  );
};
