// src/types/common.ts
// ============================================================
//  SHARED TYPES
//  These are used across multiple components.
//  Centralising them avoids duplication and keeps
//  the type system consistent across the library.
// ============================================================

/** Visual size scale used by most components */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Semantic colour variants */
export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'ghost'
  | 'outline';

/** All valid HTML colour values + our custom tokens */
export type ColorToken =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

/** Base props every component should accept */
export interface BaseProps {
  /** Additional CSS classes */
  className?: string;
  /** Inline styles (use sparingly) */
  style?: React.CSSProperties;
  /** Test ID for React Testing Library */
  'data-testid'?: string;
}

// We need React for the CSSProperties type above
import type React from 'react';
