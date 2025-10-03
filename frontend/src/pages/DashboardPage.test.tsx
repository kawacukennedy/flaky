import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from './DashboardPage';

// Mock the child components to simplify testing DashboardPage's layout and hero section
jest.mock('../components/dashboard/RecentFlakes', () => {
  return () => <div data-testid="recent-flakes-mock">Recent Flakes Mock</div>;
});

jest.mock('../components/dashboard/TopSolutions', () => {
  return () => <div data-testid="top-solutions-mock">Top Solutions Mock</div>;
});

describe('DashboardPage', () => {
  it('renders the hero section with headline and subheadline', () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );
    expect(screen.getByText('Track & Hunt Flaky Tests')).toBeInTheDocument();
    expect(screen.getByText('Centralized debugging insights for developers.')).toBeInTheDocument();
  });

  it('renders the CTA buttons', () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );
    expect(screen.getByRole('link', { name: 'Start Hunting' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Flakes' })).toBeInTheDocument();
  });

  it('renders the RecentFlakes and TopSolutions components', () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );
    expect(screen.getByTestId('recent-flakes-mock')).toBeInTheDocument();
    expect(screen.getByTestId('top-solutions-mock')).toBeInTheDocument();
  });

  it('renders the "Overview" section', () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('More dashboard content will go here.')).toBeInTheDocument();
  });

  it('applies the correct grid layout classes', () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );
    const mainContentGrid = screen.getByText('Overview').closest('.grid');
    expect(mainContentGrid).toHaveClass('grid-cols-1');
    expect(mainContentGrid).toHaveClass('lg:grid-cols-3');
    expect(mainContentGrid).toHaveClass('gap-6');
  });
});