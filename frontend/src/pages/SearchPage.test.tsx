import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from './SearchPage';

// Mock child components to isolate SearchPage's logic
jest.mock('../components/search/SearchBar', () => {
  return ({ onSearch, onFilterChange, currentFilters }: any) => (
    <div data-testid="search-bar-mock">
      <input
        data-testid="search-input-mock"
        onChange={(e) => onSearch(e.target.value)}
        value={currentFilters.searchTerm || ''}
      />
      <button data-testid="filter-button-mock" onClick={() => onFilterChange('source', 'mockSource')}>
        Filter
      </button>
    </div>
  );
});

jest.mock('../components/search/SearchResults', () => {
  return ({ results, loading, searchTerm }: any) => (
    <div data-testid="search-results-mock">
      {loading && <div>Loading...</div>}
      {!loading && results.length === 0 && searchTerm && <div>No results for "{searchTerm}"</div>}
      {!loading && results.length === 0 && !searchTerm && <div>Start searching</div>}
      {!loading && results.length > 0 && (
        <ul>
          {results.map((result: any) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
});

describe('SearchPage', () => {
  it('renders SearchBar and SearchResults components', () => {
    render(<SearchPage />);
    expect(screen.getByTestId('search-bar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('search-results-mock')).toBeInTheDocument();
  });

  it('handles search input and displays results', async () => {
    render(<SearchPage />);
    const searchInput = screen.getByTestId('search-input-mock');

    fireEvent.change(searchInput, { target: { value: 'test query' } });

    // Wait for debounce and simulated API call
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Flaky Test in Login Module')).toBeInTheDocument();
      expect(screen.getByText('High Flakiness in Payment Gateway')).toBeInTheDocument();
      expect(screen.getByText('Documentation for FlakeHunter Search')).toBeInTheDocument();
    }, { timeout: 1500 }); // Adjust timeout if needed for the simulated API call
  });

  it('handles filter changes and re-triggers search', async () => {
    render(<SearchPage />);
    const filterButton = screen.getByTestId('filter-button-mock');

    fireEvent.click(filterButton);

    // Wait for debounce and simulated API call
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Flaky Test in Login Module')).toBeInTheDocument();
    }, { timeout: 1500 });
  });
});