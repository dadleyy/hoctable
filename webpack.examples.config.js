"use strict";

const express = require("express");

const people     = require("./test/data/people");
const products   = require("./test/data/products");
const properties = require("./test/data/properties");

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

let app = express();

app.get("/people", function(req, res) {
  let {orderby, max, page, name} = req.query;
  let prop = orderby && orderby.charAt(0) === '-' ? orderby.substr(1) : orderby;

  function sort(a, b) {
    let mod = a[prop] < b[prop] ? 1 : (a[prop] === b[prop] ? 0 : -1);
    return orderby.charAt(0) === '-' ? -mod : mod;
  }

  function filter({name: person}) {
    return person.toLowerCase().indexOf(name) >= 0;
  }

  let filtered = name && name.length ? people.filter(filter) : people;

  let results = (prop ? filtered.sort(sort) : filtered).slice(0);

  max  = parseInt(max, 10) || 100;
  page = parseInt(page, 10) || 0;

  let start = max * page;
  let end   = start + max;
  results = results.slice(start, end);

  res.json({meta: {total: filtered.length}, results});
});

app.get("/properties", function(req, res) {
  return res.json({meta: {}, results: properties});
});

app.get("/products", function(req, res) {
  let results = products.slice(0);
  let {length: total} = results;
  let {orderby, max, page, name, filter} = req.query;

  if(filter)
    console.log(filter);

  return res.json({meta: {total}, results});
});

app.listen("4000");

module.exports = {
  entry: ["./example/js/app"],
  output: {
    path: __dirname + "/example/js",
    publicPath: "/js/",
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      hoctable: __dirname + "/dist/hoctable-umd"
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
    contentBase: "./example",
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:4000",
        pathRewrite: {"^/api": ""}
      }
    }
  }
};
