const webpack = require("webpack");
const resolves = require("./config/resolves");
const loaders = require("./config/loaders");
const plugins = require("./config/plugins");

const path = require("path");
module.exports = {
  mode: "development",
  entry: ["./src/js/entry.jsx",],
  module: {
    rules: loaders
  },
  devtool: "inline-source-map",
  resolve: resolves,
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: "/dist/js",
    port: 3030,
    // 他デバイスで見たい時用
    // host: "0.0.0.0",
    hot: true,
    overlay: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
  }
};
