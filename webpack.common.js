const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const entries = {
  index: './resources/assets/js/index.js',
};

module.exports = {
  stats: 'errors-only',
  entry: entries,
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].[chunkhash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: { sourceMap: true },
          },
          {
            'loader': 'postcss-loader',
            'options': {
              'postcssOptions': {
                'config': path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: './images',
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: './fonts',
          },
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['>0.25%'],
                },
              }]],
          },
        },
      }],
  },
  devtool: 'source-map',
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  resolve: {
    alias: {
      breakpoint: path.resolve(__dirname, './resources/assets/js/breakpoint'),
      myLightbox: path.resolve(__dirname, './resources/assets/js/myLightbox'),
      // selectize$: path.join(__dirname, './resources/assets/js/selectize'),
      vue$: 'vue/dist/vue.esm.js',
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // new DashboardPlugin(),

    new CopyWebpackPlugin({
     patterns: [
       {
         from: './resources/assets/images/',
         to: './images/[path][name].[ext]',
       },
       ]
    }),
    // new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new webpack.optimize.SplitChunksPlugin({
      minSize: 100,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css',
      options: { sourceMap: true },
    }),
    new ManifestPlugin(),

    new webpack.ProvidePlugin({
      breakpoint: 'breakpoint',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      myLightbox: 'myLightbox',
      // common: 'common',
      noUiSlider: 'nouislider',
    }),
  ],
};
