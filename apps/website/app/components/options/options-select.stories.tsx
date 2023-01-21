import type { Meta, StoryObj } from '@storybook/react';

import { OptionsSelect } from '~/components/options/options-select';
import { Codecs } from '~/constants';

export default {
  title: 'Components/Options/OptionsSelect',
  component: OptionsSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionsSelect>;

export const Default: StoryObj<typeof OptionsSelect> = {
  args: {
    label: 'Codec',
    items: [
      { title: 'WebP', value: Codecs.webp },
      { title: 'AVIF', value: Codecs.avif },
    ],
  },
};
