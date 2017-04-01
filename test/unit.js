var TEST_REGEXP = /spec\.(js|jsx)$/;

var karma = window.__karma__;
var tests = [];
var files = karma.files;

function pathToModule(path) {
  return path.replace(/^\/base\//, '').replace(/\.(js|jsx)$/, '');
}

for(var file_name in files) {
  var is_test = TEST_REGEXP.test(file_name);

  if(!is_test)
    continue;

  var path = pathToModule(file_name);
  tests.push(path);
}

function start(React, ReactDOM) {
  window.React    = React;
  window.ReactDOM = ReactDOM;
  require(tests, karma.start);
}

function expose() {
  require(["react", "react-dom"], start);
}

require.config({
  baseUrl  : "/base/src",
  shim     : {},
  callback : expose, 

  paths    : {
    "example"      : "/base/example/fullstack/browser/js",
    "fixtures"     : "/base/test/fixtures",
    "test_helpers" : "/base/test/helpers",
    "react"        : "/base/node_modules/react/dist/react",
    "react-dom"    : "/base/node_modules/react-dom/dist/react-dom",
    "test"         : "/base/test"
  }
});
