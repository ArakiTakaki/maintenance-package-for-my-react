const resolves = require("./config/resolves");
const loaders = require("./config/loaders");
const plugins = require("./config/plugins");
const path = require("path");

const WebpackObfuscator = require("webpack-obfuscator");

module.exports = {
  mode: "production",
  entry: ["./src/js/entry.jsx",],
  module: {
    rules: loaders
  },
  resolve: resolves,
  plugins: [
    ...plugins,
    new WebpackObfuscator({ rotateUnicodeArray: true })
  ],
  output: {
    path: path.resolve(__dirname, './server/public'),
    filename: 'bundle.js',
    publicPath: '/',
  }
};
