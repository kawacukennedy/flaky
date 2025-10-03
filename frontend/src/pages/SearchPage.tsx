import React, { useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    source: 'All',
    date: '7d',
    sort: 'Relevance',
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]); // Replace 'any' with actual search result type

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    // In a real app, this would trigger an API call
    console.log('Searching for:', query, 'with filters:', filters);
    setLoading(true);
    setTimeout(() => {
      // Simulate API call
      setResults([
        { id: '1', title: 'Flaky Test in Login Module', snippet: 'Found an intermittent failure in the user login flow...', source: 'CI Logs', date: '2023-10-26' },
        { id: '2', title: 'High Flakiness in Payment Gateway', snippet: 'Analysis shows frequent failures in the payment processing...', source: 'GitHub', date: '2023-10-25' },
        { id: '3', title: 'Documentation for FlakeHunter Search', snippet: 'Learn how to effectively use the search functionality...', source: 'Docs', date: '2023-10-20' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    // Re-trigger search with new filters
    handleSearch(searchTerm);
  };

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-screen-md"> {/* max-w-screen-md is 768px, close to 960px. Will use custom width later if needed. */}
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />
        <SearchResults results={results} loading={loading} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default SearchPage;
