import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cpu, Brain, TrendingUp } from 'lucide-react';
import { ScrollSection } from '../animations/scrollSection';

export const MethodologySection: React.FC = () => {
  return (
    <ScrollSection
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10 bg-[var(--background)] text-[var(--foreground)]"
      triggerClass="methodology-content"
    >
      <div className="max-w-7xl mx-auto methodology-content">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            The Smooth Path Edge
          </h2>
          <p className="text-base sm:text-lg lg:text-2xl text-[var(--muted-text)] max-w-4xl mx-auto px-2">
            We Segregate, Condition, Integrate, Order, Exclude and Concentrate
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {[
            {
              icon: <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--accent)]" />,
              title: 'Indicator',
              text: 'The five decisive measures no stock escapes',
            },
            {
              icon: <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--accent)]" />,
              title: 'Behavior',
              text: 'Crowd psychology distilled into three structural investment themes: trend-following, mean-reverting, indexing',
            },
            {
              icon: <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--accent)]" />,
              title: 'Allocator',
              text: 'Mathematical sophistication applied to stock selection, that is, to what, when, and how much',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="
                bg-[var(--card-bg)]
                border border-[var(--card-border)]
                p-6 sm:p-8 lg:p-12
                rounded-[var(--radius)]
                transition-all duration-300
                transform hover:scale-105
                hover:border-[var(--card-hover)]
                hover:shadow-[0_0_30px_var(--card-hover)]
              "
            >
              <div className="flex justify-center mb-4 sm:mb-6">{card.icon}</div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-center">
                {card.title}
              </h3>

              <p className="text-[var(--muted-text)] text-sm sm:text-base lg:text-lg leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center px-4">
          <Link to="/approach" className="w-full sm:w-auto inline-block">
            <Button
              variant="outline"
              size="lg"
              className="
                w-full sm:w-auto
                text-lg sm:text-xl
                px-8 sm:px-12 py-4 sm:py-6
                border border-[var(--border)]
                text-[var(--foreground)]
                bg-transparent
                hover:bg-[var(--accent)]
                hover:text-black
                transition-all duration-300
              "
            >
              Explore Our Approach
            </Button>
          </Link>
        </div>
      </div>
    </ScrollSection>
  );
};
