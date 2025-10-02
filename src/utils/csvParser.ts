export interface StrategyRow {
  date: Date;
  assets: string[];
  weights: number[];
}

export function parseStrategyCSV(csvText: string): StrategyRow[] {
  const lines = csvText.trim().split('\n');
  
  // Skip header
  const dataLines = lines.slice(1);
  
  const rows: StrategyRow[] = [];
  
  for (const line of dataLines) {
    // Parse CSV considering quoted strings
    const match = line.match(/^([^,]+),"([^"]+)","([^"]+)"$/);
    
    if (!match) continue;
    
    const dateStr = match[1].trim();
    const assetsStr = match[2];
    const weightsStr = match[3];
    
    // Parse date
    const date = new Date(dateStr);
    
    // Parse assets
    const assets = assetsStr.split(',').map(a => a.trim());
    
    // Parse weights (remove % and convert to decimal)
    const weights = weightsStr.split(',').map(w => 
      parseFloat(w.trim().replace('%', '')) / 100
    );
    
    if (assets.length !== weights.length) {
      console.warn(`Skipping row: asset/weight count mismatch on ${dateStr}`);
      continue;
    }
    
    rows.push({ date, assets, weights });
  }
  
  return rows;
}
