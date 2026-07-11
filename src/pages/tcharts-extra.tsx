import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Tcharts from './Tcharts';

export default function TchartsExtraPage() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExcel = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/stock_tracker.xlsm');

        if (!response.ok) {
          throw new Error('Could not load stock_tracker.xlsm');
        }

        const arrayBuffer = await response.arrayBuffer();

        const wb = XLSX.read(arrayBuffer, {
          type: 'array',
          bookVBA: true,
        });

        console.log('All sheet names:', wb.SheetNames);

        const sheetName = wb.SheetNames[2];

        if (!sheetName) {
          throw new Error('Third worksheet not found. Available sheets: ' + wb.SheetNames.join(', '));
        }

        console.log('Using sheet:', sheetName);

        const ws = wb.Sheets[sheetName];

        const range = XLSX.utils.decode_range('H21:N87');

        const headers = [
          'Time',
          'GOOGL',
          'USACOR',
          'IWO',
          'USARSY',
          'receivables',
          'ebitdamargin',
        ];

        const rows: any[] = [];

        for (let r = range.s.r + 1; r <= range.e.r; r++) {
          const row: any = {};

          headers.forEach((header, columnIndex) => {
            const cell =
              ws[
                XLSX.utils.encode_cell({
                  r,
                  c: range.s.c + columnIndex,
                })
              ];

            row[header] = cell?.v ?? null;
          });

          if (typeof row.Time === 'number') {
            const d = XLSX.SSF.parse_date_code(row.Time);
            row.Time = `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`;
          }

          if (row.GOOGL != null) {
            rows.push(row);
          }
        }

        if (rows.length === 0) {
          throw new Error(
            'No data found in H21:N87 on sheet "' + sheetName + '". Check that the sheet index is correct.'
          );
        }

        console.log('Loaded rows:', rows.length);
        console.log('First row:', rows[0]);
        console.log('Last row:', rows[rows.length - 1]);

        setExcelData(rows);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load Excel file.');
      } finally {
        setLoading(false);
      }
    };

    loadExcel();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background, #0d0d0d)',
          color: 'var(--foreground, #fff)',
        }}
      >
        Loading stock_tracker.xlsm...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background, #0d0d0d)',
          color: '#f87171',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--background, #0d0d0d)',
        minHeight: '100vh',
      }}
    >
      <Tcharts excelData={excelData} />
    </div>
  );
}