import {replace} from "../../util";

const DEFAULT_SORT = {rel: "id"};

class Delegate {

  constructor() {
    this.people  = [];
    this.query   = null;
    this.state   = {
      pagination : {current: 0, size: 10},
      sorting    : {},
    };
  }

  pagination() {
    return this.state.pagination;
  }

  sorting() {
    return this.state.sorting;
  }

  sortBy(column, callback) {
    let {sorting} = this.state;

    if(column.rel === sorting.orderby)
      sorting.direction = !sorting.direction;

    sorting.orderby = column.rel;
    callback();
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

  goTo(new_page, callback) {
    this.state.pagination.current = new_page;
    callback();
  }

  rows(callback) {
    let {people, query: name, state} = this;
    let {orderby, direction} = state.sorting;
    let {size, current} = state.pagination;

    function success(_, response) {
      let {results, meta} = response;
      replace(people, results);
      people.total = meta.total;
      state.pagination.total = meta.total;

      if(people.length === 0)
        return callback([{empty: true}]);

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
