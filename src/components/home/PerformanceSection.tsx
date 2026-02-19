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
        py-24 sm:py-32
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
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {/* Chart */}
          <div className="w-full lg:w-2/3 p-2 sm:p-4 md:p-6">
            <OverallPerformanceChart data={performanceData} />
            {/* <OverallPerformanceChart data={graphData} /> */}
          </div>

          {/* Table */}
          <div className="w-full lg:flex-[1.5] p-2 sm:p-4 lg:p-6">
            <MetricsTable />
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
