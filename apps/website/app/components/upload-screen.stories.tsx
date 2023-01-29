import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';
import type { Meta, StoryObj } from '@storybook/react';

import { UploadScreen } from '~/components/upload-screen';

export default {
  title: 'Pages/UploadScreen',
  component: UploadScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          element: <Story />,
        },
      ]);

      return <RemixStub />;
    },
  ],
} satisfies Meta<typeof UploadScreen>;

type Story = StoryObj<typeof UploadScreen>;

export const Default: Story = {
  args: {
    onSelect: () => {},
  },
};
