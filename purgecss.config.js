const utils = require('./src/js/CLASSES');

module.exports = {
  content: [
    './src/index.html',
    './src/js/main.js',
    './src/js/templates.js',
  ],
  css: ['./src/css/*.css'],
  output: './dist/css/styles.css',
  safelist: Object.values(utils.CLASSES),
};
