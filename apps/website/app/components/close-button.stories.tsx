import type { Meta, StoryObj } from '@storybook/react';

import { CloseButton } from '~/components/close-button';

export default {
  title: 'Components/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CloseButton>;

export const Default: StoryObj<typeof CloseButton> = {
  args: {
    onClick: () => {},
  },
};
