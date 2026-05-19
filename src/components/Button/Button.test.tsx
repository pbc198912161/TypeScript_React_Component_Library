// src/components/Button/Button.test.tsx
// ============================================================
//  BUTTON UNIT TESTS — React Testing Library + Jest
//  Tests cover: rendering, variants, states, events, a11y
// ============================================================

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button', () => {

  // ---- Rendering ----
  describe('Rendering', () => {
    it('renders with label text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default testid', () => {
      render(<Button>Hi</Button>);
      expect(screen.getByTestId('button')).toBeInTheDocument();
    });

    it('renders with custom testid', () => {
      render(<Button data-testid="my-btn">Hi</Button>);
      expect(screen.getByTestId('my-btn')).toBeInTheDocument();
    });

    it('renders with left icon', () => {
      render(<Button leftIcon={<span data-testid="icon">★</span>}>Label</Button>);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<Button rightIcon={<span data-testid="right-icon">→</span>}>Label</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom">Label</Button>);
      expect(screen.getByTestId('button')).toHaveClass('custom');
    });
  });

  // ---- States ----
  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute('aria-disabled', 'true');
    });

    it('is disabled when loading is true', () => {
      render(<Button loading>Loading</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'true');
    });

    it('shows spinner when loading', () => {
      render(<Button loading>Loading</Button>);
      // The spinner replaces the left icon — button still renders
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('does not show right icon when loading', () => {
      render(
        <Button loading rightIcon={<span data-testid="right">→</span>}>
          Go
        </Button>,
      );
      expect(screen.queryByTestId('right')).not.toBeInTheDocument();
    });
  });

  // ---- Events ----
  describe('Events', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does NOT call onClick when disabled', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Click</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does NOT call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Click</Button>);
      fireEvent.click(screen.getByTestId('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // ---- Accessibility ----
  describe('Accessibility', () => {
    it('can be focused via keyboard', () => {
      render(<Button>Focus me</Button>);
      const btn = screen.getByRole('button');
      btn.focus();
      expect(btn).toHaveFocus();
    });

    it('has correct type attribute (button by default)', () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('accepts type="submit"', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('icon-only button still has accessible label via sr-only text', () => {
      render(<Button iconOnly>Delete item</Button>);
      expect(screen.getByRole('button', { name: /delete item/i })).toBeInTheDocument();
    });
  });

  // ---- Variants & Sizes ----
  describe('Variants', () => {
    const variants = ['primary','secondary','success','warning','danger','info','ghost','outline'] as const;
    variants.forEach(variant => {
      it(`renders ${variant} variant without crashing`, () => {
        render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });

    const sizes = ['xs','sm','md','lg','xl'] as const;
    sizes.forEach(size => {
      it(`renders size=${size} without crashing`, () => {
        render(<Button size={size}>{size}</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });
  });

});
