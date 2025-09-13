import React from 'react';

export const getMissionPoints = (onKeywordClick: (keyword: string) => void) => [
  "Create a money-making engine from the growth of companies and economies.",
  "Integrate common sense, math, risk budgets, market expertise and reflections.",
  <>Offer A-to-Z stock investing, from signals to portfolios in your pocket, <span 
    className="keyword-link cursor-pointer font-bold text-primary hover:text-primary/80 transition-colors duration-200"
    onClick={() => onKeywordClick('Az2→Sp∈P')}
  >
    A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P
  </span>.</>,
  "Order, segregate, integrate, condition, exclude, and concentrate"
];