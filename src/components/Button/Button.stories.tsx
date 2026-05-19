// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// ---- Meta — describes the component to Storybook ----
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],             // Auto-generates a Docs page
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible button component with multiple variants, sizes, loading states, and icon support. Forwards refs to the underlying `<button>` element.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary','secondary','success','warning','danger','info','ghost','outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['xs','sm','md','lg','xl'],
      description: 'Size of the button',
    },
    loading:   { control: 'boolean', description: 'Show loading spinner' },
    disabled:  { control: 'boolean', description: 'Disable the button' },
    fullWidth: { control: 'boolean', description: 'Stretch to full width' },
    iconOnly:  { control: 'boolean', description: 'Square icon-only mode' },
    onClick:   { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ---- Stories ----

export const Primary: Story = {
  args: { children: 'Click me', variant: 'primary', size: 'md' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Success: Story = {
  args: { children: 'Save changes', variant: 'success' },
};

export const Warning: Story = {
  args: { children: 'Proceed with caution', variant: 'warning' },
};

export const Danger: Story = {
  args: { children: 'Delete item', variant: 'danger' },
};

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost' },
};

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline' },
};

export const Loading: Story = {
  args: { children: 'Saving...', variant: 'primary', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Disabled', variant: 'primary', disabled: true },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Download',
    variant: 'primary',
    leftIcon: '⬇️',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    variant: 'primary',
    rightIcon: '→',
  },
};

export const FullWidth: Story = {
  args: { children: 'Full width button', variant: 'primary', fullWidth: true },
  parameters: { layout: 'padded' },
};

// ---- All Sizes ----
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// ---- All Variants ----
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
