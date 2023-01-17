import type { Meta, StoryObj } from '@storybook/react';

import { OptionsRange } from '~/components/options/options-range';

export default {
  title: 'Components/Options/OptionsRange',
  component: OptionsRange,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionsRange>;

export const Default: StoryObj<typeof OptionsRange> = {
  args: {
    label: 'Quality',
  },
};
