import path from "path";
import { Configuration, container } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
const deps = require('./package.json').dependencies

const ModuleFederationPlugin = container.ModuleFederationPlugin

const config: Configuration = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "https://MuhammadChandra19.github.io/animeql-container/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "build/index.html",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'animeql_container',
      filename: "remoteEntry.js",
      remotes: {
        'AnimeListRemote': "AnimeListRemote@https://MuhammadChandra19.github.io/animeql-list/remoteEntry.js",
      },
      shared: {
        react: { 
          requiredVersion: deps.react,
          singleton: true,
          eager: true
        },
        'react-dom': {
          requiredVersion: deps['react-dom'],
          singleton: true,
          eager: true
        },
        '@emotion/react': {
          requiredVersion: deps['@emotion/react'],
          singleton: true,
          eager: true
        },
      },
    })
    // new BundleAnalyzerPlugin()
  ],
};

export default config