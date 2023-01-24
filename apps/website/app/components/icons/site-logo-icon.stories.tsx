import type { Meta, StoryObj } from '@storybook/react';

import { SiteLogoIcon } from '~/components/icons/site-logo-icon';

export default {
  title: 'Components/Icons/SiteLogo',
  component: SiteLogoIcon,
} satisfies Meta<typeof SiteLogoIcon>;

export const Default: StoryObj<typeof SiteLogoIcon> = {};
