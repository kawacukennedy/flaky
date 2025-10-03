import type { Meta, StoryObj } from '@storybook/react';
import TopNav from '../components/layout/TopNav';

const meta: Meta<typeof TopNav> = {
  title: 'Layout/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'search submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  args: {
    onSearch: (query) => console.log('Search query:', query),
  },
};
