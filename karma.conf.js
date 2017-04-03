const babel = require("babel-core");
const path  = require("path");

module.exports = function(config) {
  let browsers   = ["PhantomJS"];
  let frameworks = ["requirejs", "jasmine", "jasmine-ajax", "karma-typescript"];
  let reporters  = ["narrow", "karma-typescript"];

  let preprocessors = {
    "example/fullstack/browser/**/*.js"  : ["babel"],
    "example/fullstack/browser/**/*.jsx" : ["babel"],

    "src/**/*.ts"              : ["tslint", "karma-typescript"],
    "src/**/*.tsx"             : ["tslint", "karma-typescript"],

    "test/unit/**/*.js"        : ["babel"],
    "test/unit/**/*.jsx"       : ["babel"],
    "test/helpers.js"          : ["babel"],
    "test/unit.js"             : ["babelexternal"]
  };

  let files = [
    "./node_modules/babel-polyfill/dist/polyfill.js",
    {pattern: "./node_modules/react/dist/react.js", included: false},
    {pattern: "./node_modules/react-dom/dist/react-dom.js", included: false},

    {pattern: "./test/unit/**/*.spec.js", included: false},
    {pattern: "./test/unit/**/*.spec.jsx", included: false},

    {pattern: "./src/**/*.ts", included: false},
    {pattern: "./src/**/*.tsx", included: false},

    {pattern: "./example/fullstack/browser/js/**/*.js", included: false},
    {pattern: "./example/fullstack/browser/js/**/*.jsx", included: false},

    {pattern: "./test/helpers.js", included: false},

    "./test/unit.js"
  ];

  function inject(content, file, done) {
    content = babel.buildExternalHelpers() + "\n" + content;
    done(null, content);
  }

  function external() {
    return inject;
  }

  function jasmineAjax() {
    let pattern = path.resolve(require.resolve("jasmine-ajax"));
    files.unshift({pattern, included: true, served: true, watched: false});
  }

  jasmineAjax.$inject = ["config.files"]

  let plugins = [
    "karma-tslint",
    "karma-jasmine",
    "karma-requirejs",
    "karma-typescript",
    "karma-babel-preprocessor",
    "karma-phantomjs-launcher",
    "karma-chrome-launcher",
    "karma-narrow-reporter",
    {"preprocessor:babelexternal": ["factory", external]},
    {"framework:jasmine-ajax": ["factory", jasmineAjax]}
  ];

  let options = { preprocessors, browsers, plugins, frameworks, files, reporters };

  options.babelPreprocessor = {
    options: {
      presets: ["es2015", "react"],
      plugins: ["transform-es2015-modules-amd"]
    },
    filename: function (file) {
      return file.originalPath.replace(/\.jsx$/, ".js");
    }
  };

  options.tslintPreprocessor = {
    configuration: "./tslint.json",
    formatter: "prose",
    stopOnFailure: true
  };

  options.karmaTypescriptConfig = {
    reports: {
      "lcovonly": {
        "directory": "./coverage",
        "filename": "coverage.lcov"
      }
    },
    compilerOptions: {
      sourceMap         : true,
      target            : "ES5",
      module            : "amd",
      noImplicitAny     : false,
      noResolve         : true,
      removeComments    : true,
      concatenateOutput : false,
      jsx               : "React"
    },
    transformPath: function(path) {
      return path.replace(/\.(ts|tsx)$/, ".js");
    }
  };

  options.narrowReporter = {
    showSuccess: true,
    stopOnFirstFail: true
  };

  config.set(options);
};
