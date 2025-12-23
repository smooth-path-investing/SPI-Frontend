import type { TooltipProps } from '../../types';

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { day, spiCum, ivvCum, spiVal, ivvVal } = payload[0].payload;

  const color = (v: number) => (v >= 0 ? '#16a34a' : '#dc2626');

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg w-56">
      <p className="text-center font-semibold text-sm mb-2">{day}</p>

      <div className="space-y-2">
        {/* Portfolio / SPI */}
        <div className="border-b border-border pb-2">
          <p className="text-xs text-muted-foreground">Portfolio (SPI)</p>
          <p className="font-bold text-lg" style={{ color: color(spiCum) }}>
            {spiCum >= 0 ? '+' : ''}
            {spiCum.toFixed(2)}%
          </p>
          <p className="text-xs text-muted-foreground">Total: {spiVal.toFixed(2)}</p>
        </div>

        {/* S&P 500 */}
        <div>
          <p className="text-xs text-muted-foreground">S&P 500</p>
          <p className="font-bold text-lg" style={{ color: color(ivvCum) }}>
            {ivvCum >= 0 ? '+' : ''}
            {ivvCum.toFixed(2)}%
          </p>
          <p className="text-xs text-muted-foreground">Total: {ivvVal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
