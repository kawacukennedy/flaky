import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNav from './TopNav';

describe('TopNav', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders the TopNav component with the correct data-testid', () => {
    render(<TopNav onSearch={mockOnSearch} />);
    expect(screen.getByTestId('topnav')).toBeInTheDocument();
  });

  it('renders the application title', () => {
    render(<TopNav onSearch={mockOnSearch} />);
    expect(screen.getByText('FlakeHunter')).toBeInTheDocument();
  });

  it('renders the search input with correct placeholder and aria-label', () => {
    render(<TopNav onSearch={mockOnSearch} />);
    const searchInput = screen.getByLabelText('Search input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });

  it('calls onSearch with the correct value when search input changes', () => {
    render(<TopNav onSearch={mockOnSearch} />);
    const searchInput = screen.getByLabelText('Search input');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('focuses the search input when "/" key is pressed', () => {
    render(<TopNav onSearch={mockOnSearch} />);
    const searchInput = screen.getByLabelText('Search input');
    fireEvent.keyDown(window, { key: '/' });
    expect(searchInput).toHaveFocus();
  });

  it('renders the account menu button with correct aria-label', () => {
    render(<TopNav onSearch={mockOnSearch} />);
    const accountMenuButton = screen.getByLabelText('Account menu');
    expect(accountMenuButton).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });
});