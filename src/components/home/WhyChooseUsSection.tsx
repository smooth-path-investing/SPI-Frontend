import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Clock, Award } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Why Choose Smooth Path Investing?</h2>
          <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-4xl mx-auto px-2">
            We've addressed the pain points of traditional investment platforms to create something better.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Beginner-Friendly Interface</h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Clean, intuitive design that doesn't overwhelm new investors with unnecessary complexity</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Institutional-Grade Research</h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Professional-level analysis typically reserved for hedge funds, now accessible to everyone</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Time-Saving Automation</h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Let our AI do the heavy lifting while you focus on making informed investment decisions</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0" style={{ color: 'hsl(42, 88%, 65%)' }} />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Proven Track Record</h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Consistent outperformance over multiple market cycles with transparent reporting</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Risk-First Approach</h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Sophisticated risk management tools that protect your capital during market downturns</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">No Hidden Agenda</h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">We succeed when you succeed. No commissions, no affiliate marketing, just honest advice</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16 px-4">
          <Link to="/stocks" className="w-full sm:w-auto inline-block">
            <Button size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Your Investment Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};