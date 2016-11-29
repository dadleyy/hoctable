import i18n from "../../i18n";

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

  constructor(org, repo) {
    this.org  = org;
    this.repo = repo;
  }

  columns() {
    return COLUMNS;
  }

  rows(store, callback) {
    let {pagination, sorting} = store.getState();
    let {org, repo} = this;
    let {current: page} = pagination;

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
      callback([{error: true}], 0);
    }

    qwest.get(`/api/issues`, {org, repo, page: page + 1})
      .then(loaded).catch(failed);
  }

}

export default Delegate;
