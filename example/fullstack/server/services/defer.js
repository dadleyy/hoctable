const bluebird = require("bluebird");
 
function defer() {
  let deferred = {};

  deferred.promise = new bluebird(function(resolve, reject) {
    Object.assign(deferred, {resolve, reject});
  });

  return deferred;
}

defer.all = function(arr) {
  return bluebird.all(arr);
}

module.exports = defer;
 
