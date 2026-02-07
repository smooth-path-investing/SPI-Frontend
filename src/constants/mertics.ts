// ------------------------------
// Raw metrics provided by backend / data engineer
// ------------------------------

export const performanceMetrics = {
  ivv: {
    endingVami: 1171.089568,
    maxDrawdown: 0.1875191475,
    peakToValley: '2025-02-19 to 2025-04-08',
    recoveryDays: 57,
    sharpe: 0.781415058,
    sortino: 1.156011381,
    stdDev: 0.01197948643,
    downsideDev: 0.00809762882,
    meanReturn: 0.00073780542,
    positivePeriods: { count: 141, percent: 0.5949 },
    negativePeriods: { count: 96, percent: 0.4051 },
  },

  spi: {
    endingVami: 1369.144563,
    maxDrawdown: 0.3130558872,
    peakToValley: '2025-01-22 to 2025-04-08',
    recoveryDays: 55,
    sharpe: 0.95656342,
    sortino: 1.577720387,
    stdDev: 0.02471174242,
    downsideDev: 0.01498259706,
    meanReturn: 0.00162325204,
    positivePeriods: { count: 135, percent: 0.5696 },
    negativePeriods: { count: 102, percent: 0.4304 },
  },
};

// ------------------------------
// Derived Metrics (Calculated Once)
// ------------------------------

const DAYS_IN_PERIOD = 331;
const STARTING_VAMI = 1000;
const annualFactor = 365 / DAYS_IN_PERIOD;

const computeAnnualizedReturn = (endingVami: number) =>
  Math.pow(endingVami / STARTING_VAMI, annualFactor) - 1;

const computeGainLoss = (stdDev: number, downsideDev: number) => stdDev / downsideDev;

// ------------------------------
// Final Exported Derived Metrics
// ------------------------------

export const derivedMetrics = {
  ivv: {
    annualizedReturn: computeAnnualizedReturn(performanceMetrics.ivv.endingVami),
    gainLossRatio: computeGainLoss(
      performanceMetrics.ivv.stdDev,
      performanceMetrics.ivv.downsideDev,
    ),
  },

  spi: {
    annualizedReturn: computeAnnualizedReturn(performanceMetrics.spi.endingVami),
    gainLossRatio: computeGainLoss(
      performanceMetrics.spi.stdDev,
      performanceMetrics.spi.downsideDev,
    ),
  },
};
