import i18n from "services/i18n";
import movies from "services/movies";

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
    this.filters = filters;
  }

  columns() {
    return COLUMNS.slice(0);
  }

  rows(pagination, sorting, callback) {
    let { filters } = this;
    let { size: max, current: page } = pagination;
    let orderby = "yaer";

    if(sorting && sorting.rel) {
      orderby = sorting.direction ? sorting.rel : `-${sorting.rel}`;
    }

    function success({ results, total }) {
      let rows = [];

      if(total === 0) {
        rows = [{ empty: true }];
        return callback({ rows });
      }

      for(let i = 0, c = results.length; i < c; i++) {
        rows.push({movie: results[i]});
      }

      callback({ rows, total });
    }

    function failed(error) {
      console.error(error);
      callback([{error}], 0);
    }

    movies.find(filters, max, page, orderby).then(success).catch(failed);
  }

}


export default TableDelegate;
