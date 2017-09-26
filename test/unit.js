/* This file is the only file configured to be initially loaded in the browser by karma. It is responsible for loading
 * any browser-side libraries (via requirejs) that are reqiured for runtime, and subsequently loading any test files - 
 * files whose file path (in karma's file registry) match the spec regular expression.
 */
var TEST_REGEXP = /spec\.(js|jsx)$/;

var karma = window.__karma__;
var tests = [];
var files = karma.files;

// Given a file path, this function will return the `require`-able module path used to load it via requirejs.
function pathToModule(path) {
  return path.replace(/^\/base\//, '').replace(/\.(js|jsx)$/, '');
}

// Iterate over the file registry, pushing test files into the array we will use to kick off the test runs.
for(var file_name in files) {
  var is_test = TEST_REGEXP.test(file_name);

  if(!is_test)
    continue;

  var path = pathToModule(file_name);
  tests.push(path);
}

/* Once the browser-side vendor libraries have been loaded (namely react + react-dom, this function will load in the 
 * tests and prompt karma to begin test execution.
 */
function start(React, ReactDOM) {
  window.React    = React;
  window.ReactDOM = ReactDOM;
  require(tests, karma.start);
}

/* Once requirejs is properly configured, this function is resposible for loadin in (via requiresjs) the vendor 
 * libraries required at runtime. Important: These libraries should be proper es5 amd modules:
 *
 * define([], function(){})
 */
function expose() {
  require(["react", "react-dom"], start);
}

// Configure requirejs for runtime. `/base` is the karma base url; the root of the repository in our case.
require.config({
  baseUrl  : "/base/src",
  shim     : {},
  callback : expose, 

  paths    : {
    "example"      : "/base/example/fullstack/browser/js",
    "fixtures"     : "/base/test/data",
    "delegates"    : "/base/test/delegates",
    "dom"          : "/base/test/dom",
    "test_helpers" : "/base/test/helpers",
    "react"        : "/react/react.development",
    "react-dom"    : "/react-dom/react-dom.development",
    "test"         : "/base/test"
  }
});
