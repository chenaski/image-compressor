import '../app/styles/tailwind-storybook.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div className={'font-body text-[#333] antialiased'}>
      <Story />
    </div>
  ),
];
