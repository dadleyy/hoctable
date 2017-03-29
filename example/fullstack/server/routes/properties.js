const properties = require("../../../../test/data/properties");

module.exports = function findProperties(req, res) {
  res.json({meta: {}, results: properties});
}
