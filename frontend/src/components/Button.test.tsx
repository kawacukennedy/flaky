import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { describe, it, expect, vi } from 'vitest'; // Using Vitest for now, assuming it's available or will be set up

describe('Button', () => {
  it('renders with primary variant and default size', () => {
    render(<Button label="Click Me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('renders with secondary variant and custom size', () => {
    render(
      <Button label="View Details" variant="secondary" size={{ width: 100, height: 40 }} />
    );
    const button = screen.getByRole('button', { name: /view details/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('w-[100px]');
    expect(button).toHaveClass('h-[40px]');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Submit" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies additional className', () => {
    render(<Button label="Custom" className="custom-class" />);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
  });
});
