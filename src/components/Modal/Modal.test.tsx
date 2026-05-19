// src/components/Modal/Modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Modal } from './Modal';
import { Button } from '../Button';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  title: 'Test Modal',
  children: <p>Modal content</p>,
};

beforeEach(() => jest.clearAllMocks());

describe('Modal', () => {
  it('renders when isOpen=true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen=false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('title is linked via aria-labelledby', () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(document.getElementById(labelId!)).toHaveTextContent('Test Modal');
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByTestId('modal-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does NOT close on backdrop click when closeOnBackdrop=false', async () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnBackdrop={false} />);
    await userEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders footer content', () => {
    render(
      <Modal {...defaultProps} footer={<Button>Save</Button>}>
        Body
      </Modal>,
    );
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('hides close button when hideCloseButton=true', () => {
    render(<Modal {...defaultProps} hideCloseButton />);
    expect(screen.queryByTestId('modal-close')).not.toBeInTheDocument();
  });
});
