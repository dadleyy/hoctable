function resolve(resolution) {
  return Q.resolve(resolution);
}

function reject(resolution) {
  return Q.reject(resolution);
}

function defer(resolution) {
  return Q.defer();
}

export default {resolve, reject, defer};
