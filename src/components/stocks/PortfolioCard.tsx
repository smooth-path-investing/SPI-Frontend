import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, Calendar, Package } from 'lucide-react';
import { Portfolio } from '@/constants/portfolios';

interface PortfolioCardProps {
  portfolio: Portfolio;
  isPurchased: boolean;
  onViewPortfolio: () => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  isPurchased,
  onViewPortfolio
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl">{portfolio.name}</CardTitle>
          {isPurchased && (
            <Badge variant="default" className="bg-primary">Owned</Badge>
          )}
        </div>
        <p className="text-muted-foreground">{portfolio.shortDescription}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Expected Return</p>
                <p className="font-semibold">{portfolio.expectedReturn}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Risk Level</p>
                <Badge className={getRiskColor(portfolio.riskLevel)} variant="outline">
                  {portfolio.riskLevel}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Holdings</p>
                <p className="font-semibold">{portfolio.holdings} stocks</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Rebalance</p>
                <p className="font-semibold">{portfolio.rebalanceFrequency}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl font-bold text-foreground">${portfolio.price}</span>
              <span className="text-sm text-muted-foreground">one-time access</span>
            </div>
            <Button 
              onClick={onViewPortfolio}
              className="w-full"
              variant={isPurchased ? "default" : "outline"}
            >
              {isPurchased ? 'View Portfolio' : 'Get Access'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
