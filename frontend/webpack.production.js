const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require("dotenv");
const isDevelopment = process.env.NODE_ENV !== "production";

const env = dotenv.config({ path: isDevelopment ? ".env.development" : ".env.production" }).parsed;

module.exports = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    sentryWebpackPlugin({
      org: env.SENTRY_ORG,
      project: env.SENTRY_ORG,
      authToken: env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        filesToDeleteAfterUpload: "**/*.js.map",
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
});
