// src/components/Card/Card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Hello card</Card>);
    expect(screen.getByTestId('card')).toHaveTextContent('Hello card');
  });

  it('renders sub-components correctly', () => {
    render(
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Body text</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('is interactive when onClick is provided', async () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>Click me</Card>);
    const card = screen.getByRole('button');
    await userEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not have role=button when not interactive', () => {
    render(<Card>Static card</Card>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('is keyboard activatable when interactive', async () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>Press Enter</Card>);
    const card = screen.getByRole('button');
    card.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });
});
