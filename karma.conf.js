const babel = require("babel-core");

module.exports = function(config) {
  let browsers      = ["PhantomJS"];
  let frameworks    = ["requirejs", "jasmine"];

  let preprocessors = {
    "src/**/*.js": ["babel"],
    "src/**/*.jsx": ["babel"],
    "test/unit/**/*.js": ["babel"],
    "test/unit.js": ["babelexternal"]
  };

  let files = [
    "node_modules/babel-polyfill/dist/polyfill.js",
    {pattern: "./test/unit/**/*.spec.js", included: false},
    {pattern: "./src/**/*.js", included: false},
    {pattern: "./src/**/*.jsx", included: false},
    "./test/unit.js"
  ];

  function inject(content, file, done) {
    content = babel.buildExternalHelpers() + "\n" + content;
    done(null, content);
  }

  function external() {
    return inject;
  }

  let plugins = [
    "karma-jasmine",
    "karma-requirejs",
    "karma-babel-preprocessor",
    "karma-phantomjs-launcher",
    "karma-chrome-launcher",
    {"preprocessor:babelexternal": ["factory", external]},
  ];

  let options = {preprocessors, browsers, plugins, frameworks, files};

  options.babelPreprocessor = {
    options: {
      presets: ["es2015", "react"],
      plugins: ["transform-es2015-modules-amd"]
    }
  };

  config.set(options);
};
