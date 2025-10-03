import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GlobalToast from './GlobalToast';
import toastReducer, { addToast } from '../../app/slices/toastSlice';

// Mock store for tests
const createMockStore = (initialState: any) =>
  configureStore({
    reducer: {
      toast: toastReducer,
    },
    preloadedState: initialState,
  });

describe('GlobalToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders a success toast message', () => {
    const store = createMockStore({ toast: { toasts: [] } });
    store.dispatch(addToast({ message: 'Success!', type: 'success' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-success');
  });

  it('renders an error toast message', () => {
    const store = createMockStore({ toast: { toasts: [] } });
    store.dispatch(addToast({ message: 'Error!', type: 'error' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-danger');
  });

  it('dismisses toast automatically after duration', async () => {
    const store = createMockStore({ toast: { toasts: [] } });
    store.dispatch(addToast({ id: 'test-toast', message: 'Auto dismiss', type: 'info', duration: 1000 }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Auto dismiss')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Auto dismiss')).not.toBeInTheDocument();
  });

  it('does not dismiss toast with duration 0', () => {
    const store = createMockStore({ toast: { toasts: [] } });
    store.dispatch(addToast({ id: 'test-toast', message: 'Persistent', type: 'warning', duration: 0 }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Persistent')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Persistent')).toBeInTheDocument();
  });

  it('dismisses toast when close button is clicked', async () => {
    const store = createMockStore({ toast: { toasts: [] } });
    store.dispatch(addToast({ id: 'test-toast', message: 'Closable', type: 'info' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Closable')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close toast');
    await userEvent.click(closeButton);

    expect(screen.queryByText('Closable')).not.toBeInTheDocument();
  });
});
