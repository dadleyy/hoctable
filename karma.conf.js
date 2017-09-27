const babel = require("babel-core");
const path  = require("path");

module.exports = function(config) {
  let browsers   = ["Phantom_Desktop"];
  let frameworks = ["requirejs", "jasmine", "jasmine-ajax", "karma-typescript"];
  let reporters  = ["mocha", "karma-typescript"];
  let ts_preprocessors = process.env["DISABLE_LINT"] ? ["karma-typescript"] : ["tslint", "karma-typescript"];

  let preprocessors = {
    "example/fullstack/browser/**/*.js"  : ["babel"],
    "example/fullstack/browser/**/*.jsx" : ["babel"],

    "src/**/*.ts"  : ts_preprocessors,
    "src/**/*.tsx" : ts_preprocessors,

    "test/unit/**/*.js"      : ["babel"],
    "test/unit/**/*.jsx"     : ["babel"],
    "test/helpers.js"        : ["babel"],
    "test/data/**/*.js"      : ["babel"],
    "test/delegates/**/*.js" : ["babel"],
    "test/dom/**/*.js" : ["babel"],
    "test/unit.js"           : ["babelexternal"]
  };

  let files = [
    "./node_modules/babel-polyfill/dist/polyfill.js",
    {pattern: "./node_modules/react/umd/react.development.js", included: false},
    {pattern: "./node_modules/react-dom/umd/react-dom.development.js", included: false},

    {pattern: "./test/data/**/*.js", included: false},
    {pattern: "./test/delegates/**/*.js", included: false},
    {pattern: "./test/dom/**/*.js", included: false},

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
    "karma-mocha-reporter",
    "karma-phantomjs-launcher",
    "karma-chrome-launcher",
    "karma-narrow-reporter",
    {"preprocessor:babelexternal": ["factory", external]},
    {"framework:jasmine-ajax": ["factory", jasmineAjax]}
  ];

  let proxies = {
    "/react/": "/base/node_modules/react/umd/",
    "/react-dom/": "/base/node_modules/react-dom/umd/"
  };

  let options = { preprocessors, browsers, plugins, frameworks, files, reporters, proxies };

  options.customLaunchers = {
    "Phantom_Desktop": {
      base: "PhantomJS",
      options: {
        viewportSize: {
          width: 1200,
          height: 1000
        }
      }
    }
  };

  options.babelPreprocessor = {
    options: {
      presets: ["es2015", "react"],
      plugins: ["transform-es2015-modules-amd", "transform-object-rest-spread"]
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
    bundlerOptions: {
      addNodeGlobals: false
    },
    reports: {
      "html": {
        "directory": "./coverage/html",
      },
      "lcovonly": {
        "directory": "./coverage/lcov",
        "filename": "coverage.lcov"
      }
    },
    tsconfig: "./tsconfig.json",
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
