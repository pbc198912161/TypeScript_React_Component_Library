// src/components/Input/Input.tsx
import React, { forwardRef, useId } from 'react';
import type { Size, BaseProps } from '../../types/common';
import { cn } from '../../utils/cn';
import styles from './Input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    BaseProps {
  /** Label displayed above the input */
  label?: string;
  /** Helper text displayed below the input */
  hint?: string;
  /** Error message — also sets aria-invalid */
  error?: string;
  /** Success message */
  success?: string;
  /** Input size */
  size?: Size;
  /** Icon or element on the left inside the input */
  leftAddon?: React.ReactNode;
  /** Icon or element on the right inside the input */
  rightAddon?: React.ReactNode;
  /** Stretch to full width of container */
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      success,
      size = 'md',
      leftAddon,
      rightAddon,
      fullWidth = true,
      className,
      id: externalId,
      disabled,
      required,
      'data-testid': testId,
      ...rest
    },
    ref,
  ) => {
    // useId generates a stable, unique ID for label/input association
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId  = `${id}-hint`;
    const errorId = `${id}-error`;

    const hasError   = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    return (
      <div
        className={cn(
          styles.wrapper,
          fullWidth && styles['wrapper--full'],
        )}
        data-testid={testId}
      >
        {/* Label */}
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true"> *</span>
            )}
          </label>
        )}

        {/* Input row — contains addons + input */}
        <div
          className={cn(
            styles.inputRow,
            styles[`inputRow--${size}`],
            hasError   && styles['inputRow--error'],
            hasSuccess && styles['inputRow--success'],
            disabled   && styles['inputRow--disabled'],
          )}
        >
          {leftAddon && (
            <span className={styles.addon} aria-hidden="true">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              error   ? errorId :
              hint    ? hintId  :
              undefined
            }
            className={cn(
              styles.input,
              leftAddon  && styles['input--hasLeft'],
              rightAddon && styles['input--hasRight'],
              className,
            )}
            {...rest}
          />

          {rightAddon && (
            <span className={styles.addon} aria-hidden="true">
              {rightAddon}
            </span>
          )}

          {/* Inline status icons */}
          {hasError   && <span className={styles.statusIcon} aria-hidden="true">✕</span>}
          {hasSuccess && <span className={styles.statusIcon} aria-hidden="true">✓</span>}
        </div>

        {/* Messages */}
        {error && (
          <p id={errorId} className={styles.errorMsg} role="alert">
            {error}
          </p>
        )}
        {success && !error && (
          <p className={styles.successMsg}>{success}</p>
        )}
        {hint && !error && !success && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
