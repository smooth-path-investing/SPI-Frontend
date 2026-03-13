import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ChartCardProps {
  header: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}

const CHART_CARD_CLASS =
  'h-full overflow-hidden bg-[var(--card-bg)] border border-white/35 text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex flex-col';

const CHART_CARD_HEADER_CLASS =
  'flex min-h-[130px] sm:min-h-[138px] flex-col justify-between gap-3 px-5 py-5 sm:px-6 sm:py-6';

const CHART_CARD_CONTENT_CLASS = 'flex-1 p-4 sm:p-6';

export const ChartCard: React.FC<ChartCardProps> = ({
  header,
  children,
  contentClassName = CHART_CARD_CONTENT_CLASS,
}) => {
  return (
    <Card className={CHART_CARD_CLASS}>
      <div className={CHART_CARD_HEADER_CLASS}>{header}</div>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
};
