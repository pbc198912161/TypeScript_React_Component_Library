// src/components/Spinner/Spinner.tsx
import React from 'react';
import type { Size, ColorToken, BaseProps } from '../../types/common';
import { cn } from '../../utils/cn';
import styles from './Spinner.module.css';

export interface SpinnerProps extends BaseProps {
  size?: Size;
  color?: ColorToken;
  /** Accessible label announced to screen readers */
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label = 'Loading…',
  className,
  'data-testid': testId,
}) => (
  <span
    role="status"
    aria-label={label}
    data-testid={testId ?? 'spinner'}
    className={cn(styles.spinner, styles[`spinner--${size}`], styles[`spinner--${color}`], className)}
  >
    <span className={styles.srOnly}>{label}</span>
  </span>
);
