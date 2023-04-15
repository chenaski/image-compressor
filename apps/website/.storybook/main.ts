import { resolve } from 'path';
import { mergeConfig } from 'vite';
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.@(mdx|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-vite',
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '~': resolve(__dirname, '../app'),
        },
      },
    });
  },
};

export default config;
