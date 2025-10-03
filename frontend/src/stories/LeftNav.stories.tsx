import type { Meta, StoryObj } from '@storybook/react';
import LeftNav from '../components/layout/LeftNav';

const meta = {
  title: 'Layout/LeftNav',
  component: LeftNav,
  parameters: {
    layout: 'fullscreen',
    a11y: { // Enable a11y checks for this component
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LeftNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};