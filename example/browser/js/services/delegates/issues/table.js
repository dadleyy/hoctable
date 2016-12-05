import i18n from "../../i18n";
import {stores} from "hoctable";

const COLUMNS = [{
  rel: "id",
  name: i18n("id")
}, {
  rel: "title",
  name: i18n("title")
}, {
  rel: "labels",
  name: i18n("labels")
}, {
  rel: "reporter",
  name: i18n("reporter")
}, {
  rel: "state",
  name: i18n("status")
}];

class Delegate {

  constructor(org, repo, filters) {
    this.org  = org;
    this.repo = repo;
    this.paging  = new stores.Pagination();
    this.sorting = new stores.Sorting();
    this.filters = filters;
  }

  columns() {
    return COLUMNS;
  }

  rows(callback) {
    let {org, repo, paging, filters, sorting} = this;
    let {current: page} = paging;
    let {state: current_filters} = filters;

    function loaded(__, {meta, status, results}) {
      if(status !== "SUCCESS")
        return callback([{error: true}], 0);

      if(results.length === 0)
        return callback([{empty: true}], 0);

      let {total} = meta;
      let rows = results.map(function(issue) { return {org, repo, issue}; });
      callback(rows, total);
    }

    function failed(err) {
      console.error(err);
      callback([{error: true}], 0);
    }

    let params = {org, repo, page: page + 1};

    if(current_filters.closed)
      params.closed = true;

    qwest.get(`/api/issues`, params)
      .then(loaded).catch(failed);
  }

}

export default Delegate;
