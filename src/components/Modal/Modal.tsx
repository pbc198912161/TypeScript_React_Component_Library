// src/components/Modal/Modal.tsx
// ============================================================
//  MODAL COMPONENT
//  Key a11y features:
//  - role="dialog" + aria-modal="true"
//  - aria-labelledby / aria-describedby
//  - Focus trap inside modal when open
//  - Closes on Escape key
//  - Closes on backdrop click (optional)
//  - Returns focus to trigger element on close
// ============================================================
import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { BaseProps } from '../../types/common';
import styles from './Modal.module.css';

export interface ModalProps extends BaseProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal title (also used for aria-labelledby) */
  title: string;
  /** Optional description for aria-describedby */
  description?: string;
  children: React.ReactNode;
  /** Size of the modal dialog */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Close when backdrop is clicked (default: true) */
  closeOnBackdrop?: boolean;
  /** Hide the close button */
  hideCloseButton?: boolean;
  /** Footer content (buttons, etc.) */
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnBackdrop = true,
  hideCloseButton = false,
  footer,
  className,
  'data-testid': testId,
}) => {
  const dialogRef   = useRef<HTMLDivElement>(null);
  const titleId     = `modal-title-${React.useId()}`;
  const descId      = `modal-desc-${React.useId()}`;

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Focus first focusable element when opened
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable[0]?.focus();
  }, [isOpen]);

  const handleBackdrop = useCallback(() => {
    if (closeOnBackdrop) onClose();
  }, [closeOnBackdrop, onClose]);

  if (!isOpen) return null;

  return (
    // Backdrop — no aria-hidden here, that would hide the dialog from screen readers
    <div
      className={styles.backdrop}
      onClick={handleBackdrop}
      data-testid="modal-backdrop"
    >
      {/* Dialog — stops click propagation to backdrop */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        onClick={e => e.stopPropagation()}
        data-testid={testId ?? 'modal'}
        className={cn(styles.dialog, styles[`dialog--${size}`], className)}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="Close modal"
              data-testid="modal-close"
            >
              ✕
            </button>
          )}
        </div>

        {/* Description */}
        {description && (
          <p id={descId} className={styles.description}>{description}</p>
        )}

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};
