
import React from 'react';
import { Button } from '@/components/ui/button';
import { APPROACH_SECTIONS } from '../constants';
import { BarChart3, Brain, TrendingUp } from 'lucide-react';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case '📊': return <BarChart3 className="w-8 h-8 text-foreground" />;
    case '🤖': return <Brain className="w-8 h-8 text-foreground" />;
    case '📈': return <TrendingUp className="w-8 h-8 text-foreground" />;
    default: return <BarChart3 className="w-8 h-8 text-foreground" />;
  }
};

export const Approach: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Our Approach
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we combine cutting-edge technology with proven investment principles 
            to identify winning stocks
          </p>
        </div>

        <div className="space-y-16">
          {APPROACH_SECTIONS.map((section, index) => (
            <section key={index} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4">{getIcon(section.icon)}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{section.title}</h2>
                    <p className="text-lg text-muted-foreground mt-2">{section.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Key Features</h3>
                    <ul className="space-y-3">
                      {section.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="bg-muted rounded-lg p-8 border border-border text-center">
                      <div className="mb-4">{getIcon(section.icon)}</div>
                      <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                        View Research Paper
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center bg-muted rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4">The Complete Picture</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            Our three-pillar approach creates a comprehensive view of each stock's potential. 
            By combining quantitative factors, AI-driven insights, and rigorous backtesting, 
            we identify opportunities that others miss.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              See Our Performance
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              View All Research
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
