import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: { width: number; height: number };
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size,
  onClick,
  className,
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const baseStyles = 'font-medium rounded-md transition-all duration-normal ease-standard hover:scale-[1.02] transform relative overflow-hidden';

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary_hover shadow-sm hover:shadow-md',
    secondary:
      'bg-secondary text-white hover:opacity-90 shadow-sm',
  };

  const sizeStyles = size
    ? `w-[${size.width}px] h-[${size.height}px]`
    : 'px-4 py-2';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples((prevRipples) => [...prevRipples, { x, y, id }]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id));
    }, 600); // Ripple animation duration

    onClick?.();
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles} ${className}`}
      onClick={handleClick}
    >
      {label}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white opacity-30 rounded-full animate-ripple"
          style={{
            animationDuration: '300ms',
            animationTimingFunction: 'ease-out',
          }}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '0px',
            height: '0px',
          }}
        ></span>
      ))}
    </button>
  );
};

export default Button;