// src/components/Badge/Badge.tsx
import React from 'react';
import type { ColorToken, Size, BaseProps } from '../../types/common';
import { cn } from '../../utils/cn';
import styles from './Badge.module.css';

export interface BadgeProps extends BaseProps {
  /** Semantic colour */
  color?: ColorToken;
  /** Size variant */
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
  /** Render as a pill (fully rounded) vs square */
  pill?: boolean;
  /** Optional dot indicator before the label */
  dot?: boolean;
  /** Optional count — renders a number bubble instead of children */
  count?: number;
  /** If count exceeds this value, shows "{max}+" instead */
  maxCount?: number;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  color = 'primary',
  size = 'md',
  pill = true,
  dot = false,
  count,
  maxCount = 99,
  children,
  className,
  'data-testid': testId,
}) => {
  const label =
    count !== undefined
      ? count > maxCount
        ? `${maxCount}+`
        : String(count)
      : children;

  return (
    <span
      data-testid={testId ?? 'badge'}
      className={cn(
        styles.badge,
        styles[`badge--${color}`],
        styles[`badge--${size}`],
        pill && styles['badge--pill'],
        dot  && styles['badge--dot'],
        className,
      )}
    >
      {dot && <span className={styles.dotIndicator} aria-hidden="true" />}
      {label}
    </span>
  );
};
