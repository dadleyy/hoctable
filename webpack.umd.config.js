module.exports = {
  entry: ["./src/Table.jsx"],
  output: {
    library: "hoctable",
    libraryTarget: "umd",
    filename: "./dist/hoctable-umd.js"
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
