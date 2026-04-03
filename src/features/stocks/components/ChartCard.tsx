import React from 'react';
import { cn } from '@/lib/utils';
import { FeatureSurface } from '@/components/ui/feature-surface';

interface ChartCardProps {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const CHART_CARD_CLASS = 'h-full';

const CHART_CARD_HEADER_CLASS =
  'flex min-h-[138px] flex-col justify-between gap-4 border-b border-white/10 px-5 py-5 sm:min-h-[146px] sm:px-6 sm:py-6';

const CHART_CARD_CONTENT_CLASS = 'flex-1 px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-5';

export const ChartCard: React.FC<ChartCardProps> = ({
  header,
  children,
  className,
  headerClassName,
  contentClassName = CHART_CARD_CONTENT_CLASS,
}) => {
  return (
    <FeatureSurface className={cn(CHART_CARD_CLASS, className)} contentClassName="flex h-full flex-col">
      <div className={cn(CHART_CARD_HEADER_CLASS, headerClassName)}>{header}</div>
      <div className={cn(contentClassName)}>{children}</div>
    </FeatureSurface>
  );
};
