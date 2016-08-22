"use strict";

const helpers = {

  apply(compiler) {
    let source = require("babel-core").buildExternalHelpers();

    function inject(compilation, callback) {
      compilation.assets["babel-helpers.js"] = {
        source: function() { return source; },
        size: function() { return source.length; }
      };
      callback(false);
    }

    compiler.plugin("emit", inject);
  }

};

module.exports = {
  entry: ["./example/app.jsx"],
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
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015", "react"],
        plugins: ["transform-runtime"]
      }
    }]
  },
  plugins: [helpers],
  devServer: {
    contentBase: "./example"
  }
};
