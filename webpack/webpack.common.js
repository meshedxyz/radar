const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const rootPath = path.join(__dirname, "..");
const srcPath = path.join(rootPath, "src");

module.exports = {
  entry: {
    attach: path.join(srcPath, "contentscript", "attach.ts"),
    background: path.join(srcPath, "background", "index.ts"),
    content_script: path.join(srcPath, "contentscript", "index.ts"),
    popup: path.join(srcPath, "ui", "popup.tsx"),
    dropdown: path.join(srcPath, "ui", "dropdown.tsx"),
  },
  output: {
    path: path.join(rootPath, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.gif/,
        type: "asset/resource",
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      // Treat src/css/app.css as a global stylesheet
      {
        test: /\app.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      // Load .module.css files as CSS modules
      {
        test: /\.module.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  experiments: { topLevelAwait: true },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      process: "process/browser",
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/static" }],
      options: {},
    }),
  ],
  devServer: {
    static: {
      directory: path.join(rootPath, "dist"),
      serveIndex: false,
    },
    historyApiFallback: {
      index: "popup.html",
    },
    hot: true,
    compress: true,
    port: 3000,
  },
};
