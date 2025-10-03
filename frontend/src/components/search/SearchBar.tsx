import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import SearchFilter from './SearchFilter';
import clsx from 'clsx';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filterName: string, value: string) => void;
  currentFilters: { source: string; date: string; sort: string };
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange, currentFilters }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false); // For micro-interaction error state
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, 300); // debounce_ms: 300

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onSearch]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Simulate error for demonstration
  const triggerError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 150); // shake 2px 150ms
  };

  return (
    <div className="mb-6">
      <div
        className={clsx(
          'relative flex items-center h-12 rounded-md bg-bg_light dark:bg-surface_dark border',
          'transition-all duration-200',
          isFocused ? 'ring-2 ring-primary border-transparent' : 'border-border',
          isError && 'animate-shake border-danger' // micro_interactions: error
        )}
      >
        <Search className="h-5 w-5 text-muted ml-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search flaky tests, logs, or errors..."
          className="flex-1 h-full px-4 bg-transparent focus:outline-none text-text_light dark:text-text_dark"
          aria-label="Search input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {/* Optional: Add a button to trigger error for testing */}
        {/* <button onClick={triggerError} className="px-3 text-sm text-red-500">Error</button> */}
      </div>

      <div className="flex space-x-4 mt-4">
        <SearchFilter
          label="Source"
          options={['CI Logs', 'GitHub', 'Docs']}
          defaultValue="All"
          currentValue={currentFilters.source}
          onChange={(value) => handleFilterChange('source', value)}
        />
        <SearchFilter
          label="Date"
          options={['24h', '7d', '30d']}
          defaultValue="7d"
          currentValue={currentFilters.date}
          onChange={(value) => handleFilterChange('date', value)}
        />
        <SearchFilter
          label="Sort"
          options={['Relevance', 'Most Recent']}
          defaultValue="Relevance"
          currentValue={currentFilters.sort}
          onChange={(value) => handleFilterChange('sort', value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
