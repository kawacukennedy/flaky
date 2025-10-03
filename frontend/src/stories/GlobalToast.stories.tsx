import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import GlobalToast from '../components/layout/GlobalToast';
import toastReducer, { showToast } from '../app/slices/toastSlice';
import { useEffect } from 'react';

// Mock store for Storybook
const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
});

const meta = {
  title: 'Layout/GlobalToast',
  component: GlobalToast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof GlobalToast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastTrigger = ({ message, type }: { message: string; type: 'success' | 'error' | 'info' | 'warning' }) => {
  const dispatch = store.dispatch;
  useEffect(() => {
    dispatch(showToast({ message, type }));
  }, [message, type, dispatch]);
  return null;
};

export const Success: Story = {
  args: {
    // No direct args for GlobalToast, it consumes from Redux
  },
  render: () => (
    <>
      <ToastTrigger message="This is a success message!" type="success" />
      <GlobalToast />
    </>
  ),
};

export const Error: Story = {
  args: {},
  render: () => (
    <>
      <ToastTrigger message="This is an error message!" type="error" />
      <GlobalToast />
    </>
  ),
};

export const Info: Story = {
  args: {},
  render: () => (
    <>
      <ToastTrigger message="This is an info message!" type="info" />
      <GlobalToast />
    </>
  ),
};

export const Warning: Story = {
  args: {},
  render: () => (
    <>
      <ToastTrigger message="This is a warning message!" type="warning" />
      <GlobalToast />
    </>
  ),
};
