// Purpose: Advanced filter options

import React from 'react';

interface SearchFilterProps {
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  options: Record<string, string[]>; // e.g., { 'status': ['pass', 'fail'], 'project': ['P1', 'P2'] }
}

const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onFilterChange, options }) => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-md shadow-sm">
      {Object.keys(options).map((filterKey) => (
        <div key={filterKey} className="flex flex-col">
          <label htmlFor={filterKey} className="text-sm font-medium text-gray-700 mb-1">
            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
          </label>
          <select
            id={filterKey}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filters[filterKey] || ''}
            onChange={(e) => onFilterChange(filterKey, e.target.value)}
          >
            <option value="">All {filterKey}</option>
            {options[filterKey].map((optionValue) => (
              <option key={optionValue} value={optionValue}>
                {optionValue}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default SearchFilter;