const people = require("../../../test/data/people");
  
module.exports = function findPeople(req, res) {
  let {orderby, max, page, name} = req.query;
  let prop = orderby && orderby.charAt(0) === '-' ? orderby.substr(1) : orderby;

  function sort(a, b) {
    let mod = a[prop] < b[prop] ? 1 : (a[prop] === b[prop] ? 0 : -1);
    return orderby.charAt(0) === '-' ? -mod : mod;
  }

  function filter({name: person}) {
    return person.toLowerCase().indexOf(name) >= 0;
  }

  let filtered = name && name.length ? people.filter(filter) : people;

  let results = (prop ? filtered.sort(sort) : filtered).slice(0);

  max  = parseInt(max, 10) || 100;
  page = parseInt(page, 10) || 0;

  let start = max * page;
  let end   = start + max;
  results = results.slice(start, end);

  res.json({meta: {total: filtered.length}, results});
};
