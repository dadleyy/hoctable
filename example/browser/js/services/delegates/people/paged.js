import {replace} from "../../util";

const DEFAULT_SORT = {rel: "id"};

class Delegate {

  constructor() {
    this.people  = [];
    this.query   = null;
    this.paging  = {current: 0, size: 10};
    this.sorting = {};
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

  goTo(new_page) {
    this.paging.current = new_page;
  }

  sort(column) {
    this.sorting.orderby = column.rel;
  }

  pagination() {
    let {people, paging} = this;
    let total = people.total >= 1 ? people.total : 0;
    let {current, size} = paging;
    return {total, current, size};
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
