// src/components/Badge/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'select', options: ['primary','secondary','success','warning','danger','info','neutral'] },
    size:  { control: 'select', options: ['sm','md','lg'] },
    pill:  { control: 'boolean' },
    dot:   { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story   = { args: { children: 'Badge', color: 'primary' } };
export const Success: Story   = { args: { children: 'Success', color: 'success', dot: true } };
export const Warning: Story   = { args: { children: 'Warning', color: 'warning' } };
export const Danger: Story    = { args: { children: 'Danger',  color: 'danger' } };
export const WithCount: Story = { args: { count: 42, color: 'danger' } };
export const Overflow: Story  = { args: { count: 999, maxCount: 99, color: 'danger' } };

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {(['primary','secondary','success','warning','danger','info','neutral'] as const).map(c => (
        <Badge key={c} color={c}>{c}</Badge>
      ))}
    </div>
  ),
};
