import React from 'react';

/**
 * Reusable button component with different variants and sizes
 * Supports all native button props
 */
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  ...props 
}) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    outline: 'btn-outline'
  };
  const sizeClasses = {
    small: 'btn-sm',
    medium: '',
    large: 'btn-lg'
  };

  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'btn-disabled' : '',
    props.className || ''
  ].filter(Boolean).join(' ');

  return (
    <button
      {...props}
      className={className}
      disabled={disabled || loading}
    >
      {loading && <span className="btn-spinner">⏳</span>}
      {children}
    </button>
  );
}

export default Button;