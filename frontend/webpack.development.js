const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { EsbuildPlugin } = require("esbuild-loader");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2020",
          tsconfigRaw: require("./tsconfig.json"),
        },
      },
      {
        test: [/\.ts?$/],
        loader: "esbuild-loader",
        options: {
          loader: "ts",
          target: "es2020",
          tsconfigRaw: require("./tsconfig.json"),
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: "es2020",
        css: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new SpeedMeasurePlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
});
