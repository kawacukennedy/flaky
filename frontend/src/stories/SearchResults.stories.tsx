import type { Meta, StoryObj } from '@storybook/react';
import SearchResults from '../components/search/SearchResults';

const meta = {
  title: 'Search/SearchResults',
  component: SearchResults,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockResults = [
  { id: '1', title: 'Flaky Test in Login Module', snippet: 'Found an intermittent failure in the user login flow, often related to session management and race conditions during concurrent logins.', source: 'CI Logs', date: '2023-10-26' },
  { id: '2', title: 'High Flakiness in Payment Gateway Integration', snippet: 'Analysis shows frequent failures in the payment processing module, particularly with third-party API calls and network latency.', source: 'GitHub', date: '2023-10-25' },
  { id: '3', title: 'Documentation for FlakeHunter Search Feature', snippet: 'This document outlines how to effectively use the search functionality within FlakeHunter to quickly locate relevant flaky test data and solutions.', source: 'Docs', date: '2023-10-20' },
  { id: '4', title: 'Database Connection Pool Exhaustion', snippet: 'Intermittent test failures traced back to database connection pool exhaustion under heavy load conditions. Solution involves tuning connection parameters.', source: 'CI Logs', date: '2023-10-18' },
];

export const InitialState: Story = {
  args: {
    results: [],
    loading: false,
    searchTerm: '',
  },
};

export const LoadingState: Story = {
  args: {
    results: [],
    loading: true,
    searchTerm: 'loading query',
  },
};

export const NoResults: Story = {
  args: {
    results: [],
    loading: false,
    searchTerm: 'nonexistent query',
  },
};

export const WithResults: Story = {
  args: {
    results: mockResults,
    loading: false,
    searchTerm: 'flaky',
  },
};