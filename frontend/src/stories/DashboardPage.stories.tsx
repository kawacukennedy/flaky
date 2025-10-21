import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import RecentFlakes from '../components/dashboard/RecentFlakes';
import TopSolutions from '../components/dashboard/TopSolutions';

// Mock data for child components
const mockFlakes = [
  { id: '1', name: 'Login Test Failure', timestamp: '2 hours ago' },
  { id: '2', name: 'Checkout Process Bug', timestamp: '1 day ago' },
  { id: '3', name: 'API Endpoint Timeout', timestamp: '3 days ago' },
];

const mockSolutions = [
  { id: '1', title: 'Fixing Login Flakes', snippet: 'A quick fix for login issues.', votes: 15 },
  { id: '2', title: 'Optimizing DB Queries', snippet: 'Improve performance with these tips.', votes: 22 },
];

// Mock the child components for Storybook
jest.mock('../components/dashboard/RecentFlakes', () => {
  return (props: any) => <RecentFlakes {...props} flakes={mockFlakes} />;
});

jest.mock('../components/dashboard/TopSolutions', () => {
  return (props: any) => <TopSolutions {...props} solutions={mockSolutions} />;
});

const meta = {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
