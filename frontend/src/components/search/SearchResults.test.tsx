import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  const mockResults = [
    { id: '1', title: 'Result 1', snippet: 'Snippet 1', source: 'Source A', date: '2023-01-01' },
    { id: '2', title: 'Result 2', snippet: 'Snippet 2', source: 'Source B', date: '2023-01-02' },
  ];

  it('renders loading state when loading is true', () => {
    render(<SearchResults results={[]} loading={true} searchTerm="" />);
    expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(3);
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    expect(screen.queryByText('Start searching')).not.toBeInTheDocument();
  });

  it('renders "No results found" when no results and a search term is present', () => {
    render(<SearchResults results={[]} loading={false} searchTerm="test" />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search term or filters.')).toBeInTheDocument();
    expect(screen.queryByText('Start searching')).not.toBeInTheDocument();
  });

  it('renders "Start searching" when no results and no search term is present', () => {
    render(<SearchResults results={[]} loading={false} searchTerm="" />);
    expect(screen.getByText('Start searching')).toBeInTheDocument();
    expect(screen.getByText('Enter a query to find flaky tests, logs, or errors.')).toBeInTheDocument();
    expect(screen.queryByText('No results found')).not.toBeInTheDocument();
  });

  it('renders search results when results are provided', () => {
    render(<SearchResults results={mockResults} loading={false} searchTerm="test" />);
    expect(screen.getByText('Result 1')).toBeInTheDocument();
    expect(screen.getByText('Snippet 1')).toBeInTheDocument();
    expect(screen.getByText('Source: Source A')).toBeInTheDocument();
    expect(screen.getByText('Date: 2023-01-01')).toBeInTheDocument();

    expect(screen.getByText('Result 2')).toBeInTheDocument();
    expect(screen.getByText('Snippet 2')).toBeInTheDocument();
    expect(screen.getByText('Source: Source B')).toBeInTheDocument();
    expect(screen.getByText('Date: 2023-01-02')).toBeInTheDocument();
  });
});