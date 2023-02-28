import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { OptionsSelectControl } from '~/components/options/options-select-control';
import { RenameOptions } from '~/constants';

export default {
  title: 'Components/Options/OptionsSelectControl',
  component: OptionsSelectControl,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionsSelectControl>;

const OptionsSelectControlWithState = () => {
  const items = [
    { title: 'Replace', value: RenameOptions.replace },
    { title: 'Prefix', value: RenameOptions.prefix },
    { title: 'Suffix', value: RenameOptions.suffix },
  ];
  const [value, setValue] = useState<string>(items[0].value);

  return (
    <OptionsSelectControl
      label={'Rename options'}
      items={items}
      value={value}
      onChange={setValue}
      placeholder={'-suffix'}
    />
  );
};

export const Default: StoryObj<typeof OptionsSelectControl> = {
  render: () => <OptionsSelectControlWithState />,
};
