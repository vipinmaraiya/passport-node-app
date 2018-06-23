const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const VENDOR_LIBS = ["angular"];

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
    vendor: VENDOR_LIBS
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            }
          ]
        })
      },
      {
        test: /\.(woff2?|svg|ttf|woff|eot)$/,
        use: ["url-loader"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html")
    }),
    new ExtractTextWebpackPlugin("style.css"),
    new webpack.ProvidePlugin({
      jquery: "jquery",
      $: "jquery",
      jQuery: "jQuery"
    })
  ]
};
