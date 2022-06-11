const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

// POST-CSS
const postCSSPlugins = [require('postcss-import'), require('postcss-mixins'), require('postcss-simple-vars'), require('postcss-nested'), require('autoprefixer')];

// OUR OWN PLUGIN (you can perform some task after compile)
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function () {
      fse.copySync('./app/assets/images', './docs/assets/images ');
    });
  }
}

/* ---------------------------- COMMON FOR DEV/BUILD ----------------------- */

// RULES FOR CSS
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

let pages = fse
  .readdirSync('./app')
  .filter(function (file) {
    return file.endsWith('.html');
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({ filename: page, template: `./app/${page}` });
  });

// MAIN WEBPACK CONFIG (export)
let config = {
  entry: './app/assets/scripts/App.js',
  plugins: pages,
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

  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  });
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
  // Calling plugins
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }),
    //  create our own Plugin for Webpack
    new RunAfterCompile()
  );
}

module.exports = config;
