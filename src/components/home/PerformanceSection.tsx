import React from 'react';

import MetricsTable from '../statsTable/metricsTable';
import { OverallPerformanceChart } from '../graph/PerformanceChart';
import { performanceData } from '@/constants/graph';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';

export const PerformanceSection: React.FC = () => {
  // const [graphData, setGraphData] = useState<PerformanceRow[]>([]);
  // useEffect(() => {
  //   fetchGraphData().then((data) => {
  //     console.log('Fetched data:', data);
  //     setGraphData(data);
  //   });
  // }, []);

  return (
    <ScrollSection
      className="
        relative
        px-4 sm:px-6 lg:px-8
        py-20 sm:py-24 lg:py-28
        z-10
        bg-[var(--background)]
        text-[var(--foreground)]
      "
      triggerClass="performance-content"
    >
      <div className="max-w-7xl mx-auto performance-content">
        <SectionHeader
          mainText="Live Performance"
          subText="Real results from real positions – actual trading, no simulations"
        />

        {/* Chart + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {/* Chart */}
          <div className="w-full">
            <OverallPerformanceChart data={performanceData} />
            {/* <OverallPerformanceChart data={graphData} /> */}
          </div>

          {/* Table */}
          <div className="w-full">
            <MetricsTable />
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
