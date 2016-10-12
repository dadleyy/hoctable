var TEST_REGEXP = /spec\.js$/;

var tests = [];

function pathToModule(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if(TEST_REGEXP.test(file)) {
    tests.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/base',
  shim: {},
  deps: tests,
  callback: window.__karma__.start
});
