import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Star, TrendingUp, BarChart3 } from 'lucide-react';

interface AccessDeniedProps {
  isAuthenticated: boolean;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ isAuthenticated }) => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Premium Stock Recommendations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our AI-powered stock picks with a Pro or Elite subscription
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-12">
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Unlock Premium Features</h2>
              <p className="text-muted-foreground mb-6">
                Get access to our carefully curated stock recommendations, advanced analytics, 
                and real-time alerts with a Pro or Elite subscription.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm">AI-powered stock analysis</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm">Real-time market alerts</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Advanced portfolio analytics</span>
                </div>
              </div>
              <div className="space-x-4">
                {!isAuthenticated ? (
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up Now
                  </Button>
                ) : (
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Upgrade to Pro
                  </Button>
                )}
                <Button variant="outline">
                  View Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};