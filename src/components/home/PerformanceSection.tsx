import React, { useEffect, useState } from 'react';

import MetricsTable from '../statsTable/metricsTable';
import { OverallPerformanceChart } from '../graph/PerformanceChart';
import { performanceData } from '@/constants/graph';
import { PerformanceRow } from '@/types';
import { fetchGraphData } from '@/API/fetchPerformance';

export const PerformanceSection: React.FC = () => {
  const [graphData, setGraphData] = useState<PerformanceRow[]>([]);

  useEffect(() => {
    fetchGraphData().then((data) => {
      console.log('Fetched data:', data); // Should show the array
      setGraphData(data);
    });
  }, []);

  console.log('Fetched data:', graphData);

  return (
    <section className="relative px-4 bg-card/30 z-10">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Live Performance
        </h2>
        <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground max-w-4xl mx-auto px-2">
          Real results from real positions – actual trading, no simulations
        </p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Chart Container - Fixed height is key here */}
        <div className="w-full lg:flex-[3.5]">
          {/* <OverallPerformanceChart data={performanceData} /> */}
          <OverallPerformanceChart data={graphData} />
        </div>

        {/* Table Container */}
        <div className="w-full lg:flex-[1.5]">
          <MetricsTable />
        </div>
      </div>
    </section>
  );
};
