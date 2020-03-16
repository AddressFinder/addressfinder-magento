const path = require("path");

const config = {
  entry: {
    'adminhtml/web/js': path.resolve(__dirname, './view/base/web/js/source/magento-plugin.js'),
    'frontend/web/js': path.resolve(__dirname, './view/base/web/js/source/magento-plugin.js'),
  },
  output: {
    path: path.resolve(__dirname, 'view'),
    filename: "[name]/magento-plugin.js",
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = config;