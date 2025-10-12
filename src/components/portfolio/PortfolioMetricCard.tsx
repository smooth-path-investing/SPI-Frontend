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
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Icon className="w-6 h-6 text-primary" />
      <p className="text-xs text-muted-foreground">{label}</p>
      {typeof value === 'string' || typeof value === 'number' ? (
        <p className="font-semibold">{value}</p>
      ) : (
        value
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
  className = ''
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};
