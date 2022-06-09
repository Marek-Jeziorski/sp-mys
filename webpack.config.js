const currentTask = process.env.npm_lifecycle_event;
const path = require('path');

const postCSSPlugins = [require('postcss-import'), require('postcss-mixins'), require('postcss-simple-vars'), require('postcss-nested'), require('autoprefixer')];

/* ---------------------------- COMMON FOR DEV/BUILD ----------------------- */
let config = {
  entry: './app/assets/scripts/App.js',

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?url=false', { loader: 'postcss-loader', options: { postcssOptions: { plugins: postCSSPlugins } } }],
      },
    ],
  },
};

/* ---------------------------- DEV TASK ---------------------------------- */
if (currentTask == 'dev') {
  config.mode = 'development';

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
    port: 3000,
    host: '0.0.0.0',
  };
}

/* ---------------------------- BUILD TASK ---------------------------------- */
if (currentTask == 'build') {
  config.mode = 'production';

  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs'),
  };

  config.optimization = {
    splitChunks: { chunks: 'all' },
  };
}

module.exports = config;
