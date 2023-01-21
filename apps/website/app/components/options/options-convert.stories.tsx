import type { Meta, StoryObj } from '@storybook/react';

import { OptionsConvert } from '~/components/options/options-convert';

export default {
  title: 'Components/Options/OptionsConvert',
  component: OptionsConvert,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionsConvert>;

export const Default: StoryObj<typeof OptionsConvert> = {};
