const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const postCSSPlugins = [require('postcss-import'), require('postcss-mixins'), require('postcss-simple-vars'), require('postcss-nested'), require('autoprefixer')];

/* ---------------------------- COMMON FOR DEV/BUILD ----------------------- */

let cssConfig = {
  test: /\.css$/i,
  use: [
    'css-loader?url=false',
    {
      loader: 'postcss-loader',
      options: { postcssOptions: { plugins: postCSSPlugins } },
    },
  ],
};

let config = {
  entry: './app/assets/scripts/App.js',
  module: {
    rules: [cssConfig],
  },
};

/* ---------------------------- DEV TASK ---------------------------------- */
if (currentTask == 'dev') {
  config.mode = 'development';

  // [cssConfig.use] is an array so we can say dot unshift to add an item to the beginning of the array.
  cssConfig.use.unshift('style-loader');

  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app'),
  };

  // WEBPACK SERVER
  config.devServer = {
    before: function (app, server) {
      server._watch('./app/**/*.html');
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3001,
    host: '0.0.0.0',
  };
}

/* ---------------------------- BUILD TASK ---------------------------------- */
if (currentTask == 'build') {
  config.mode = 'production';

  // [cssConfig.use] is an array so we can say dot unshift to add an item to the beginning of the array.
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);

  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs'),
  };

  config.optimization = {
    splitChunks: { chunks: 'all', minSize: 1000 },
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  };
  config.plugins = [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' })];
}

module.exports = config;
