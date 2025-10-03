import React, { useState, useEffect, useRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300); // Ripple duration
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    }
    onClick?.(event);
  };

  const baseClasses = "relative overflow-hidden font-semibold rounded-md transition-all duration-200 ease-standard flex items-center justify-center";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary_hover shadow-md",
    secondary: "bg-secondary text-white hover:bg-gray-600 shadow-sm",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base w-40 h-12", // Default size for CTA buttons
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
      onClick={handleClick}
      {...props}
    >
      {isRippling && coords.x !== -1 && coords.y !== -1 && (
        <span
          className="ripple absolute bg-white opacity-30 rounded-full animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
