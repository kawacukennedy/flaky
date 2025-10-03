import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchFilter from './SearchFilter';

interface SearchBarProps {
  onSearch: (query: string, filters: Record<string, string>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    Source: 'All',
    Date: '7d',
    Sort: 'Relevance',
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false); // For micro-interaction

  const filtersConfig = [
    { label: 'Source', options: ['All', 'CI Logs', 'GitHub', 'Docs'], defaultValue: 'All' },
    { label: 'Date', options: ['24h', '7d', '30d', 'All Time'], defaultValue: '7d' },
    { label: 'Sort', options: ['Relevance', 'Most Recent'], defaultValue: 'Relevance' },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query, activeFilters);
    }, 300); // Debounce_ms: 300

    return () => {
      clearTimeout(handler);
    };
  }, [query, activeFilters, onSearch]);

  const handleFilterChange = (filterName: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-center bg-surface_light dark:bg-surface_dark rounded-md shadow-sm p-2 border-2 ${isError ? 'border-danger animate-shake' : isFocused ? 'border-primary animate-glow' : 'border-transparent'} transition-all duration-200`}
      style={{ height: '48px' }} // height_px: 48
    >
      <Search className="text-muted mx-2" size={20} />
      <input
        type="text"
        placeholder="Search flaky tests, logs, or errors..."
        className="flex-grow p-2 bg-transparent outline-none text-text_light dark:text-text_dark"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search input"
      />

      <div className="flex space-x-2 mt-2 md:mt-0 md:ml-4">
        {filtersConfig.map((filter) => (
          <SearchFilter
            key={filter.label}
            label={filter.label}
            options={filter.options}
            defaultValue={filter.defaultValue}
            onChange={(value) => handleFilterChange(filter.label, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;