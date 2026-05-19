// src/components/Modal/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { useDisclosure } from '../../hooks/useDisclosure';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm','md','lg','full'] },
    closeOnBackdrop: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

// We need a wrapper to handle open/close state in stories
const ModalDemo = ({ size = 'md' }: { size?: 'sm'|'md'|'lg'|'full' }) => {
  const { isOpen, open, close } = useDisclosure();
  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Confirm Action"
        description="This action cannot be undone. Please review before confirming."
        size={size}
        footer={
          <>
            <Button variant="ghost" onClick={close}>Cancel</Button>
            <Button variant="danger" onClick={close}>Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete this item? All associated data will be permanently removed from our servers.</p>
      </Modal>
    </>
  );
};

export const Default: Story    = { render: () => <ModalDemo /> };
export const Small: Story      = { render: () => <ModalDemo size="sm" /> };
export const Large: Story      = { render: () => <ModalDemo size="lg" /> };
