module.exports = {
  entry: {app: "./example/app.js"},
  output: {
    path: __dirname + "/example",
    filename: "[name].bundle.js"
  },
  resolve: {
    alias: {
      hoctable: __dirname + "/dist/hoctable-umd.js"
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015", "react"],
        plugins: ["transform-runtime"]
      }
    }]
  },
  devServer: {
    contentBase: "./example"
  }
};
