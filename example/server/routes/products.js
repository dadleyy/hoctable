const products = require("../../../test/data/products");

function toi(i) { return parseInt(i, 10); }
function lower(s) { return s && s.toLowerCase(); };

module.exports = function findProducts(req, res) {
  let results = products.slice(0);
  let {orderby, max, page, name, filters} = req.query;

  function applyFilters(product) {
    let {property_values} = product;

    for(let i = 0, c = filters.length; i < c; i++) {
      let {property, operator, value} = filters[i];
      let [match] = property_values.filter(function({property_id}) { return toi(property_id) === toi(property); });

      if((operator !== "has_value" && operator !== "has_no_value") && !match)
        return false;

      if(operator === "has_no_value" && match && match.value)
        return false;

      if(operator === "has_value" && (!match || !match.value))
        return false;

      if(operator === "contains" && lower(match.value).indexOf(lower(value)) === -1)
        return false;

      if(operator === "equals" && value !== match.value)
        return false;

      if(operator === "is_any" && value.indexOf(match.value) === -1)
        return false;

      if(operator === "greater_than" && toi(value) >= toi(match.value))
        return false;

      if(operator === "less_than" && toi(value) <= toi(match.value))
        return false;

      if(operator === "is_any" && value.indexOf(match.value) === -1)
        return false;
    }

    return true;
  }

  // apply the filters to the result list
  results = filters && filters.length ? results.filter(applyFilters) : results;

  // to.do sort the results...
  let {length: total} = results;

  // slice/paginate the results
  let start = toi(max) * toi(page);
  results   = results.slice(start, start + toi(max));

  return res.json({meta: {total}, results});
}
