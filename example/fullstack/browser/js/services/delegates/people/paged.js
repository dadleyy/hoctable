import {replace} from "../../util";

const DEFAULT_SORT = {rel: "id"};

class Delegate {

  constructor() {
    this.people  = [];
    this.query   = null;
  }

  columns() {
    return [{
      rel: "id",
      name: "ID"
    }, {
      rel: "name",
      name: "Name"
    }, {
      rel: "age",
      name: "Age"
    }];
  }

  rows(pagination, sorting, callback) {
    let { people, query: name, state } = this;
    let { size, current } = pagination;
    let { direction, rel: orderby } = sorting || { };

    function success(_, response) {
      let { results, meta } = response;

      replace(people, results);
      people.total = meta.total;

      if(people.length === 0) {
        let rows = [{ empty: true }];
        return callback({ rows, total: 1 });
      }

      let rows = people.map(function(person) { return {person}; });
      callback({ rows, total: meta.total });
    }

    function failed(e) {
      console.error(e.stack);
      callback([{failed: true}]);
    }

    let params = {
      orderby: direction ? orderby : `-${orderby}`, 
      max: size,
      page: current
    };

    if(name && name.length >= 1)
      params.name = name;

    qwest.get(`/api/people`, params)
      .then(success)
      .catch(failed);
  }

}

export default Delegate;
