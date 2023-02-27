import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { OptionsSwitcher } from '~/components/options/options-switcher';

export default {
  title: 'Components/Options/OptionsSwitcher',
  component: OptionsSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof OptionsSwitcher>;

const OptionsSwitcherWithState = () => {
  const [value, setValue] = useState(false);
  return <OptionsSwitcher value={value} onChange={setValue} />;
};

export const Default: StoryObj<typeof OptionsSwitcher> = {
  render: () => <OptionsSwitcherWithState />,
};
