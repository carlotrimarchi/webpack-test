const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  stats: 'none',
  devtool: 'inline-source-map',
  mode: 'development',
});
