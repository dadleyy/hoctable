var TEST_REGEXP = /spec\.js$/;

var karma = window.__karma__;
var tests = [];
var files = karma.files;

function pathToModule(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
}

for(var file_name in files) {
  var is_test = TEST_REGEXP.test(file_name);

  if(!is_test)
    continue;

  var path = pathToModule(file_name);
  tests.push(path);
}

require.config({
  baseUrl  : "/base/src",
  shim     : {},
  deps     : tests,
  callback : karma.start,

  paths    : {
    "example"  : "/base/example/browser/js",
    "fixtures" : "/base/test/fixtures",
    "test"     : "/base/test"
  }
});
