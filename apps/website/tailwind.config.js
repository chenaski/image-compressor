const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Clash Display', ...defaultTheme.fontFamily.sans],
        body: ['DM Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        button:
          '0px -0.852657px 0px rgba(0, 0, 0, 0.05), 0px -3.41063px 13.6425px rgba(0, 0, 0, 0.02), 0px 13.6425px 13.6425px rgba(0, 0, 0, 0.02), 0px 6.82126px 6.82126px rgba(0, 0, 0, 0.06), 0px 3.41063px 3.41063px rgba(0, 0, 0, 0.06), 0px 1.70531px 1.70531px rgba(0, 0, 0, 0.06), 0px 0.852657px 0.852657px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
