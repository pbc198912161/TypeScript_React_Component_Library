// src/components/Badge/Badge.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByTestId('badge')).toHaveTextContent('New');
  });

  it('renders count', () => {
    render(<Badge count={5} />);
    expect(screen.getByTestId('badge')).toHaveTextContent('5');
  });

  it('shows maxCount+ when count exceeds maxCount', () => {
    render(<Badge count={150} maxCount={99} />);
    expect(screen.getByTestId('badge')).toHaveTextContent('99+');
  });

  it('renders dot indicator when dot=true', () => {
    render(<Badge dot>Active</Badge>);
    expect(screen.getByTestId('badge').querySelector('span')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="extra">Label</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('extra');
  });
});
