import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { OptionsBooleanControl } from '~/components/options/controls/options-boolean-control';

export default {
  title: 'Components/Options/Controls/OptionsBooleanControl',
  component: OptionsBooleanControl,
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
