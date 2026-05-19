// src/utils/cn.ts
// ============================================================
//  CLASS NAME UTILITY
//  A tiny helper that joins class names and filters out
//  falsy values (undefined, null, false).
//  Works like the popular `clsx` library but zero-dep.
// ============================================================

/**
 * Merge class names, filtering out falsy values.
 *
 * @example
 * cn('btn', isDisabled && 'btn--disabled', className)
 * // → 'btn btn--disabled extra-class'
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
