module.exports = {
  context: __dirname + "/src",
  entry: ["./Table.jsx"],
  output: {
    library: "hoctable",
    libraryTarget: "umd",
    filename: "./dist/hoctable-umd.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015", "react"],
        plugins: ["transform-runtime"]
      }
    }]
  }
};
