import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '~/components/icons/icon';

export default {
  title: 'Components/Icons/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export const Default: StoryObj<typeof Icon> = {};

export const WithHiddenParts: StoryObj<typeof Icon> = {
  args: {
    hideParts: true,
  },
};
