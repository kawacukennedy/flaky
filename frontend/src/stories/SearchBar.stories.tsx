import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SearchBar from '../components/search/SearchBar';

const meta = {
  title: 'Search/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSearch: fn(),
    onFilterChange: fn(),
    currentFilters: { source: 'All', date: '7d', sort: 'Relevance' },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSelectedFilters: Story = {
  args: {
    currentFilters: { source: 'GitHub', date: '30d', sort: 'Most Recent' },
  },
};