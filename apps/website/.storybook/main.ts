import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.@(mdx|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
  ],
  framework: {
    name: '@storybook/react-vite',
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
