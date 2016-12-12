import i18n from "../services/i18n";
import movies from "../services/movies";
import * as hoctable from "hoctable";

const COLUMNS = [{
  rel: "const",
  name: i18n("id")
}, {
  rel: "title",
  name: i18n("title")
}, {
  rel: "year",
  name: i18n("release_date")
}, {
  rel: "runtime",
  name: i18n("runtime")
}, {
  rel: "directors",
  name: i18n("directors")
}, {
  rel: "genres",
  name: i18n("genres")
}, {
  rel: "imdb_rating",
  name: i18n("rating")
}];

class TableDelegate {

  constructor(filters) {
    let pagination = {current: 0, size: 10, total: 0};
    let sorting    = {rel: "id"};
    this.state   = {pagination, sorting};
    this.filters = filters;
  }

  sorting() {
    let {sorting} = this.state;
    return {rel: sorting.rel, direction: sorting.direction};
  }

  sortBy(column, callback) {
    let {sorting} = this.state;

    if(column.rel === sorting.rel)
      sorting.direction = !sorting.direction;

    sorting.rel = column.rel;
    callback();
  }

  goTo(new_page, callback) {
    this.state.pagination.current = new_page;
    callback();
  }

  pagination() {
    let {pagination} = this.state;
    let {current, size, total} = pagination;
    return {current, size, total};
  }

  columns() {
    return COLUMNS.slice(0);
  }

  rows(callback) {
    let {state, filters} = this;
    let {pagination, sorting} = state;
    let {size: max, current: page} = pagination;

    let orderby = sorting.direction ? sorting.rel : `-${sorting.rel}`;

    function success({results, total}) {
      let rows = [];

      if(total === 0)
        return callback([{empty: true}]);

      for(let i = 0, c = results.length; i < c; i++) {
        rows.push({movie: results[i]});
      }

      pagination.total = total;
      callback(rows);
    }

    function failed(error) {
      console.error(error);
      callback([{error}], 0);
    }

    movies.find(filters, max, page, orderby).then(success).catch(failed);
  }

}


export default TableDelegate;
