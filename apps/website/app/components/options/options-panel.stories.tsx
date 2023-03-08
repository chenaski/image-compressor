import type { Meta, StoryObj } from '@storybook/react';

import { OptionsPanel } from '~/components/options/options-panel';

export default {
  title: 'Components/Options/OptionsPanel',
  component: OptionsPanel,
  tags: ['autodocs'],
} satisfies Meta<typeof OptionsPanel>;

export const Default: StoryObj<typeof OptionsPanel> = {};
