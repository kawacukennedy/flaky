import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    onClick: { action: 'clicked' },
    size: {
      control: 'object',
      description: 'Optional size object { width: number, height: number }',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Start Hunting',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'View Flakes',
    variant: 'secondary',
  },
};

export const LargePrimary: Story = {
  args: {
    label: 'Large Primary',
    variant: 'primary',
    size: { width: 160, height: 48 },
  },
};

export const LargeSecondary: Story = {
  args: {
    label: 'Large Secondary',
    variant: 'secondary',
    size: { width: 160, height: 48 },
  },
};
