"use strict";

const express = require("express");
const dotenv  = require("dotenv");

const people     = require("../server/routes/people");
const properties = require("../server/routes/properties");
const products   = require("../server/routes/products");
const issues     = require("../server/routes/issues");

const babel_external = {

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

dotenv.load();

let app = express();

app.get("/people", people);
app.get("/properties", properties);
app.get("/products", products);
app.get("/issues", issues.index);
app.get("/issues/comments", issues.comments);

app.listen("4000");

module.exports = {
  entry: [__dirname + "/js/app"],
  devtool: "source-map",
  output: {
    path: __dirname + "/js",
    publicPath: "/js/",
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      hoctable: __dirname + "/../../dist/umd/hoctable/hoctable-umd.js"
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
  plugins: [babel_external],
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:4000",
        pathRewrite: {"^/api": ""}
      }
    }
  }
};
