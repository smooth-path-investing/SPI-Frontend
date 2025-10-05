import React from 'react';
import { textContent } from './textContent';

export const getMissionPoints = (onKeywordClick: (keyword: string) => void) => [
  textContent["home-mission-point-1"],
  textContent["home-mission-point-2"],
  textContent["home-mission-point-3"],
  <>{textContent["home-mission-point-4-prefix"]}<span 
    className="keyword-link cursor-pointer font-bold text-primary hover:text-primary/80 transition-colors duration-200"
    onClick={() => onKeywordClick('Az2→Sp∈P')}
  >
    A<sub>z</sub><sup>2</sup>→S<sub>p</sub>∈P
  </span>.</>,
  textContent["home-mission-point-5"]
];