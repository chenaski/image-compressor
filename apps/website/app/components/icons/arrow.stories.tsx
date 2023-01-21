import type { Meta, StoryObj } from '@storybook/react';

import { Arrow } from '~/components/icons/arrow';

export default {
  title: 'Components/Icons/Arrow',
  component: Arrow,
} satisfies Meta<typeof Arrow>;

export const Default: StoryObj<typeof Arrow> = {};
