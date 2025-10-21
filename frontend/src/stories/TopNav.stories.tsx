import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TopNav from '../components/layout/TopNav';

const meta = {
  title: 'Layout/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
    a11y: { // Enable a11y checks for this component
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
  },
  args: { onSearch: fn() },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
