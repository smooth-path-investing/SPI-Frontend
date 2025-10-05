import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Star, TrendingUp, BarChart3 } from 'lucide-react';
import { textContent } from '@/constants/textContent';

interface AccessDeniedProps {
  isAuthenticated: boolean;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ isAuthenticated }) => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            {textContent["access-denied-title"]}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {textContent["access-denied-subtitle"]}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-12">
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">{textContent["access-denied-unlock-title"]}</h2>
              <p className="text-muted-foreground mb-6">
                {textContent["access-denied-unlock-description"]}
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm">{textContent["access-denied-feature-1"]}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm">{textContent["access-denied-feature-2"]}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm">{textContent["access-denied-feature-3"]}</span>
                </div>
              </div>
              <div className="space-x-4">
                {!isAuthenticated ? (
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {textContent["access-denied-button-signup"]}
                  </Button>
                ) : (
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {textContent["access-denied-button-upgrade"]}
                  </Button>
                )}
                <Button variant="outline">
                  {textContent["access-denied-button-pricing"]}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};