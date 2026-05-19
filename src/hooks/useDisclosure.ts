// src/hooks/useDisclosure.ts
// ============================================================
//  useDisclosure HOOK
//  Manages open/close state for modals, drawers, tooltips,
//  dropdowns — any component that can be shown/hidden.
//
//  Returns a stable API object so callers don't need to
//  manage their own boolean state.
// ============================================================

import { useState, useCallback } from 'react';

export interface UseDisclosureReturn {
  /** Whether the component is currently open */
  isOpen: boolean;
  /** Open the component */
  open: () => void;
  /** Close the component */
  close: () => void;
  /** Toggle between open and closed */
  toggle: () => void;
}

/**
 * Hook for managing open/close state.
 *
 * @param defaultOpen - Whether it starts open (default: false)
 *
 * @example
 * const { isOpen, open, close } = useDisclosure();
 * return (
 *   <>
 *     <Button onClick={open}>Open Modal</Button>
 *     <Modal isOpen={isOpen} onClose={close} />
 *   </>
 * );
 */
export function useDisclosure(defaultOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // useCallback ensures these functions have stable references
  // so they don't cause unnecessary re-renders in child components.
  const open   = useCallback(() => setIsOpen(true),  []);
  const close  = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(v => !v), []);

  return { isOpen, open, close, toggle };
}
