import {stores} from "hoctable";
import {replace} from "../../util";

const DEFAULT_SORT = {rel: "id"};

class Delegate {

  constructor() {
    this.people  = [];
    this.query   = null;
    this.paging  = new stores.Pagination();
    this.sorting = new stores.Sorting();
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

  rows(callback) {
    let {people, query: name, sorting, paging} = this;
    let {orderby, direction} = sorting;
    let {size, current} = paging;

    function success(_, response) {
      let {results, meta} = response;
      replace(people, results);
      people.total = meta.total;

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
