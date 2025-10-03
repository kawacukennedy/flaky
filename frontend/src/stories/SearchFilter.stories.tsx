import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SearchFilter from '../components/search/SearchFilter';

const meta = {
  title: 'Search/SearchFilter',
  component: SearchFilter,
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
    label: { control: 'text' },
    options: { control: 'object' },
    defaultValue: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof SearchFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SourceFilter: Story = {
  args: {
    label: 'Source',
    options: ['All', 'CI Logs', 'GitHub', 'Docs'],
    defaultValue: 'All',
    onChange: fn(),
  },
};

export const DateFilter: Story = {
  args: {
    label: 'Date',
    options: ['24h', '7d', '30d', 'All Time'],
    defaultValue: '7d',
    onChange: fn(),
  },
};

export const SortFilter: Story = {
  args: {
    label: 'Sort',
    options: ['Relevance', 'Most Recent'],
    defaultValue: 'Relevance',
    onChange: fn(),
  },
};
