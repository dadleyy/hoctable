const path = require("path");

module.exports = {
  context: __dirname + "/src",
  entry: ["./hoctable.ts"],
  devtool: "source-map",
  output: {
    library: "hoctable",
    libraryTarget: "umd",
    filename: "./dist/umd/hoctable/hoctable-umd.js"
  },
  resolve: {
    modules: [
      path.resolve("./src"),
      'node_modules'
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    loaders: [{
      test: /\.ts|tsx|jsx|js/i,
      exclude: /node_modules/,
      loader: "ts-loader"
    }]
  }
};
