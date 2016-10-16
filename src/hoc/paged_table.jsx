import TableFactory from "./table";
import PaginationFactory from "./pagination";
import utils from "../utils";

let compare = utils.compare.fields(["total", "size", "current"]);

class Proxy {

  constructor(delegate, store) {
    this.delegate = delegate;
  }

  rows(store, callback) {
    let {delegate} = this;

    function finished(rows, total) {
      store.dispatch({type: "PAGINATION_TOTAL", total});
      callback(rows);
    }

    delegate.rows(store, finished);
  }

  columns() {
    let {delegate} = this;
    return delegate.columns();
  }

}

function PagedTableFactory(RowTransclusion, ColumnTransclusion, PageTransclusion) {
  let Table      = TableFactory(RowTransclusion, ColumnTransclusion);
  let Pagination = PaginationFactory(PageTransclusion);

  class PagedTable extends React.Component {

    constructor(props) {
      super(props);
      let {store, delegate} = props;
      let {pagination: previous} = store.getState();

      function update() {
        let {pagination} = store.getState();
        let same_state   = compare(pagination, previous);
        previous = Object.assign(previous, pagination);
        return same_state === false ? this.forceUpdate() : null;
      }

      let unsubscribe = store.subscribe(update.bind(this));
      this.proxy      = new Proxy(delegate, store);
      this.handles    = {unsubscribe};
    }

    componentWillUnmount() {
      this.handles.unsubscribe();
    }

    render() {
      let {props, proxy} = this;
      let {store} = props;

      let table      = <Table delegate={proxy} store={store} />;
      let pagination = <Pagination store={store} />;

      return (
        <div className="hoctable-paged-table">
          <div className="hoctable-paged-table__table">{table}</div>
          <div className="hoctable-paged-table__pagination">{pagination}</div>
        </div>
      );
    }

  }

  return PagedTable;
}

export default PagedTableFactory;
