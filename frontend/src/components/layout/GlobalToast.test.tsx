import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GlobalToast from './GlobalToast';
import { showToast, clearToast } from '../../app/slices/toastSlice';
import { RootState } from '../../app/store'; // Assuming RootState is exported from store
import { vi } from 'vitest';

const mockStore = configureStore([]);

describe('GlobalToast', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      toast: {
        message: null,
        type: null,
        id: null,
      },
    } as RootState); // Cast to RootState
  });

  it('does not render when no toast message is present', () => {
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders a success toast message', () => {
    store.dispatch(showToast({ message: 'Operation successful!', type: 'success' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Operation successful!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-success');
  });

  it('renders an error toast message', () => {
    store.dispatch(showToast({ message: 'Operation failed!', type: 'error' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Operation failed!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-danger');
  });

  it('renders an info toast message', () => {
    store.dispatch(showToast({ message: 'Information alert!', type: 'info' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Information alert!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-info');
  });

  it('renders a warning toast message', () => {
    store.dispatch(showToast({ message: 'Warning!', type: 'warning' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    expect(screen.getByText('Warning!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-warning');
  });

  it('dispatches clearToast when the close button is clicked', () => {
    store.dispatch(showToast({ message: 'Test message', type: 'info' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );
    fireEvent.click(screen.getByLabelText('Close toast'));
    const actions = store.getActions();
    expect(actions).toContainEqual(clearToast());
  });

  it('dispatches clearToast automatically after 5 seconds', async () => {
    vi.useFakeTimers();
    store.dispatch(showToast({ message: 'Auto-clear message', type: 'success' }));
    render(
      <Provider store={store}>
        <GlobalToast />
      </Provider>
    );

    expect(screen.getByText('Auto-clear message')).toBeInTheDocument();

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(clearToast());
    });

    vi.useRealTimers();
  });
});