import type { Meta, StoryObj } from '@storybook/react';
import RecentFlakes from '../components/dashboard/RecentFlakes';

const meta = {
  title: 'Dashboard/RecentFlakes',
  component: RecentFlakes,
  parameters: {
    layout: 'centered',
    a11y: { // Enable a11y checks for this component
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    flakes: {
      control: 'object',
      description: 'Array of recent flaky tests',
    },
  },
} satisfies Meta<typeof RecentFlakes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    flakes: [
      { id: '1', name: 'Login Test Flaky', timestamp: '2 hours ago' },
      { id: '2', name: 'Checkout Flow Intermittent', timestamp: '1 day ago' },
      { id: '3', name: 'API Endpoint Failure', timestamp: '3 days ago' },
      { id: '4', name: 'UI Rendering Glitch', timestamp: '1 week ago' },
      { id: '5', name: 'Database Connection Timeout', timestamp: '2 weeks ago' },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    flakes: [],
  },
};
