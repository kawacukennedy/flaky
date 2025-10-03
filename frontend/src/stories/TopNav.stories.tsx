import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TopNav from '../components/layout/TopNav';

const meta = {
  title: 'Layout/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: { onSearch: fn() },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (query) => console.log('Searching for:', query),
  },
};