import type { Meta, StoryObj } from '@storybook/react';

import { AddButton } from '~/components/add-button';

export default {
  title: 'Components/AddButton',
  component: AddButton,
  tags: ['autodocs'],
} satisfies Meta<typeof AddButton>;

export const Default: StoryObj<typeof AddButton> = {
  args: {
    onClick: () => {},
  },
};
