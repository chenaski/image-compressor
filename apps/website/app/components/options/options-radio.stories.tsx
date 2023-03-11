import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { OptionsSwitcher } from '~/components/options/options-radio';
import { Codecs } from '~/constants';

export default {
  title: 'Components/Options/OptionsRadio',
  component: OptionsSwitcher,
} satisfies Meta<typeof OptionsSwitcher>;

const OptionsRadioWithState = () => {
  const [items, setItems] = useState([
    {
      id: Codecs.webp,
      title: 'WebP',
      value: Codecs.webp,
    },
    {
      id: Codecs.avif,
      title: 'AVIF',
      value: Codecs.avif,
    },
  ]);
  const [selectedItemId, setSelectedItemId] = useState<string>(items?.[0]?.id);
  const onRemove = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);

    if (selectedItemId === id && newItems.length) {
      setSelectedItemId(newItems[0].id);
    }

    setItems(newItems);
  };

  return (
    <OptionsSwitcher
      label={'Codecs'}
      items={items}
      selectedItemId={selectedItemId}
      onSelect={setSelectedItemId}
      onRemove={onRemove}
    />
  );
};

export const Default: StoryObj<typeof OptionsSwitcher> = {
  render: () => <OptionsRadioWithState />,
};
