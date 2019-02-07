const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = [
  new HtmlWebpackPlugin({
    inject: true,
    hash: true,
    template: path.resolve(__dirname, "../src/pug/index.pug")
  })
];
