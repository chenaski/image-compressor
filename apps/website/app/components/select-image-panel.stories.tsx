import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SelectImagePanel } from '~/components/select-image-panel';

import { images } from '../../fixtures/images-store-data';

const SelectImagePanelWithState = () => {
  const [selectedImageId, setSelectedImageId] = useState(Object.keys(images)[0]);

  return <SelectImagePanel images={images} selectedImageId={selectedImageId} setSelectedImageId={setSelectedImageId} />;
};

export default {
  title: 'Components/SelectImagePanel',
  component: SelectImagePanel,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectImagePanel>;

export const Default: StoryObj<typeof SelectImagePanel> = {
  render: () => <SelectImagePanelWithState />,
};
