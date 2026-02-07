// src/api/graph.ts
import { PerformanceRow } from '@/types';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_LOCAL_BACKEND_SERVER;

export async function fetchGraphData(): Promise<PerformanceRow[]> {
  try {
    const response = await axios.get<{ data: PerformanceRow[] }>(`${API_BASE_URL}/api/graph/`);
    console.log('API response:', response.data); // Should show { data: [...] }
    return response.data.data; // This is the array
  } catch (error) {
    console.error('Error fetching graph data:', error);
    return []; // fallback empty array
  }
}
