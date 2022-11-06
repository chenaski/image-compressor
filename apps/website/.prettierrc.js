// TODO: move the basic configuration to a separate package
const basicConfig = require('../../.prettierrc.json');

module.exports = {
  ...basicConfig,
  plugins: ['prettier-plugin-tailwindcss'], // doesn't work without explicit configuration
};
