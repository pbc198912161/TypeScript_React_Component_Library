// src/components/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Badge } from '../Badge';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    accent:    { control: 'select', options: ['none','primary','success','warning','danger','info'] },
    hoverable: { control: 'boolean' },
    noPadding: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <Card.Header>
        <strong>Card title</strong>
        <Badge color="primary">New</Badge>
      </Card.Header>
      <Card.Body>
        This is the card body. Cards can hold any content — text, forms, media, or other components.
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="primary">Action</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card hoverable style={{ maxWidth: 360 }}>
      <Card.Header><strong>Hoverable card</strong></Card.Header>
      <Card.Body>Hover over me to see the lift effect.</Card.Body>
    </Card>
  ),
};

export const Accents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 }}>
      {(['primary','success','warning','danger','info'] as const).map(a => (
        <Card key={a} accent={a}>
          <Card.Header><strong>{a} accent</strong></Card.Header>
          <Card.Body>Left border accent using the {a} colour token.</Card.Body>
        </Card>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card hoverable onClick={() => alert('Card clicked!')} style={{ maxWidth: 320 }}>
      <Card.Header><strong>Click me</strong></Card.Header>
      <Card.Body>This card is interactive — it has role=button and keyboard support.</Card.Body>
    </Card>
  ),
};
