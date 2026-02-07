export const getMissionPoints = (onKeywordClick: (keyword: string) => void) => [
  'Turn publicly traded companies into your personal compounding machine',
  'Bring institutional knowledge and discipline into your hands',
  'Blend common sense, rigorous math, risk budget, and decades of battle-tested market experience',
  <>
    Put A-to-Z stock investing in your pocket — from signal to portfolio: &nbsp;
    <span
      className="keyword-link cursor-pointer font-bold text-primary hover:text-primary/80 transition-colors duration-200"
      onClick={() => onKeywordClick('Az2→Sp∈P')}
    >
      A<sub>z</sub>&nbsp;<sup>2</sup>&nbsp;→&nbsp;S<sub>i</sub>&nbsp;∈&nbsp;P
    </span>
    .
  </>,
];
