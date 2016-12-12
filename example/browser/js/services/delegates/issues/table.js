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
    this.filters = filters;
    this.state = {
      pagination : {current: 0, size: 10},
      sorting    : {}
    };
  }

  pagination() {
    let {state} = this;
    return state.pagination;
  }

  sorting() {
    let {state} = this;
    return state.sorting;
  }

  columns() {
    return COLUMNS;
  }

  rows(callback) {
    let {org, repo, state, filters} = this;
    let {current: page} = state.pagination
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
