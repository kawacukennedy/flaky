import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import SearchFilter from '../components/search/SearchFilter';
import SearchResults from '../components/search/SearchResults';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    source: 'All',
    date: '7d',
    sort: 'Relevance',
  });

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // debounce_ms: 300

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className="max-w-[960px] mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Search Flaky Tests</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <Input
          id="search-input"
          placeholder="Search flaky tests, logs, or errors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 text-base"
        />
        <div className="flex justify-center space-x-4 mt-4">
          <SearchFilter
            label="Source"
            options={['CI Logs', 'GitHub', 'Docs']}
            defaultValue="All"
            selectedValue={filters.source}
            onChange={(value) => handleFilterChange('source', value)}
          />
          <SearchFilter
            label="Date"
            options={['24h', '7d', '30d']}
            defaultValue="7d"
            selectedValue={filters.date}
            onChange={(value) => handleFilterChange('date', value)}
          />
          <SearchFilter
            label="Sort"
            options={['Relevance', 'Most Recent']}
            defaultValue="Relevance"
            selectedValue={filters.sort}
            onChange={(value) => handleFilterChange('sort', value)}
          />
        </div>
      </div>

      {/* Search Results */}
      <SearchResults query={debouncedSearchQuery} filters={filters} />
    </div>
  );
};

export default SearchPage;