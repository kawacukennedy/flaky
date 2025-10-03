import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentFlakes from './RecentFlakes';

describe('RecentFlakes', () => {
  it('renders the title "Recent Flakes"', () => {
    render(<RecentFlakes />);
    expect(screen.getByText('Recent Flakes')).toBeInTheDocument();
  });

  it('renders the empty state when no flakes are provided', () => {
    render(<RecentFlakes flakes={[]} />);
    expect(screen.getByText('No flaky tests yet.')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); // Lucide-react Inbox icon
  });

  it('renders the empty state when flakes prop is undefined', () => {
    render(<RecentFlakes />);
    expect(screen.getByText('No flaky tests yet.')).toBeInTheDocument();
  });

  it('renders a list of flakes when provided', () => {
    const flakes = [
      { id: '1', name: 'TestA', timestamp: '2 hours ago' },
      { id: '2', name: 'TestB', timestamp: '1 day ago' },
      { id: '3', name: 'TestC', timestamp: '3 days ago' },
    ];
    render(<RecentFlakes flakes={flakes} />);
    expect(screen.getByText('TestA')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    expect(screen.getByText('TestB')).toBeInTheDocument();
    expect(screen.getByText('1 day ago')).toBeInTheDocument();
    expect(screen.getByText('TestC')).toBeInTheDocument();
    expect(screen.getByText('3 days ago')).toBeInTheDocument();
  });

  it('renders a maximum of 5 flakes', () => {
    const flakes = [
      { id: '1', name: 'Test1', timestamp: 't1' },
      { id: '2', name: 'Test2', timestamp: 't2' },
      { id: '3', name: 'Test3', timestamp: 't3' },
      { id: '4', name: 'Test4', timestamp: 't4' },
      { id: '5', name: 'Test5', timestamp: 't5' },
      { id: '6', name: 'Test6', timestamp: 't6' }, // This should not be rendered
    ];
    render(<RecentFlakes flakes={flakes} />);
    expect(screen.getByText('Test5')).toBeInTheDocument();
    expect(screen.queryByText('Test6')).not.toBeInTheDocument();
  });
});