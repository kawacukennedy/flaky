import React from 'react';
import { Frown } from 'lucide-react';

interface SearchResultItemProps {
  id: string;
  title: string;
  snippet: string;
  source: string;
  date: string;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ title, snippet, source, date }) => {
  return (
    <div className="bg-surface_light dark:bg-surface_dark rounded-md p-4 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
      <p className="text-muted text-sm mb-2 line-clamp-2">{snippet}</p>
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>Source: <span className="font-medium">{source}</span></span>
        <span>Date: <span className="font-medium">{date}</span></span>
      </div>
    </div>
  );
};

interface SearchResultsProps {
  results: SearchResultItemProps[];
  loading: boolean;
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading, searchTerm }) => {
  if (loading) {
    return (
      <div className="space-y-4 mt-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} data-testid="loading-skeleton" className="bg-surface_light dark:bg-surface_dark rounded-md p-4 shadow-sm border border-border animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted mt-6">
        <Frown className="h-16 w-16 mb-4" />
        <p className="text-xl font-semibold mb-2">No results found</p>
        <p className="text-center">Try adjusting your search term or filters.</p>
      </div>
    );
  }

  if (results.length === 0 && !searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted mt-6">
        <Search className="h-16 w-16 mb-4" />
        <p className="text-xl font-semibold mb-2">Start searching</p>
        <p className="text-center">Enter a query to find flaky tests, logs, or errors.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {results.map((result) => (
        <SearchResultItem key={result.id} {...result} />
      ))}
    </div>
  );
};

export default SearchResults;