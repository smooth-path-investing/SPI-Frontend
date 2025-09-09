import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface PremiumStocksHiddenProps {
  onShowPremiumStocks: () => void;
}

export const PremiumStocksHidden: React.FC<PremiumStocksHiddenProps> = ({ onShowPremiumStocks }) => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-12">
                <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Premium Stocks Hidden</h2>
                <p className="text-muted-foreground mb-6">
                  Premium stock features are currently hidden for testing purposes. 
                  Click on your profile in the navigation to toggle them back on.
                </p>
                <Button 
                  onClick={onShowPremiumStocks}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Show Premium Stocks
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};