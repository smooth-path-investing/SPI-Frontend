import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const Backtest: React.FC = () => {
  const [initialCapital, setInitialCapital] = useState(10000);
  const [csvText, setCsvText] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Portfolio Backtest Simulator
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload your strategy CSV and simulate portfolio performance over time
          </p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Configuration</h2>
          
          <div className="grid gap-6 mb-6">
            <div>
              <Label htmlFor="capital">Initial Capital ($)</Label>
              <Input
                id="capital"
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                min="100"
                step="100"
              />
            </div>

            <div>
              <Label htmlFor="csv">Strategy CSV Data</Label>
              <textarea
                id="csv"
                className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Start Date,Assets,Weights&#10;12/31/2019,&quot;AMGN, KR, BAC&quot;,&quot;33.33%, 33.33%, 33.34%&quot;"
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-destructive/10 border border-destructive rounded-md p-4 mb-6">
              <h3 className="font-semibold text-destructive mb-2">Errors:</h3>
              <ul className="list-disc list-inside text-sm text-destructive">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <Button 
            className="w-full"
            onClick={() => setErrors(['Feature coming soon - CSV parsing in progress'])}
          >
            Run Backtest
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Results</h2>
          <div className="text-center py-12 text-muted-foreground">
            Run a backtest to see results here
          </div>
        </Card>
      </div>
    </div>
  );
};
