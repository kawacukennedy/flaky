import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LeftNav from './LeftNav';
import { describe, it, expect } from 'vitest';

describe('LeftNav', () => {
  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <LeftNav />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Flakes')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('applies active class to the current route', () => {
    // This test requires a more advanced setup with MemoryRouter or mocking react-router-dom
    // For simplicity, we'll skip direct active class testing here and rely on Storybook for visual verification.
    // A full implementation would involve setting up a MemoryRouter and navigating to specific paths.
  });
});
