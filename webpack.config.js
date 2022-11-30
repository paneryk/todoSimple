const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'src/main': './src/index.js',
    './dashboard/src/main': './src/dashboard/index.js'
},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
  },
  devtool: 'inline-source-map',
  experiments: {
    topLevelAwait: true,
  }
};