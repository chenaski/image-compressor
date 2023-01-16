import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';
import type { Meta, StoryObj } from '@storybook/react';

import { UploadScreen } from '~/components/upload-screen';

export default {
  title: 'Components/UploadScreen',
  component: UploadScreen,
  tags: ['autodocs'],
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

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Error occurs during images uploading',
  },
};
