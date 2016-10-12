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

  load(sorting, callback) {
    let {people} = this;
    let {rel, order} = sorting;

    function success(_, response) {
      let {results} = response;
      replace(people, results);
      callback(false);
    }

    function failed(e) {
      console.error(e.stack);
      callback(true);
    }

    qwest.get("/api/people", {orderby: order ? rel : `-${rel}`})
      .then(success)
      .catch(failed);
  }

  rows() {
    let {people} = this;
    return people.map(function(person) { return {person, $key: person.id}; });
  }

}

export default Delegate;
