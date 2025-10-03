import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SearchFilter from '../components/search/SearchFilter';

const meta = {
  title: 'Search/SearchFilter',
  component: SearchFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof SearchFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SourceFilter: Story = {
  args: {
    label: 'Source',
    options: ['All', 'CI Logs', 'GitHub', 'Docs'],
    defaultValue: 'All',
    currentValue: 'All',
  },
};

export const DateFilter: Story = {
  args: {
    label: 'Date',
    options: ['24h', '7d', '30d', 'All Time'],
    defaultValue: '7d',
    currentValue: '7d',
  },
};

export const SortFilter: Story = {
  args: {
    label: 'Sort',
    options: ['Relevance', 'Most Recent', 'Least Recent'],
    defaultValue: 'Relevance',
    currentValue: 'Relevance',
  },
};

export const WithSelectedValue: Story = {
  args: {
    label: 'Source',
    options: ['All', 'CI Logs', 'GitHub', 'Docs'],
    defaultValue: 'All',
    currentValue: 'GitHub',
  },
};