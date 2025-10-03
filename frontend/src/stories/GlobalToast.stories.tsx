import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import GlobalToast from '../components/layout/GlobalToast';
import toastReducer, { addToast } from '../app/slices/toastSlice';

// Mock store for Storybook
const createMockStore = (initialState: any) =>
  configureStore({
    reducer: {
      toast: toastReducer,
    },
    preloadedState: initialState,
  });

const meta: Meta<typeof GlobalToast> = {
  title: 'Layout/GlobalToast',
  component: GlobalToast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const store = createMockStore(context.args.initialReduxState);
      // Dispatch toasts for the story
      context.args.toastsToDispatch.forEach((toast: any) => store.dispatch(addToast(toast)));
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  argTypes: {
    // These are not direct props of GlobalToast, but used by the decorator
    initialReduxState: { control: 'object', description: 'Initial Redux state for the toast slice' },
    toastsToDispatch: { control: 'object', description: 'Array of toasts to dispatch for the story' },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalToast>;

export const SuccessToast: Story = {
  args: {
    initialReduxState: { toast: { toasts: [] } },
    toastsToDispatch: [
      { message: 'Operation successful!', type: 'success', duration: 5000 },
    ],
  },
};

export const ErrorToast: Story = {
  args: {
    initialReduxState: { toast: { toasts: [] } },
    toastsToDispatch: [
      { message: 'Something went wrong.', type: 'error', duration: 0 },
    ],
  },
};

export const WarningToast: Story = {
  args: {
    initialReduxState: { toast: { toasts: [] } },
    toastsToDispatch: [
      { message: 'Please review your changes.', type: 'warning', duration: 4000 },
    ],
  },
};

export const InfoToast: Story = {
  args: {
    initialReduxState: { toast: { toasts: [] } },
    toastsToDispatch: [
      { message: 'New update available.', type: 'info', duration: 3000 },
    ],
  },
};

export const MultipleToasts: Story = {
  args: {
    initialReduxState: { toast: { toasts: [] } },
    toastsToDispatch: [
      { message: 'First success message.', type: 'success', duration: 2000 },
      { message: 'Second info message.', type: 'info', duration: 3000 },
      { message: 'Third error message.', type: 'error', duration: 0 },
    ],
  },
};
