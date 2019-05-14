const webpack = require("webpack");
const pathLib = require("path");

const config = {
  entry: [
    "./src/magento_plugin.js"
  ],
  output: {
    path: pathLib.resolve(__dirname, "./view/frontend/layout/web/js"),
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
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

switch (process.env.NODE_ENV) {
  case "production":
    config.output.filename = "magento-plugin-min.js";
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
    break;
  default:
    config.output.filename = "magento-plugin.js";
    config.plugins = [];
}

module.exports = config;
