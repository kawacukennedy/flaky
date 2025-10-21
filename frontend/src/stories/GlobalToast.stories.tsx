import type { Meta, StoryObj } from '@storybook/react';
import GlobalToast from '../components/layout/GlobalToast';

const meta = {
  title: 'Layout/GlobalToast',
  component: GlobalToast,
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
} satisfies Meta<typeof GlobalToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};