import React from 'react';
import Button from '../Button';

interface SearchResultsProps {
  query: string;
  filters: { [key: string]: string };
}

interface SearchResultItemProps {
  title: string;
  snippet: string;
  source: string;
  timestamp: string;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  title,
  snippet,
  source,
  timestamp,
}) => {
  return (
    <div className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm transition-all duration-normal ease-standard hover:shadow-md">
      <h3 className="text-lg font-semibold text-text_light dark:text-text_dark mb-1">{title}</h3>
      <p className="text-sm text-muted mb-2 line-clamp-2">{snippet}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Source: {source}</span>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};

const EmptyStateCard: React.FC<{ message: string; ctaLabel?: string; onCtaClick?: () => void }> = ({
  message,
  ctaLabel,
  onCtaClick,
}) => {
  return (
    <div className="bg-surface_light dark:bg-surface_dark p-8 rounded-lg shadow-sm text-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-muted">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.162 1.318m-4.995-4.995a4.486 4.486 0 00-1.318 3.162c0 1.34.266 2.653.789 3.876m-.789-3.876A4.486 4.486 0 0112 2.25c1.34 0 2.653.266 3.876.789M9 16.5Q9 16.5 9 16.5m3-6a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 0v.008M12 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 0v.008M12 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 0v.008M6.75 7.5h.008v.008H6.75V7.5zm.008 12H6.75v.008h.008v-.008zM17.25 7.5h.008v.008h-.008V7.5zm.008 12H17.25v.008h.008v-.008zM12 7.5h.008v.008H12V7.5zm.008 12H12v.008h.008v-.008zM3 12h.008v.008H3V12zm.008 6H3v.008h.008v-.008zM12 3h.008v.008H12V3zm.008 6H12v.008h.008V9zM18 12h.008v.008H18V12zm.008 6H18v.008h.008v-.008zM12 15h.008v.008H12V15zm.008 6H12v.008h.008v-.008zM6.75 12h.008v.008H6.75V12zm.008 6H6.75v.008h.008v-.008zM17.25 12h.008v.008h-.008V12zm.008 6H17.25v.008h.008v-.008zM3 6h.008v.008H3V6zm.008 6H3v.008h.008V12zM12 3h.008v.008H12V3zm.008 6H12v.008h.008V9zM18 6h.008v.008H18V6zm.008 6H18v.008h.008V12zM6.75 3h.008v.008H6.75V3zm.008 6H6.75v.008h.008V9zM17.25 3h.008v.008h-.008V3zm.008 6H17.25v.008h.008V9zM12 6h.008v.008H12V6zm.008 6H12v.008h.008V12zM3 9h.008v.008H3V9zm.008 6H3v.008h.008V15zM18 9h.008v.008H18V9zm.008 6H18v.008h.008V15zM6.75 6h.008v.008H6.75V6zm.008 6H6.75v.008h.008V12zM17.25 6h.008v.008h-.008V6zm.008 6H17.25v.008h.008V12zM12 9h.008v.008H12V9zm.008 6H12v.008h.008V15z" />
      </svg>
      <p className="text-lg font-medium mb-4">{message}</p>
      {ctaLabel && onCtaClick && (
        <Button label={ctaLabel} onClick={onCtaClick} variant="primary" />
      )}
    </div>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-surface_light dark:bg-surface_dark p-4 rounded-md shadow-sm animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({ query, filters }) => {
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState<SearchResultItemProps[]>([]);

  React.useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      if (query && query.length > 2) {
        setResults([
          {
            title: `Result for "${query}" (Source: ${filters.source})`,
            snippet: 'This is a simulated search result snippet based on your query and filters.',
            source: filters.source,
            timestamp: new Date().toLocaleString(),
          },
          {
            title: `Another result for "${query}" (Date: ${filters.date})`,
            snippet: 'More details about the simulated search result, showing how filters affect it.',
            source: filters.source,
            timestamp: new Date(Date.now() - 86400000).toLocaleString(),
          },
        ]);
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, filters]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (results.length === 0) {
    return (
      <EmptyStateCard
        message={query ? `No results found for "${query}".` : 'Start typing to search for flaky tests.'}
        ctaLabel="Clear Search"
        onCtaClick={() => console.log('Clear Search clicked')}
      />
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <SearchResultItem key={index} {...result} />
      ))}
    </div>
  );
};

export default SearchResults;