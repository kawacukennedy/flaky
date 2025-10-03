import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopNav from './TopNav';
import { describe, it, expect, vi } from 'vitest';

// Mock the useTheme hook
vi.mock('../../ThemeInitializer', () => ({
  useTheme: () => ({
    toggleTheme: vi.fn(),
  }),
}));

describe('TopNav', () => {
  it('renders correctly with title, search input, and icons', () => {
    render(<TopNav />);
    expect(screen.getByText('FlakeHunter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search flaky tests, logs, or errors...')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Account menu')).toBeInTheDocument();
  });

  it('calls onSearch when search form is submitted', async () => {
    const handleSearch = vi.fn();
    render(<TopNav onSearch={handleSearch} />);
    const searchInput = screen.getByPlaceholderText('Search flaky tests, logs, or errors...');
    await userEvent.type(searchInput, 'test query');
    fireEvent.submit(searchInput); // Submit the form via the input
    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('focuses search input on / key press', () => {
    render(<TopNav />);
    const searchInput = screen.getByPlaceholderText('Search flaky tests, logs, or errors...');
    fireEvent.keyDown(window, { key: '/' });
    expect(searchInput).toHaveFocus();
  });

  it('toggles dark mode when the button is clicked', async () => {
    const { useTheme } = await import('../../ThemeInitializer');
    const { toggleTheme } = useTheme();

    render(<TopNav />);
    const toggleButton = screen.getByLabelText('Toggle dark mode');
    await userEvent.click(toggleButton);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
