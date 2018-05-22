const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';


module.exports = {
    devtool: 'source-map',
    entry: {
        style: './resources/assets/scss/main.scss',
        common: './resources/assets/js/script.js',
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[id].chunk.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                styles: {
                    name: 'styles',
                    test: /\.s?css$/,
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    //minChunks: 2,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    'css-loader', // translates CSS into CommonJS
                    {
                        loader: 'postcss-loader',
                        options: {config: {path: 'postcss.config.js'}},
                    }, // compiles Sass to CSS
                    'sass-loader', // compiles Sass to CSS
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            ['es2015', {modules: false}],
                        ],
                    },
                }],

            }],
    },
    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            minSize: 100,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
            //chunkFilename: '[id].css',
        }),
        new webpack.ProvidePlugin({
            noUiSlider: 'nouislider',
        }),
    ],
};

