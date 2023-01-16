import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Fake: Story = {
  args: {
    fake: true,
    children: 'Fake',
  },
};
