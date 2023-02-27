import type { Meta, StoryObj } from '@storybook/react';

import { OptionsControlTitle } from '~/components/options/options-control-title';

export default {
  title: 'Components/Options/OptionsTitle',
  component: OptionsControlTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof OptionsControlTitle>;

export const Default: StoryObj<typeof OptionsControlTitle> = {
  args: {
    children: 'Convert',
  },
};
