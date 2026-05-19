// src/components/Card/Card.tsx
import React from 'react';
import { cn } from '../../utils/cn';
import type { BaseProps } from '../../types/common';
import styles from './Card.module.css';

export interface CardProps extends BaseProps {
  /** Card content */
  children: React.ReactNode;
  /** Adds hover lift animation */
  hoverable?: boolean;
  /** Remove default padding */
  noPadding?: boolean;
  /** Visual border accent on the left side */
  accent?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'none';
  /** Click handler — makes card interactive and focusable */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// ---- Sub-components for composable card structure ----

export interface CardHeaderProps extends BaseProps {
  children: React.ReactNode;
}
export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn(styles.header, className)}>{children}</div>
);

export interface CardBodyProps extends BaseProps {
  children: React.ReactNode;
}
export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => (
  <div className={cn(styles.body, className)}>{children}</div>
);

export interface CardFooterProps extends BaseProps {
  children: React.ReactNode;
}
export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn(styles.footer, className)}>{children}</div>
);

// ---- Main Card ----
export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body:   typeof CardBody;
  Footer: typeof CardFooter;
} = ({
  children,
  hoverable = false,
  noPadding = false,
  accent = 'none',
  onClick,
  className,
  'data-testid': testId,
  style,
}) => {
  const isInteractive = Boolean(onClick);

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      } : undefined}
      data-testid={testId ?? 'card'}
      style={style}
      className={cn(
        styles.card,
        hoverable     && styles['card--hoverable'],
        noPadding     && styles['card--no-padding'],
        accent !== 'none' && styles[`card--accent-${accent}`],
        isInteractive && styles['card--interactive'],
        className,
      )}
    >
      {children}
    </div>
  );
};

// Attach sub-components
Card.Header = CardHeader;
Card.Body   = CardBody;
Card.Footer = CardFooter;
