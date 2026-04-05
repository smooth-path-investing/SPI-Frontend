import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface PortfolioMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}

export const PortfolioMetricCard: React.FC<PortfolioMetricCardProps> = ({
  icon: Icon,
  label,
  value,
  className = '',
}) => {
  return (
    <div
      className={`flex min-h-[112px] flex-col justify-between rounded-[24px] border border-[var(--card-border)]/80 bg-black/20 px-4 py-4 text-center shadow-[0_18px_34px_rgba(0,0,0,0.12)] sm:px-5 ${className}`}
    >
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10">
        <Icon className="h-5 w-5 text-[var(--accent)]" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted-text)]">{label}</p>
      {typeof value === 'string' || typeof value === 'number' ? (
        <p className="font-semibold text-[var(--foreground)]">{value}</p>
      ) : (
        <div className="flex justify-center">{value}</div>
      )}
    </div>
  );
};

interface PortfolioStatCardProps {
  label: string;
  value: string;
  className?: string;
}

export const PortfolioStatCard: React.FC<PortfolioStatCardProps> = ({
  label,
  value,
  className = '',
}) => {
  return (
    <Card
      className={`overflow-hidden rounded-[24px] border border-[var(--card-border)] bg-gradient-to-b from-[var(--card-bg)] to-black/35 shadow-[0_14px_32px_rgba(0,0,0,0.18)] ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};
