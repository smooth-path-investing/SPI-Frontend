
import React, { useEffect, useState } from 'react';

const KEYWORDS = [
  ['Adaptive Learning', 'Data Intensive'],
  ['Informational Inefficiencies', 'Dimension Reduction'],
  ['Nonlinear + Linear branching', 'Institutional Investments For Retailers'],
  ['Ordered', 'Segregated'],
  ['Integrated', 'Conditional'],
  ['Exclude', 'Concentrate'],
  ['Concise', 'Artificial Intelligence'],
  ['Machine Learning', 'Adaptive Learning']
];

export const AnimatedKeywords: React.FC = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPairIndex((prev) => (prev + 1) % KEYWORDS.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5 z-0">
      {/* Floating circles with keywords */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="bg-muted/20 rounded-full px-6 py-3 text-muted-foreground text-sm">
          {KEYWORDS[currentPairIndex][0]}
        </div>
      </div>
      
      <div className="absolute top-40 right-20 animate-pulse">
        <div className="bg-muted/20 rounded-full px-6 py-3 text-muted-foreground text-sm">
          {KEYWORDS[currentPairIndex][1]}
        </div>
      </div>
      
      <div className="absolute bottom-40 left-20 animate-bounce delay-1000">
        <div className="bg-muted/20 rounded-full px-6 py-3 text-muted-foreground text-sm">
          {KEYWORDS[(currentPairIndex + 1) % KEYWORDS.length][0]}
        </div>
      </div>
      
      <div className="absolute bottom-60 right-10 animate-pulse delay-500">
        <div className="bg-muted/20 rounded-full px-6 py-3 text-muted-foreground text-sm">
          {KEYWORDS[(currentPairIndex + 1) % KEYWORDS.length][1]}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/3 animate-bounce delay-2000">
        <div className="bg-muted/20 rounded-full px-6 py-3 text-muted-foreground text-sm">
          {KEYWORDS[(currentPairIndex + 2) % KEYWORDS.length][0]}
        </div>
      </div>
      
      <div className="absolute top-1/3 right-1/3 animate-pulse delay-1500">
        <div className="bg-muted/20 rounded-full px-6 py-3 text-muted-foreground text-sm">
          {KEYWORDS[(currentPairIndex + 2) % KEYWORDS.length][1]}
        </div>
      </div>
    </div>
  );
};
