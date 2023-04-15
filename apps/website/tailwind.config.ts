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
