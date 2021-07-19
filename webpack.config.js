const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = path.resolve.bind(__dirname)
const isDevelopment = process.env.NODE_ENV !== 'production'

const PATH = {
  root: resolve('./'),
  components: resolve('./src/components'),
  dist: resolve('./dist'),
  lib: resolve('./src/lib'),
  nodeModules: resolve('./node_modules'),
  public: resolve('./public'),
  src: resolve('./src'),
  utilities: resolve('./src/lib/utilities'),
}

const tsConfig = {
  test: /\.tsx?$/,
  include: PATH.src,
  exclude: PATH.nodeModules,
  use: [
    isDevelopment && {
      loader: require.resolve('babel-loader'),
      options: {
        plugins: [isDevelopment && require.resolve('react-refresh/babel')],
      },
    },
    {
      loader: require.resolve('ts-loader'),
      options: {
        getCustomTransformers: () => ({
          before: isDevelopment ? [ReactRefreshTypeScript()] : [],
        }),
        transpileOnly: true,
      },
    },
  ].filter(Boolean),
}

const htmlConfig = {
  test: /\.html$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        minimize: true,
      },
    },
  ],
}

const cssConfig = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
}

const minifyConfig = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
}

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/index.tsx'],
  output: {
    path: PATH.dist,
    filename: isDevelopment ? '[name].js' : '[name].[chunkhash].bundle.js',
    sourceMapFilename: isDevelopment ? '[name].bundle.map' : '[name].[chunkhash].bundle.map',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [tsConfig, htmlConfig, cssConfig],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      filename: './index.html',
      template: './public/index.html',
      inject: true,
      ...(isDevelopment ? {} : { minify: minifyConfig }),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/',
          to: 'public/',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment &&
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.{ts,tsx,js,jsx}',
        },
      }),
  ].filter(Boolean),
  cache: true,
  bail: false,
  devtool: isDevelopment ? 'eval-source-map' : false,
  devServer: {
    compress: true,
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 1559,
  },
  target: 'web',
  stats: 'errors-only',
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': PATH.root,
      '@components': PATH.components,
      '@lib': PATH.lib,
      '@public': PATH.public,
      '@src': PATH.src,
      '@utilities': PATH.utilities,
    },
    modules: ['src', 'node_modules'],
  },
}
