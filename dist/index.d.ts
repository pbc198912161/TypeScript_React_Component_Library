import React from 'react';

/** Visual size scale used by most components */
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** Semantic colour variants */
type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost' | 'outline';
/** All valid HTML colour values + our custom tokens */
type ColorToken = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
/** Base props every component should accept */
interface BaseProps {
    /** Additional CSS classes */
    className?: string;
    /** Inline styles (use sparingly) */
    style?: React.CSSProperties;
    /** Test ID for React Testing Library */
    'data-testid'?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
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
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseProps {
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
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface BadgeProps extends BaseProps {
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
declare const Badge: React.FC<BadgeProps>;

interface CardProps extends BaseProps {
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
interface CardHeaderProps extends BaseProps {
    children: React.ReactNode;
}
declare const CardHeader: React.FC<CardHeaderProps>;
interface CardBodyProps extends BaseProps {
    children: React.ReactNode;
}
declare const CardBody: React.FC<CardBodyProps>;
interface CardFooterProps extends BaseProps {
    children: React.ReactNode;
}
declare const CardFooter: React.FC<CardFooterProps>;
declare const Card: React.FC<CardProps> & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
};

interface SpinnerProps extends BaseProps {
    size?: Size;
    color?: ColorToken;
    /** Accessible label announced to screen readers */
    label?: string;
}
declare const Spinner: React.FC<SpinnerProps>;

interface ModalProps extends BaseProps {
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
declare const Modal: React.FC<ModalProps>;

interface UseDisclosureReturn {
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
declare function useDisclosure(defaultOpen?: boolean): UseDisclosureReturn;

export { Badge, Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, Spinner, useDisclosure };
export type { BadgeProps, BaseProps, ButtonProps, CardBodyProps, CardFooterProps, CardHeaderProps, CardProps, ColorToken, InputProps, ModalProps, Size, SpinnerProps, UseDisclosureReturn, Variant };
