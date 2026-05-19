// ============================================================
//  LIBRARY ENTRY POINT
//  Everything exported here is available to consumers
//  when they install and import from @mylib/ui
// ============================================================

// Components
export { Button }  from './components/Button';
export { Input }   from './components/Input';
export { Badge }   from './components/Badge';
export { Card, CardHeader, CardBody, CardFooter } from './components/Card';
export { Spinner } from './components/Spinner';
export { Modal }   from './components/Modal';

// Types
export type { ButtonProps }  from './components/Button';
export type { InputProps }   from './components/Input';
export type { BadgeProps }   from './components/Badge';
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './components/Card';
export type { SpinnerProps } from './components/Spinner';
export type { ModalProps }   from './components/Modal';

// Hooks
export { useDisclosure } from './hooks/useDisclosure';
export type { UseDisclosureReturn } from './hooks/useDisclosure';

// Shared types
export type { Size, Variant, ColorToken, BaseProps } from './types/common';
