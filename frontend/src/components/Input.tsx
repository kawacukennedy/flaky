import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  className,
  ...props
}) => {
  const baseStyles = 'block w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-primary transition-all duration-200 ease-standard';
  const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';
  const errorStyles = error ? 'border-danger animate-shake animation-duration-150' : 'border-border dark:border-surface_dark';

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text_light dark:text-text_dark mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${baseStyles} ${focusStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger animate-fade-slide-in">{error}</p>}
    </div>
  );
};

export default Input;
