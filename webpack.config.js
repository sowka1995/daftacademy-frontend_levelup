const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const isProduction = true; //process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    dinks: "./src/dinks/dinksApp.js", 
    clock: "./src/clock/clockApp.js",
    fibonacci: "./src/fibonacci/fibonacciApp.js"
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: "[name]/[name].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "DINKS WEB PAGE",
      filename: "dinks/index.html",
      template: "./src/dinks/index.html",
      excludeAssets: [/(clock*|fibonacci*)/]
    }),
    new HtmlWebpackPlugin({
      title: "CLOCK WEB PAGE",
      filename: "clock/index.html",
      template: "./src/clock/index.html",
      excludeAssets: [/(dinks*|fibonacci*)/]
    }),
    new HtmlWebpackPlugin({
      title: "Fibonacci - homework 5",
      filename: "fibonacci/index.html",
      template: "./src/fibonacci/index.html",
      excludeAssets: [/(clock*|dinks*)/]
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/[name].css",
      chunkFilename: "[name].css"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/dinks/assets/images",
        to: "dinks/images"
      }
    ]),
    new HtmlWebpackExcludeAssetsPlugin()
  ],
  watch: true,
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /.s(a|c)ss$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : { loader: "style-loader", options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: isProduction } },
          { loader: "postcss-loader", options: { sourceMap: isProduction } },
          { loader: "sass-loader", options: { sourceMap: isProduction } }
        ]
      }
    ]
  }
};
