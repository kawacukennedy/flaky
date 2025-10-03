import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import { describe, it, expect, vi } from 'vitest';

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /test modal/i })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    const closeButton = screen.getByRole('button'); // Assuming there's only one button for closing
    await userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the modal content', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    // Click on the backdrop (parent div of the modal content)
    await userEvent.click(screen.getByText('Modal Content').closest('.fixed.inset-0.z-50') as HTMLElement);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the modal content', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    await userEvent.click(screen.getByText('Modal Content'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('toggles body overflow when modal opens and closes', () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('unset');

    rerender(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('unset');
  });
});
