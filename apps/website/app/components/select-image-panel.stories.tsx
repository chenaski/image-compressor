import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SelectImagePanel } from '~/components/select-image-panel';
import { getImageId } from '~/stores/images';

import image1Processed from '../../fixtures/images/processed/100x133🤯.webp';
import image2Processed from '../../fixtures/images/processed/cat.webp';
import image3Processed from '../../fixtures/images/processed/cyrus-chew-Dl39g6QhOIM-unsplash.webp';
import image4Processed from '../../fixtures/images/processed/dog.webp';
import image5Processed from '../../fixtures/images/processed/hang-niu-Tn8DLxwuDMA-unsplash.webp';
import image6Processed from '../../fixtures/images/processed/karina-vorozheeva-rW-I87aPY5Y-unsplash.webp';
import image1Source from '../../fixtures/images/source/100x133🤯.jpeg';
import image2Source from '../../fixtures/images/source/cat.avif';
import image3Source from '../../fixtures/images/source/cyrus-chew-Dl39g6QhOIM-unsplash.jpg';
import image4Source from '../../fixtures/images/source/dog.avif';
import image5Source from '../../fixtures/images/source/hang-niu-Tn8DLxwuDMA-unsplash.jpg';
import image6Source from '../../fixtures/images/source/karina-vorozheeva-rW-I87aPY5Y-unsplash.jpg';

const images = {
  '100x133🤯.jpeg': {
    source: image1Source,
    processed: image1Processed,
  },
  'cat.avif': {
    source: image2Source,
    processed: image2Processed,
  },
  'cyrus-chew-Dl39g6QhOIM-unsplash.jpg': {
    source: image3Source,
    processed: image3Processed,
  },
  'dog.avif': {
    source: image4Source,
    processed: image4Processed,
  },
  'hang-niu-Tn8DLxwuDMA-unsplash.jpg': {
    source: image5Source,
    processed: image5Processed,
  },
  'karina-vorozheeva-rW-I87aPY5Y-unsplash.jpg': {
    source: image6Source,
    processed: image6Processed,
  },
};
const imagesFromStore = Object.entries(images).reduce(
  (acc, [fileName, { source, processed }]) => ({
    ...acc,
    [getImageId(fileName)]: { source: { url: source, fileName }, processed },
  }),
  {}
);

const SelectImagePanelWithState = () => {
  const [selectedImageId, setSelectedImageId] = useState(Object.keys(imagesFromStore)[0]);

  return (
    <SelectImagePanel
      images={imagesFromStore}
      selectedImageId={selectedImageId}
      setSelectedImageId={setSelectedImageId}
    />
  );
};

export default {
  title: 'Components/SelectImagePanel',
  component: SelectImagePanel,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectImagePanel>;

export const Default: StoryObj<typeof SelectImagePanel> = {
  render: () => <SelectImagePanelWithState />,
};
