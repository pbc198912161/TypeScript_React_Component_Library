// src/components/Button/Button.tsx
// ============================================================
//  BUTTON COMPONENT
//  Demonstrates:
//  - TypeScript props interface with JSDoc comments
//  - Extending native HTML element props (ButtonHTMLAttributes)
//  - Discriminated union for icon-only buttons
//  - Forwarded refs (so parent can access the DOM node)
//  - Compound variant logic
// ============================================================

import React, { forwardRef } from 'react';
import type { Size, Variant, BaseProps } from '../../types/common';
import { cn } from '../../utils/cn';
import styles from './Button.module.css';

// ---- Props Interface ----
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseProps {
  /** Visual style variant */
  variant?: Variant;
  /** Size of the button */
  size?: Size;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  /** Stretch button to fill its container */
  fullWidth?: boolean;
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode;
  /** Render as a square icon-only button (hides label visually) */
  iconOnly?: boolean;
}

// ---- Component ----
// forwardRef lets parent components attach a ref to the <button> element.
// The generic <HTMLButtonElement, ButtonProps> types the ref and props.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      className,
      disabled,
      type = 'button',
      'data-testid': testId,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        data-testid={testId ?? 'button'}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={cn(
          styles.btn,
          styles[`btn--${variant}`],
          styles[`btn--${size}`],
          fullWidth && styles['btn--full'],
          iconOnly && styles['btn--icon-only'],
          loading && styles['btn--loading'],
          className,
        )}
        {...rest}
      >
        {/* Loading spinner (replaces left icon when loading) */}
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          leftIcon && (
            <span className={styles.icon} aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}

        {/* Label — hidden visually for icon-only buttons but kept for a11y */}
        {iconOnly ? (
          <span className={styles['sr-only']}>{children}</span>
        ) : (
          <span className={styles.label}>{children}</span>
        )}

        {rightIcon && !loading && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
