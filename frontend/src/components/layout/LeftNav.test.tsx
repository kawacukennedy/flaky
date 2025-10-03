import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LeftNav from './LeftNav';

describe('LeftNav', () => {
  it('renders the LeftNav component with the correct data-testid', () => {
    render(
      <Router>
        <LeftNav />
      </Router>
    );
    expect(screen.getByTestId('leftnav')).toBeInTheDocument();
  });

  it('renders the application title', () => {
    render(
      <Router>
        <LeftNav />
      </Router>
    );
    expect(screen.getByText('FlakeHunter')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(
      <Router>
        <LeftNav />
      </Router>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Flaky Tests')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('marks the current active navigation item', () => {
    // Mock useLocation to simulate being on a specific path
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        pathname: '/flakes',
      }),
    }));

    render(
      <Router>
        <LeftNav />
      </Router>
    );

    // Re-import LeftNav after mocking useLocation
    const LeftNavWithMock = require('./LeftNav').default;
    render(
      <Router>
        <LeftNavWithMock />
      </Router>
    );

    expect(screen.getByText('Flaky Tests')).toHaveClass('bg-primary text-white');
    expect(screen.getByText('Dashboard')).not.toHaveClass('bg-primary text-white');
  });
});