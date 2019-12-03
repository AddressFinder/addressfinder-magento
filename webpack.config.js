const path = require("path");

const config = {
  entry: path.resolve(__dirname, './view/frontend/web/js/source', 'magento-plugin.js'),
  output: {
    path: path.resolve(__dirname, "./view/frontend/web/js"),
    filename: "magento-plugin.js",
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