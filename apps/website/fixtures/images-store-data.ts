import { getImageId } from '~/stores/images';

import image1Processed from './images/processed/100x133🤯.webp';
import image2Processed from './images/processed/cat.webp';
import image3Processed from './images/processed/cyrus-chew-Dl39g6QhOIM-unsplash.webp';
import image4Processed from './images/processed/dog.webp';
import image5Processed from './images/processed/hang-niu-Tn8DLxwuDMA-unsplash.webp';
import image6Processed from './images/processed/karina-vorozheeva-rW-I87aPY5Y-unsplash.webp';
import image1Source from './images/source/100x133🤯.jpeg';
import image2Source from './images/source/cat.avif';
import image3Source from './images/source/cyrus-chew-Dl39g6QhOIM-unsplash.jpg';
import image4Source from './images/source/dog.avif';
import image5Source from './images/source/hang-niu-Tn8DLxwuDMA-unsplash.jpg';
import image6Source from './images/source/karina-vorozheeva-rW-I87aPY5Y-unsplash.jpg';

const fixtures = {
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

export const images = Object.entries(fixtures).reduce(
  (acc, [fileName, { source, processed }]) => ({
    ...acc,
    [getImageId(fileName)]: { source: { url: source, fileName }, processed },
  }),
  {}
);
