import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: { width?: number; height?: number };
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl hover:shadow-lg transition-all duration-fast ease-standard";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary_hover shadow-sm",
    secondary: "bg-secondary text-white hover:bg-gray-600 shadow-sm",
    danger: "bg-danger text-white hover:bg-red-700 shadow-sm",
    success: "bg-success text-white hover:bg-green-700 shadow-sm",
    warning: "bg-warning text-white hover:bg-yellow-700 shadow-sm",
    info: "bg-info text-white hover:bg-blue-700 shadow-sm",
    muted: "bg-muted text-white hover:bg-gray-500 shadow-sm",
  };

  const sizeStyles = size
    ? {
        width: size.width ? `${size.width}px` : "auto",
        height: size.height ? `${size.height}px` : "auto",
      }
    : "px-4 py-2";

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      style={typeof sizeStyles === "object" ? sizeStyles : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
