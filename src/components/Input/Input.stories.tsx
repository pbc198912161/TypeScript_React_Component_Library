// src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A fully accessible text input with label, hint, error/success states, size variants, and left/right addons. Forwards refs to the native `<input>` element.',
      },
    },
  },
  argTypes: {
    size:     { control: 'select', options: ['xs','sm','md','lg','xl'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com' },
};

export const WithHint: Story = {
  args: {
    label: 'Password',
    type: 'password',
    hint: 'Must be at least 8 characters',
    placeholder: '••••••••',
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    defaultValue: 'ab',
    error: 'Username must be at least 3 characters',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    defaultValue: 'janesmith',
    success: 'Username is available!',
  },
};

export const Disabled: Story = {
  args: { label: 'Read-only field', defaultValue: 'Cannot edit this', disabled: true },
};

export const Required: Story = {
  args: { label: 'Full name', placeholder: 'Jane Doe', required: true },
};

export const WithLeftAddon: Story = {
  args: {
    label: 'Username',
    leftAddon: '@',
    placeholder: 'yourusername',
  },
};

export const WithRightAddon: Story = {
  args: {
    label: 'Search',
    rightAddon: '🔍',
    placeholder: 'Search components...',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
      <Input size="xs" placeholder="Extra small" label="xs" />
      <Input size="sm" placeholder="Small" label="sm" />
      <Input size="md" placeholder="Medium (default)" label="md" />
      <Input size="lg" placeholder="Large" label="lg" />
      <Input size="xl" placeholder="Extra large" label="xl" />
    </div>
  ),
};
