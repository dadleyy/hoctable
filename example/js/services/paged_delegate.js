import {replace} from "./util";

const DEFAULT_SORT = {rel: "id"};

class Delegate {

  constructor() {
    this.people = [];
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

  rows(store, callback) {
    let {people} = this;
    let {sorting: {rel, order}, pagination: {size, current}} = store.getState();

    function success(_, response) {
      let {results, meta} = response;

      replace(people, results);

      if(people.length === 0)
        return callback([{empty: true}], 0);

      let rows = people.map(function(person) { return {person}; });
      callback(rows, meta.total);
    }

    function failed(e) {
      console.error(e.stack);
      callback([{failed: true}]);
    }

    let params = {
      orderby: order ? rel : `-${rel}`, 
      max: size,
      page: current
    };

    qwest.get("/api/people", params)
      .then(success)
      .catch(failed);
  }

}

export default Delegate;
