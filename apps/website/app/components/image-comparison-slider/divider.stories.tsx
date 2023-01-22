import type { Meta, StoryObj } from '@storybook/react';

import { DividerWithRef } from '~/components/image-comparison-slider/divider';
import { useDraggable } from '~/hooks/use-draggable';

export default {
  title: 'Components/Divider',
  component: DividerWithRef,
} satisfies Meta<typeof DividerWithRef>;

const DividerWithHooks = () => {
  const { setTarget } = useDraggable<HTMLButtonElement>({
    controlStyle: true,
    axis: 'x',
  });

  return <DividerWithRef ref={setTarget} />;
};

export const Default: StoryObj<typeof DividerWithRef> = {
  render: DividerWithHooks,
};
