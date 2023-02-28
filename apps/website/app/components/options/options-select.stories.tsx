import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { OptionsSelectProps } from '~/components/options/options-select';
import { OptionsSelect } from '~/components/options/options-select';
import { RenameOptions } from '~/constants';

export default {
  title: 'Components/Options/OptionsSelect',
  component: OptionsSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OptionsSelect>;

const optionsSelectProps = {
  items: [
    { title: 'Replace', value: RenameOptions.replace },
    { title: 'Prefix', value: RenameOptions.prefix },
    { title: 'Suffix', value: RenameOptions.suffix },
  ],
  placeholder: '-suffix',
} satisfies Partial<OptionsSelectProps>;
const OptionsSelectWithState = () => {
  const [value, setValue] = useState<RenameOptions | undefined>(undefined);
  const onChange = (value: string) => setValue(value as RenameOptions);
  return <OptionsSelect {...optionsSelectProps} onChange={onChange} value={value} />;
};

export const Default: StoryObj<typeof OptionsSelect> = {
  render: () => <OptionsSelectWithState />,
};
