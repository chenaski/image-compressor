import type { Meta, StoryObj } from '@storybook/react';

import { CheckMarkIcon } from '~/components/icons/check-mark-icon';

export default {
  title: 'Components/Icons/CheckMarkIcon',
  component: CheckMarkIcon,
} satisfies Meta<typeof CheckMarkIcon>;

export const Default: StoryObj<typeof CheckMarkIcon> = {};
