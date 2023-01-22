import type { Meta, StoryObj } from '@storybook/react';

import { ImagesContainerWithRef } from '~/components/image-comparison-slider/images-container';

import rightImageSrc from '../../../fixtures/images/processed/cat.webp';
import leftImageSrc from '../../../fixtures/images/source/cat.avif';

export default {
  title: 'Components/ImagesContainer',
  component: ImagesContainerWithRef,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImagesContainerWithRef>;

export const Default: StoryObj<typeof ImagesContainerWithRef> = {
  args: {
    leftImageSrc,
    rightImageSrc,
    intersection: 0.5,
    transform: 'translate(50px, 50px)',
  },
};
