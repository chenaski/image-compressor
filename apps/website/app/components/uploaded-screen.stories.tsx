import type { Meta, StoryObj } from '@storybook/react';

import { UploadedScreen } from '~/components/uploaded-screen';
import { useImages } from '~/stores/images';

import { images } from '../../fixtures/images-store-data';

export default {
  title: 'Pages/UploadedScreen',
  component: UploadedScreen,
  args: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UploadedScreen>;

useImages.setState({
  images,
});

export const Default: StoryObj<typeof UploadedScreen> = {};
