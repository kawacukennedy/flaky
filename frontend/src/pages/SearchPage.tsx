import { useState, useEffect } from 'react';
import { Search, XCircle } from 'lucide-react';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    source: 'All',
    date: '7d',
    sort: 'Relevance',
  });
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]); // Placeholder for search results
  const [error, setError] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        performSearch(searchTerm, selectedFilters);
      } else {
        setResults([]);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, selectedFilters]);

  const performSearch = async (term: string, filters: any) => {
    setIsSearching(true);
    setError(null);
    // Placeholder for actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (term === 'error') {
        throw new Error('Simulated search error');
      }
      setResults([
        { id: 1, title: `Result for ${term} - 1`, snippet: 'This is a snippet of the search result.' },
        { id: 2, title: `Result for ${term} - 2`, snippet: 'Another snippet for the search result.' },
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <main className="flex justify-center py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-text_light dark:text-text_dark mb-6">Search Flaky Tests</h1>

        {/* Search Bar */}
        <div classNameName="bg-surface_light dark:bg-surface_dark p-4 rounded-lg shadow-md">
          <div className="relative flex items-center h-12 focus-within:ring-2 focus-within:ring-primary rounded-md transition-all duration-200 ease-standard">
            <Search className="absolute left-3 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search flaky tests, logs, or errors..."
              className={`w-full h-full pl-10 pr-4 rounded-md border ${error ? 'border-danger animate-shake' : 'border-border'} bg-surface_light dark:bg-surface_dark focus:outline-none text-text_light dark:text-text_dark`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <XCircle className="w-5 h-5 text-muted" />
              </button>
            )}
          </div>
          {error && <p className="text-danger text-sm mt-2">{error}</p>}

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted">Source:</label>
              <select
                value={selectedFilters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="p-2 border border-border rounded-md bg-surface_light dark:bg-surface_dark text-text_light dark:text-text_dark"
              >
                <option>All</option>
                <option>CI Logs</option>
                <option>GitHub</option>
                <option>Docs</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted">Date:</label>
              <select
                value={selectedFilters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="p-2 border border-border rounded-md bg-surface_light dark:bg-surface_dark text-text_light dark:text-text_dark"
              >
                <option>24h</option>
                <option>7d</option>
                <option>30d</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted">Sort:</label>
              <select
                value={selectedFilters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="p-2 border border-border rounded-md bg-surface_light dark:bg-surface_dark text-text_light dark:text-text_dark"
              >
                <option>Relevance</option>
                <option>Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {isSearching ? (
            // Loading State: Skeleton Shimmer
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm h-24"></div>
              ))}
            </div>
          ) : results.length > 0 ? (
            results.map(result => (
              <div key={result.id} className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-text_light dark:text-text_dark">{result.title}</h3>
                <p className="text-muted text-sm">{result.snippet}</p>
              </div>
            ))
          ) : (
            // Empty State: EmptyStateCard with CTA (placeholder)
            <div className="bg-surface_light dark:bg-surface_dark p-6 rounded-lg shadow-md text-center text-muted">
              <Search className="mx-auto w-12 h-12 mb-4" />
              <p className="text-lg font-medium">No results found.</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
              <button className="mt-4 bg-primary hover:bg-primary_hover text-white font-semibold py-2 px-4 rounded-md">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default SearchPage;