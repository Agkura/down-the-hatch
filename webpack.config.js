var path = require('path');

module.exports = {
  entry: './lib/down_the_hatch.js',
  output: {
    filename: './lib/bundle/bundle.js',
  },
  devtool: 'source-map',
};
