import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the input field.',
    },
    id: {
      control: 'text',
      description: 'The unique ID for the input field.',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field.',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'The type of the input field.',
    },
    value: {
      control: 'text',
      description: 'The current value of the input field.',
    },
    onChange: { action: 'changed', description: 'Callback function when the input value changes.' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange?.(e);
        }}
      />
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    id: 'default-input',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
  },
};

export const WithError: Story = {
  ...Template,
  args: {
    id: 'error-input',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Invalid email address',
  },
};

export const PasswordInput: Story = {
  ...Template,
  args: {
    id: 'password-input',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

export const NoLabel: Story = {
  ...Template,
  args: {
    id: 'no-label-input',
    placeholder: 'Search...',
    type: 'text',
  },
};
