import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['**/*.tsx'],
  theme: {
    colors: {
      primary: '#333',
      secondary: '#666',
      tertiary: '#999',
      inverted: '#fff',

      bgBase: '#fff',
      bgPrimary: '#f3f3f3',
      bgSecondary: '#eee',
      bgTertiary: '#ddd',

      iconPrimary: '#222',
      iconSecondary: '#22222280',
      iconInverted: '#fff',

      strokeFieldDefault: '#dddddd',
      strokeFieldActive: '#0084ff80',
      strokeSecondary: '#e7eaee',

      white: '#fff',
      black: '#000',
      accent: '#0084ff',

      accentHover: '#007aec',
      accentActive: '#0071db',
      secondaryHover: '#eee',
      secondaryActive: '#ddd',
    },
    boxShadow: {
      blockPrimary: '0px 3px 3px rgba(0, 0, 0, 0.06), 0px 2px 2px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.06)',
      blockLarge: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1)',

      buttonPrimary: '0px 4px 8px rgba(0, 132, 255, 0.3)',
      buttonPrimaryHover: '0px 4px 8px rgba(0, 122, 236, 0.3)',
      buttonPrimaryActive: '0px 4px 8px rgba(0, 113, 219, 0.3)',
      buttonSecondary:
        '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 3px 3px rgba(0, 0, 0, 0.06), 0px 2px 2px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.06)',

      slider: '0px 0px 1px rgba(0, 0, 0, 0.3), 0px 0.5px 1px rgba(0, 0, 0, 0.2)',
      toggle: '0px 1px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.1)',
      tab: '0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.15)',
      solid:
        '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px -0.852657px 0px rgba(0, 0, 0, 0.05), 0px -3.41063px 13.6425px rgba(0, 0, 0, 0.02), 0px 13.6425px 13.6425px rgba(0, 0, 0, 0.02), 0px 6.82126px 6.82126px rgba(0, 0, 0, 0.06), 0px 3.41063px 3.41063px rgba(0, 0, 0, 0.06), 0px 1.70531px 1.70531px rgba(0, 0, 0, 0.06), 0px 0.852657px 0.852657px rgba(0, 0, 0, 0.06)',
    },
    extend: {
      fontFamily: {
        display: ['Clash Display', ...defaultTheme.fontFamily.sans],
        body: ['Inter', ...defaultTheme.fontFamily.sans],
        dm: ['DM Sans', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        button:
          '0px -0.852657px 0px rgba(0, 0, 0, 0.05), 0px -3.41063px 13.6425px rgba(0, 0, 0, 0.02), 0px 13.6425px 13.6425px rgba(0, 0, 0, 0.02), 0px 6.82126px 6.82126px rgba(0, 0, 0, 0.06), 0px 3.41063px 3.41063px rgba(0, 0, 0, 0.06), 0px 1.70531px 1.70531px rgba(0, 0, 0, 0.06), 0px 0.852657px 0.852657px rgba(0, 0, 0, 0.06)',
        panel: ' 0px 3px 3px rgba(0, 0, 0, 0.06), 0px 2px 2px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
