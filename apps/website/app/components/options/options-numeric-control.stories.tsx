import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { OptionsNumericControl } from '~/components/options/options-numeric-control';

export default {
  title: 'Components/Options/OptionsNumericControl',
  component: OptionsNumericControl,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionsNumericControl>;

const OptionsNumericControlWithState = () => {
  const [value, setValue] = useState(50);

  return <OptionsNumericControl label={'Quality'} value={value} onChange={setValue} min={0} max={100} />;
};

export const Default: StoryObj<typeof OptionsNumericControl> = {
  render: () => <OptionsNumericControlWithState />,
};
