import React, { useState } from 'react';
import './backtest.css';

interface CsvUploaderProps {
  onCsvLoad: (csvText: string) => void;
  onPricesLoad: (csvText: string) => void;
  label: string;
  accept?: string;
  placeholder?: string;
  type: 'strategy' | 'prices';
}

export const CsvUploader: React.FC<CsvUploaderProps> = ({
  onCsvLoad,
  onPricesLoad,
  label,
  accept = '.csv',
  placeholder = 'Paste CSV data here...',
  type,
}) => {
  const [textInput, setTextInput] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (type === 'strategy') {
        onCsvLoad(text);
      } else {
        onPricesLoad(text);
      }
    };
    reader.readAsText(file);
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    if (type === 'strategy') {
      onCsvLoad(textInput);
    } else {
      onPricesLoad(textInput);
    }
  };

  return (
    <div className="csv-uploader">
      <label className="csv-uploader-label">{label}</label>
      
      <div className="upload-mode-toggle">
        <button
          className={`mode-btn ${uploadMode === 'file' ? 'active' : ''}`}
          onClick={() => setUploadMode('file')}
          type="button"
        >
          Upload File
        </button>
        <button
          className={`mode-btn ${uploadMode === 'text' ? 'active' : ''}`}
          onClick={() => setUploadMode('text')}
          type="button"
        >
          Paste Text
        </button>
      </div>

      {uploadMode === 'file' ? (
        <div className="file-upload-area">
          <input
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            className="file-input"
            id={`file-${type}`}
          />
          <label htmlFor={`file-${type}`} className="file-label">
            Choose CSV file or drag here
          </label>
        </div>
      ) : (
        <div className="text-upload-area">
          <textarea
            className="csv-textarea"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={placeholder}
            rows={8}
          />
          <button
            className="submit-btn"
            onClick={handleTextSubmit}
            type="button"
          >
            Load CSV
          </button>
        </div>
      )}
    </div>
  );
};
