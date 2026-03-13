import type { PerformanceRow } from '@/types';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_LOCAL_BACKEND_SERVER;

export async function fetchGraphData(): Promise<PerformanceRow[]> {
  try {
    const response = await axios.get<{ data: PerformanceRow[] }>(`${API_BASE_URL}/api/graph/`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching graph data:', error);
    return [];
  }
}
