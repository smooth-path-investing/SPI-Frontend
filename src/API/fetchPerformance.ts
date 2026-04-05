import type { PerformanceRow } from '@/types';
import axios from 'axios';
import { buildApiUrl, RUNTIME_CONFIG } from '@/lib/runtimeConfig';

export async function fetchGraphData(): Promise<PerformanceRow[]> {
  try {
    const response = await axios.get<{ data: PerformanceRow[] }>(
      buildApiUrl('/api/graph/', RUNTIME_CONFIG.localBackendServer),
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching graph data:', error);
    return [];
  }
}
