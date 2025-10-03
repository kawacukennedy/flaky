import type { Meta, StoryObj } from '@storybook/react';
import RecentFlakes from '../components/dashboard/RecentFlakes';

const meta = {
  title: 'Dashboard/RecentFlakes',
  component: RecentFlakes,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecentFlakes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  args: {
    flakes: [],
  },
};

export const WithFlakes: Story = {
  args: {
    flakes: [
      { id: '1', name: 'Login Test Failure', timestamp: '2 hours ago' },
      { id: '2', name: 'Checkout Process Bug', timestamp: '1 day ago' },
      { id: '3', name: 'API Endpoint Timeout', timestamp: '3 days ago' },
      { id: '4', name: 'Database Connection Error', timestamp: '5 days ago' },
      { id: '5', name: 'UI Rendering Glitch', timestamp: '1 week ago' },
    ],
  },
};

export const MoreThanFiveFlakes: Story = {
  args: {
    flakes: [
      { id: '1', name: 'Login Test Failure', timestamp: '2 hours ago' },
      { id: '2', name: 'Checkout Process Bug', timestamp: '1 day ago' },
      { id: '3', name: 'API Endpoint Timeout', timestamp: '3 days ago' },
      { id: '4', name: 'Database Connection Error', timestamp: '5 days ago' },
      { id: '5', name: 'UI Rendering Glitch', timestamp: '1 week ago' },
      { id: '6', name: 'Another Flake Beyond Limit', timestamp: '2 weeks ago' },
    ],
  },
};