// src/components/Spinner/Spinner.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:  { control: 'select', options: ['xs','sm','md','lg','xl'] },
    color: { control: 'select', options: ['primary','secondary','success','warning','danger','info','neutral'] },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: { size: 'md', color: 'primary' } };
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      {(['xs','sm','md','lg','xl'] as const).map(s => <Spinner key={s} size={s} />)}
    </div>
  ),
};
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      {(['primary','success','warning','danger','info','neutral'] as const).map(c => (
        <Spinner key={c} color={c} />
      ))}
    </div>
  ),
};
