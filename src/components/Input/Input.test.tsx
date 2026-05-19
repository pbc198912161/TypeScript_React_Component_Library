// src/components/Input/Input.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('Input', () => {

  describe('Rendering', () => {
    it('renders an input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with a label', () => {
      render(<Input label="Email address" />);
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(<Input hint="We will never share your email" />);
      expect(screen.getByText(/we will never share/i)).toBeInTheDocument();
    });

    it('renders error message with role=alert', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('renders success message', () => {
      render(<Input success="Looks good!" />);
      expect(screen.getByText(/looks good/i)).toBeInTheDocument();
    });

    it('shows required asterisk when required', () => {
      render(<Input label="Name" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('renders left addon', () => {
      render(<Input leftAddon={<span data-testid="left">@</span>} />);
      expect(screen.getByTestId('left')).toBeInTheDocument();
    });

    it('renders right addon', () => {
      render(<Input rightAddon={<span data-testid="right">🔍</span>} />);
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('sets aria-invalid when error is present', () => {
      render(<Input error="Error!" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when no error', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('associates error message via aria-describedby', () => {
      render(<Input label="Email" error="Invalid email" />);
      const input = screen.getByRole('textbox');
      const errorEl = screen.getByRole('alert');
      expect(input).toHaveAttribute('aria-describedby', errorEl.id);
    });

    it('is disabled when disabled prop is passed', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('User interaction', () => {
    it('updates value when user types', async () => {
      render(<Input aria-label="test-input" />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'hello world');
      expect(input).toHaveValue('hello world');
    });

    it('calls onChange when typing', async () => {
      const onChange = jest.fn();
      render(<Input aria-label="test" onChange={onChange} />);
      await userEvent.type(screen.getByRole('textbox'), 'a');
      expect(onChange).toHaveBeenCalled();
    });

    it('does not call onChange when disabled', async () => {
      const onChange = jest.fn();
      render(<Input aria-label="test" onChange={onChange} disabled />);
      await userEvent.type(screen.getByRole('textbox'), 'a');
      expect(onChange).not.toHaveBeenCalled();
    });
  });

});
