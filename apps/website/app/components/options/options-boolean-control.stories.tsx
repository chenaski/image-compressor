import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { OptionsBooleanControl } from '~/components/options/options-boolean-control';

export default {
  title: 'Components/Options/OptionsBooleanControl',
  component: OptionsBooleanControl,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionsBooleanControl>;

const OptionsBooleanControlWithState = () => {
  const [value, setValue] = useState(false);

  return <OptionsBooleanControl label={'Lossless'} value={value} onChange={setValue} />;
};

export const Default: StoryObj<typeof OptionsBooleanControl> = {
  render: () => <OptionsBooleanControlWithState />,
};
