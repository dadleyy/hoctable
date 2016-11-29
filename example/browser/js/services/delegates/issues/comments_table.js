import i18n from "../../i18n";

const COLUMNS = [{
  rel: "id",
  name: ""
}];

class Delegate {

  constructor(org, repo, number) {
    this.org    = org;
    this.repo   = repo;
    this.number = number;
  }

  columns() {
    return COLUMNS;
  }

  rows(store, callback) {
    let {pagination, sorting} = store.getState();
    let {org, repo, number} = this;
    let {current: page} = pagination;

    function loaded(__, {meta, status, results}) {
      if(status !== "SUCCESS")
        return callback([{error: true}], 0);

      if(results.length === 0)
        return callback([{empty: true}], 0);

      let {total} = meta;
      let rows = results.map(function(comment) { return {org, repo, comment}; });
      callback(rows, total);
    }

    function failed(err) {
      callback([{error: true}], 0);
    }

    qwest.get(`/api/issues/comments`, {org, repo, number, page: page + 1})
      .then(loaded).catch(failed);
  }

}

export default Delegate;
