const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const configPath = require("./path");

/**
 * 开发模式的 webpack 配置
 * 使用的技术有:
 * 1. typescript
 * 2. css-modules
 * 3. webpack.devServer
 * 4. source-map, 需要在 tsconfig 中同时启用
 * 5. 忽略 electron 库, 使用运行时的 require 获取
 *
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "development",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  output: {
    filename: "index.js",
    path: configPath.dist,
    libraryTarget: "umd"
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    alias: {
      src: configPath.src
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[path]-[name]-[local]--[hash:base64:5]",
                context: configPath.src
              }
            }
          }
        ]
      },
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  devServer: {
    contentBase: "./dist",
    port: 8111
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    })
  ],
  target: "electron-renderer"
};
