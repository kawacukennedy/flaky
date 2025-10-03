import type { Meta, StoryObj } from '@storybook/react';
import TopSolutions from '../components/dashboard/TopSolutions';

const meta = {
  title: 'Dashboard/TopSolutions',
  component: TopSolutions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopSolutions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  args: {
    solutions: [],
  },
};

export const WithSolutions: Story = {
  args: {
    solutions: [
      { id: '1', title: 'Fixing Flaky Login Test', snippet: 'This solution provides a robust way to handle intermittent login failures by implementing a retry mechanism with exponential backoff.', votes: 45 },
      { id: '2', title: 'Optimizing Database Queries for Performance', snippet: 'Learn how to refactor slow SQL queries and add proper indexing to significantly boost your application\'s speed and reduce flakiness.', votes: 32 },
      { id: '3', title: 'Handling Asynchronous Operations in UI Tests', snippet: 'A comprehensive guide to writing stable UI tests that interact with asynchronous components, preventing common race conditions and timeouts.', votes: 28 },
      { id: '4', title: 'Environment Setup Best Practices for CI/CD', snippet: 'Ensure consistent test environments across all CI/CD pipelines to eliminate environment-specific flaky test results.', votes: 19 },
    ],
  },
};