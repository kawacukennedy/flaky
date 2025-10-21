import type { Meta, StoryObj } from '@storybook/react';
import Preferences from '../components/profile/Preferences';

const meta = {
  title: 'Profile/Preferences',
  component: Preferences,
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
} satisfies Meta<typeof Preferences>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
