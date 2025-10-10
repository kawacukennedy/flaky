import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchFilteredTests } from '../app/slices/testsListSlice';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';

const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const testsList = useSelector((state: RootState) => state.testsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    environment: '',
    project: '',
  });

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    dispatch(fetchFilteredTests({ query, filters }));
  };

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    dispatch(fetchFilteredTests({ query: searchTerm, filters: newFilters }));
  };

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-screen-md">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />
        <SearchResults results={testsList.data || []} loading={testsList.loading} />
      </div>
    </div>
  );
};

export default SearchPage;
