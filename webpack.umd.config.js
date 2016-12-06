const path = require("path");

module.exports = {
  context: __dirname + "/src",
  entry: ["./hoctable.ts"],
  devtool: "source-map",
  output: {
    library: "hoctable",
    libraryTarget: "umd",
    filename: "./dist/es5/hoctable-umd.js"
  },
  resolve: {
    root: [
      path.resolve("./src")
    ],
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    loaders: [{
      test: /\.ts|tsx|jsx|js/i,
      exclude: /node_modules/,
      loader: "ts-loader"
    }]
  }
};
