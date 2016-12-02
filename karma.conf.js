const babel = require("babel-core");

module.exports = function(config) {
  let browsers      = ["PhantomJS"];
  let frameworks    = ["requirejs", "jasmine"];

  let preprocessors = {
    "example/browser/**/*.js"  : ["babel"],
    "example/browser/**/*.jsx" : ["babel"],

    "src/**/*.ts"              : ["typescript"],
    "src/**/*.tsx"             : ["typescript"],

    "src/**/*.js"              : ["babel"],
    "src/**/*.jsx"             : ["babel"],

    "test/unit/**/*.js"        : ["babel"],
    "test/unit.js"             : ["babelexternal"]
  };

  let files = [
    "node_modules/babel-polyfill/dist/polyfill.js",
    {pattern: "./test/unit/**/*.spec.js", included: false},

    {pattern: "./src/**/*.ts", included: false},
    {pattern: "./src/**/*.tsx", included: false},

    {pattern: "./src/**/*.js", included: false},
    {pattern: "./src/**/*.jsx", included: false},

    {pattern: "./example/**/*.js", included: false},
    {pattern: "./example/**/*.jsx", included: false},

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
    "karma-typescript-preprocessor",
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

  options.typescriptPreprocessor = {
    options: {
      sourceMap         : false,
      target            : "ES5",
      module            : "amd",
      noImplicitAny     : false,
      noResolve         : true,
      removeComments    : true,
      concatenateOutput : false
    },
    transformPath: function(path) {
      return path.replace(/\.ts$/, ".js");
    }
  };

  config.set(options);
};
