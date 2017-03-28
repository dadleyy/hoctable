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
  }

  columns() {
    return COLUMNS;
  }

  rows(pagination, sorting, callback) {
    let { org, repo, state, filters } = this;
    let { current: page } = pagination;
    let { state: current_filters } = filters;

    function failed() {
      let rows = [{ errored: true }];
      return callback({ rows });
    }

    function loaded(__, { meta, status, results }) {
      if(status !== "SUCCESS") {
        return failed();
      }

      if(results.length === 0) {
        let rows = [{ empty: true }];
        return callback({ rows });
      }

      let { total } = meta;
      let rows = results.map(function(issue) { return {org, repo, issue}; });
      callback({ rows, total });
    }

    let params = {org, repo, page: page + 1};

    if(current_filters.closed) {
      params.closed = true;
    }

    qwest.get(`/api/issues`, params)
      .then(loaded).catch(failed);
  }

}

export default Delegate;
