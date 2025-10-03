import React, { useState, useEffect, useRef } from 'react';
import SearchFilter from './SearchFilter';

interface SearchBarProps {
  onSearch: (query: string, filters: Record<string, string>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false); // Placeholder for error state

  const debounceTimeoutRef = useRef<number | null>(null);

  const searchBarSpec = {
    placeholder: "Search flaky tests, logs, or errors...",
    height_px: 48,
    debounce_ms: 300,
    filters: [
      { label: "Source", options: ["All", "CI Logs", "GitHub", "Docs"], default: "All" },
      { label: "Date", options: ["7d", "24h", "30d"], default: "7d" },
      { label: "Sort", options: ["Relevance", "Most Recent"], default: "Relevance" }
    ],
    micro_interactions: {
      focus: "glow border #2563EB 200ms",
      error: "shake 2px 150ms + border #DC2626"
    }
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = window.setTimeout(() => {
      onSearch(searchQuery, activeFilters);
    }, searchBarSpec.debounce_ms);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery, activeFilters, onSearch, searchBarSpec.debounce_ms]);

  const handleFilterChange = (label: string, value: string) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [label]: value,
    }));
  };

  const inputHeight = `${searchBarSpec.height_px}px`;

  const focusStyles = isFocused ? 'focus:ring-2 focus:ring-primary focus:border-transparent' : '';
  const errorStyles = hasError ? 'border-danger animate-shake' : '';

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder={searchBarSpec.placeholder}
        className={`w-full px-4 py-2 rounded-md border border-border dark:border-surface_dark bg-bg_light dark:bg-bg_dark text-text_light dark:text-text_dark outline-none ${focusStyles} ${errorStyles}`}
        style={{ height: inputHeight }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="flex space-x-4">
        {searchBarSpec.filters.map((filter) => (
          <SearchFilter
            key={filter.label}
            label={filter.label}
            options={filter.options}
            defaultOption={filter.default}
            onFilterChange={(value) => handleFilterChange(filter.label, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
