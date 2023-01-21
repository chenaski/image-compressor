import type { Meta, StoryObj } from '@storybook/react';

import { CloseIcon } from '~/components/icons/close-icon';

export default {
  title: 'Components/Icons/CloseIcon',
  component: CloseIcon,
} satisfies Meta<typeof CloseIcon>;

export const Default: StoryObj<typeof CloseIcon> = {};
