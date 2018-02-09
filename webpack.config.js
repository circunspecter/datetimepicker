const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const WebpackShellPlugin = require('./WebpackShellPlugin.js');

let libraryName = 'Datetimepicker';
let outputFile = libraryName.toLowerCase();
let entry = path.join(__dirname, '/src/Datetimepicker.js');
let envProduction = (process.env.NODE_ENV === 'production');
let version = require('./package.json').version;

// Exports
module.exports = {
  entry: {
    [outputFile]: entry,
    [outputFile + '.min']: entry
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@circunspecter')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin({
      banner: `datetimepicker ${version} | github.com/circunspecter/datetimepicker`,
      entryOnly: true
    }),
    new WebpackShellPlugin({
      onAfterEmit: ['gulp cp:docs:lib']
    })
  ]
};
