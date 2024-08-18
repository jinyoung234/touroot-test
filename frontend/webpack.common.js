const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const isDevelopment = process.env.NODE_ENV !== "production";

dotenv.config({ path: isDevelopment ? ".env.development" : ".env.production" });

module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: "touroot.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@apis": path.resolve(__dirname, "src/apis/"),
      "@mocks": path.resolve(__dirname, "src/mocks/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@type": path.resolve(__dirname, "src/types/"),
      "@queries": path.resolve(__dirname, "src/queries/"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
