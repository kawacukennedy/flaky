import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'muted';
  size?: { width?: number; height?: number };
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size,
  onClick,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-fast ease-standard';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary_hover shadow-sm',
    secondary: 'bg-secondary text-white hover:bg-gray-600 shadow-sm',
    danger: 'bg-danger text-white hover:bg-red-700 shadow-sm',
    success: 'bg-success text-white hover:bg-green-700 shadow-sm',
    warning: 'bg-warning text-white hover:bg-yellow-700 shadow-sm',
    info: 'bg-info text-white hover:bg-blue-700 shadow-sm',
    muted: 'bg-muted text-white hover:bg-gray-500 shadow-sm',
  };

  const sizeStyles = size
    ? { width: size.width ? `${size.width}px` : 'auto', height: size.height ? `${size.height}px` : 'auto' }
    : 'px-4 py-2';

  // Ripple effect (simplified for now, full implementation might require a separate hook/component)
  const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className, 'relative overflow-hidden')}
      style={typeof sizeStyles === 'object' ? sizeStyles : undefined}
      onClick={handleRipple}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
