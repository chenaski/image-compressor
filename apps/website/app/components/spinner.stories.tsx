import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '~/components/spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export const Default: StoryObj<typeof Spinner> = {};
