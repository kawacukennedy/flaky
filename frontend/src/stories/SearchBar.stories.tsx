import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SearchBar from '../components/search/SearchBar';

const meta = {
  title: 'Search/SearchBar',
  component: SearchBar,
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
  args: { onSearch: fn() },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialQuery: Story = {
  args: {
    // You might need to add a defaultQuery prop to SearchBar for this to work
    // For now, this story just shows the default state.
  },
};

export const WithErrorState: Story = {
  args: {
    // You might need to add an `isError` prop to SearchBar for this to work
    // For now, this story just shows the default state.
  },
};
