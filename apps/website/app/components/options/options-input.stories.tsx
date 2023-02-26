import type { Meta, StoryObj } from '@storybook/react';

import { OptionsInput } from '~/components/options/options-input';

export default {
  title: 'Components/Options/OptionsInput',
  component: OptionsInput,
  tags: ['autodocs'],
} satisfies Meta<typeof OptionsInput>;

export const Default: StoryObj<typeof OptionsInput> = {
  args: {
    defaultValue: 0,
  },
};
