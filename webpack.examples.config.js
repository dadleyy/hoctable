"use strict";

const express = require("express");

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

function age() {
  let top = (Math.random() * 50) % 100;
  return Math.ceil(top + 20);
}

let app = express();

const PEOPLE = (function() { 
  let id = 0;
  return [
    {id: ++id, name: "Aaron", age: age()},
    {id: ++id, name: "Carly", age: age()},
    {id: ++id, name: "Danny", age: age()},
    {id: ++id, name: "Emily", age: age()},
    {id: ++id, name: "Freddy", age: age()},
    {id: ++id, name: "Tiffany", age: age()},
    {id: ++id, name: "Uman", age: age()},
    {id: ++id, name: "Grace", age: age()},
    {id: ++id, name: "Billy", age: age()},
    {id: ++id, name: "Kristin", age: age()},
    {id: ++id, name: "Hamlet", age: age()},
    {id: ++id, name: "Ivan", age: age()},
    {id: ++id, name: "David", age: age()},
    {id: ++id, name: "Juliet", age: age()},
    {id: ++id, name: "Lauren", age: age()},
    {id: ++id, name: "Oscar", age: age()},
    {id: ++id, name: "Michelle", age: age()},
    {id: ++id, name: "Nancy", age: age()},
    {id: ++id, name: "Stan", age: age()},
    {id: ++id, name: "Pippin", age: age()},
    {id: ++id, name: "Ralph", age: age()},
    {id: ++id, name: "Janice", age: age()},
    {id: ++id, name: "Xander", age: age()}
  ];

})();

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

  let filtered = name && name.length ? PEOPLE.filter(filter) : PEOPLE;

  let results = (prop ? filtered.sort(sort) : filtered).slice(0);

  max  = parseInt(max, 10) || 100;
  page = parseInt(page, 10) || 0;

  let start = max * page;
  let end   = start + max;
  results = results.slice(start, end);

  res.json({meta: {total: filtered.length}, results});
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
