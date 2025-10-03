import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogsViewer from './LogsViewer';

// Mock react-syntax-highlighter to avoid issues with its rendering in tests
jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children }: { children: string }) => <pre data-testid="syntax-highlighter">{children}</pre>,
  // Mocking styles as well if they are directly imported and used
  // vscDarkPlus: {},
}));

describe('LogsViewer', () => {
  const mockLogs = `Line 1: Info message
Line 2: Warning message
Line 3: Error occurred
Traceback (most recent call last):
  File "test.py", line 10, in <module>
    raise ValueError("Test error")
ValueError: Test error`;

  const simpleLogs = `Just some simple logs.`;

  beforeEach(() => {
    jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the logs content', () => {
    render(<LogsViewer logs={simpleLogs} />);
    expect(screen.getByText(simpleLogs)).toBeInTheDocument();
  });

  it('renders the copy button', () => {
    render(<LogsViewer logs={simpleLogs} />);
    expect(screen.getByLabelText('Copy logs to clipboard')).toBeInTheDocument();
  });

  it('copies logs to clipboard when copy button is clicked', async () => {
    render(<LogsViewer logs={simpleLogs} />);
    fireEvent.click(screen.getByLabelText('Copy logs to clipboard'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(simpleLogs);
    await waitFor(() => expect(screen.getByText('Copied!')).toBeInTheDocument());
  });

  it('renders expand/collapse button for logs with stacktrace', () => {
    render(<LogsViewer logs={mockLogs} />);
    expect(screen.getByRole('button', { name: 'Expand Stacktrace' })).toBeInTheDocument();
  });

  it('does not render expand/collapse button for logs without stacktrace', () => {
    render(<LogsViewer logs={simpleLogs} />);
    expect(screen.queryByRole('button', { name: /Stacktrace/i })).not.toBeInTheDocument();
  });

  it('expands and collapses stacktrace', () => {
    render(<LogsViewer logs={mockLogs} />);
    const expandButton = screen.getByRole('button', { name: 'Expand Stacktrace' });
    fireEvent.click(expandButton);
    expect(screen.getByRole('button', { name: 'Collapse Stacktrace' })).toBeInTheDocument();
    expect(screen.getByText(/ValueError: Test error/)).toBeInTheDocument(); // Stacktrace content

    fireEvent.click(screen.getByRole('button', { name: 'Collapse Stacktrace' }));
    expect(screen.getByRole('button', { name: 'Expand Stacktrace' })).toBeInTheDocument();
    expect(screen.queryByText(/ValueError: Test error/)).not.toBeInTheDocument();
  });
});