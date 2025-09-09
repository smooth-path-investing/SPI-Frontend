import React from 'react';
import { Filter, Search, SortAsc } from 'lucide-react';

interface FilteringSortingProps {
  filterBy: string;
  sortBy: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const filterOptions = [
  { value: 'all', label: 'All Picks' },
  { value: 'high-conviction', label: 'High Conviction' },
  { value: 'value', label: 'Value Plays' },
  { value: 'growth', label: 'Growth Stories' },
  { value: 'momentum', label: 'Momentum' }
];

const sortOptions = [
  { value: 'conviction', label: 'Conviction Level' },
  { value: 'performance', label: 'Recent Performance' },
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'sector', label: 'Sector' }
];

export const FilteringSorting: React.FC<FilteringSortingProps> = ({
  filterBy,
  sortBy,
  onFilterChange,
  onSortChange
}) => {
  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select 
              value={filterBy} 
              onChange={(e) => onFilterChange(e.target.value)}
              className="bg-card border border-border rounded-md px-3 py-2 text-foreground"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <SortAsc className="w-5 h-5 text-muted-foreground" />
            <select 
              value={sortBy} 
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-card border border-border rounded-md px-3 py-2 text-foreground"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search stocks..." 
            className="bg-card border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>
    </section>
  );
};