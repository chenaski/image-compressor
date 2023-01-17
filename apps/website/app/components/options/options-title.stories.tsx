import type { Meta, StoryObj } from '@storybook/react';

import { OptionsTitle } from '~/components/options/options-title';

export default {
  title: 'Components/Options/OptionsTitle',
  component: OptionsTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof OptionsTitle>;

export const Default: StoryObj<typeof OptionsTitle> = {
  args: {
    children: 'Convert',
  },
};
