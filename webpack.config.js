const webpack = require("webpack");
const pathLib = require("path");

const config = {
  entry: [
    "./src/magento_plugin.js"
  ],
  devtool: "source-map",
  output: {
    path: pathLib.resolve(__dirname, "./view/frontend/web/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  }
};

switch (process.env.NODE_ENV) {
  case "production":
    config.output.filename = "addressfinder-magento-min.js";
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
    break;
  default:
    config.output.filename = "addressfinder-magento.js";
    config.plugins = [];
}

module.exports = config;
