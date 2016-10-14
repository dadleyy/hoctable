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

  rows(sorting, callback) {
    let {people} = this;
    let {rel, order} = sorting.getState();

    function success(_, response) {
      let {results} = response;
      replace(people, results);

      if(people.length === 0)
        return callback([{empty: true}]);

      let rows = people.map(function(person) { return {person}; });
      callback(rows);
    }

    function failed(e) {
      console.error(e.stack);
      callback([{failed: true}]);
    }

    qwest.get("/api/people", {orderby: order ? rel : `-${rel}`})
      .then(success)
      .catch(failed);
  }

}

export default Delegate;
