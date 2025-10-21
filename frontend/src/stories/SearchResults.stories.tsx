import type { Meta, StoryObj } from '@storybook/react';
import SearchResults from '../components/search/SearchResults';

const meta = {
  title: 'Search/SearchResults',
  component: SearchResults,
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
    results: { control: 'object' },
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleResults = [
  {
    id: '1',
    title: 'Flaky Test: User Login Failure',
    description: 'Intermittent login failures observed in CI builds, possibly due to race conditions.',
    link: '/tests/1',
  },
  {
    id: '2',
    title: 'Log Analysis: Database Connection Errors',
    description: 'Frequent database connection timeouts in production logs.',
    link: '/logs/db-errors',
  },
  {
    id: '3',
    title: 'GitHub Issue: Frontend UI Glitch',
    description: 'UI elements occasionally misalign on mobile devices.',
    link: '/issues/gh-123',
  },
  {
    id: '4',
    title: 'Documentation: How to debug flaky tests',
    description: 'A guide on common patterns and tools for debugging flaky tests.',
    link: '/docs/debugging',
  },
];

export const Default: Story = {
  args: {
    results: sampleResults,
    isLoading: false,
  },
};

export const Empty: Story = {
  args: {
    results: [],
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    results: [],
    isLoading: true,
  },
};
