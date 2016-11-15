"use strict";

const express = require("express");

const people     = require("./test/data/people");
const products   = require("./test/data/products");
const properties = require("./test/data/properties");

function toi(i) { return parseInt(i, 10); }
function lower(s) { return s && s.toLowerCase(); };

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
  let {orderby, max, page, name, filters} = req.query;

  function applyFilters(product) {
    let {property_values} = product;

    for(let i = 0, c = filters.length; i < c; i++) {
      let {property, operator, value} = filters[i];
      let [match] = property_values.filter(function({property_id}) { return toi(property_id) === toi(property); });

      if((operator !== "has_value" && operator !== "has_no_value") && !match)
        return false;

      if(operator === "has_no_value" && match && match.value)
        return false;

      if(operator === "has_value" && (!match || !match.value))
        return false;

      if(operator === "contains" && lower(match.value).indexOf(lower(value)) === -1)
        return false;

      if(operator === "equals" && value !== match.value)
        return false;

      if(operator === "is_any" && value.indexOf(match.value) === -1)
        return false;

      if(operator === "greater_than" && toi(value) >= toi(match.value))
        return false;

      if(operator === "less_than" && toi(value) <= toi(match.value))
        return false;

      if(operator === "is_any" && value.indexOf(match.value) === -1)
        return false;
    }

    return true;
  }

  // apply the filters to the result list
  results = filters && filters.length ? results.filter(applyFilters) : results;

  // to.do sort the results...

  // slice/paginate the results
  let start = toi(max) * toi(page);
  results   = results.slice(start, start + toi(max));

  let {length: total} = results;
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
