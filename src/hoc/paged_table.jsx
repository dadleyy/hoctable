import TableFactory from "./table";
import PaginationFactory from "./pagination";
import utils from "../utils";

let compare = utils.compare.fields(["total", "size", "current"]);

class Proxy {

  constructor(delegate, store, actions) {
    this.delegate = delegate;
    this.cache    = [];
    this.temp     = false;
    this.actions  = actions;
  }

  rows(store, callback) {
    let {delegate, actions, cache, temp} = this;

    // if we're being called because the paged table is re-rendering - e.g it received 
    // a new "total" from the api - we know to use the previously loaded data.
    if(temp === true)
      return callback(cache);

    // once the real delegate has finished loading it's data, we should update our cache
    // of the row data, send that along to the waiting table, and let the paged table know
    // that it has a new total.
    function loaded(rows, total) {
      utils.replace(cache, rows);
      callback(rows);
      actions.update({total});
    }

    delegate.rows(store, loaded);
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

      function update({total}) {
        // let the proxy know that we're only asking for rows b/c we're re-rendering.
        // this will cause it to use the last set of rows from the server.
        this.proxy.temp = true;

        // update our internal knowledge of the toal amount of rows (triggers render)
        this.setState({total});

        // clear out the temp flag - next time we ask for rows, we mean it.
        this.proxy.temp = false;
      }

      // create a proxy delegate that is smart about letting this component know
      // when it has loaded in new rows, and is able to be told to use cached data.
      this.proxy = new Proxy(delegate, store, {update: update.bind(this)});
    }

    componentWillUnmount() {
    }

    render() {
      // reference the props, proxy and state (which has the total)
      let {props, proxy, state} = this;

      // get the shared state store from the props
      let {store} = props;

      // get the current page and the page size from our pagination store
      let {pagination: {size, current}} = store.getState();
      let {total} = state || {};

      // create a tiny proxy for the pagination hoc we'll be using
      let pagination_store = {
        getState() { return {size, current, total}; },
        dispatch(payload) { return store.dispatch(payload); }
      };

      // create the two composed components we need to render
      let table = <Table delegate={proxy} store={store} />;
      let pager = <Pagination store={pagination_store} />;

      return (
        <div className="hoctable-paged-table">
          <div className="hoctable-paged-table__table">{table}</div>
          <div className="hoctable-paged-table__pagination">{pager}</div>
        </div>
      );
    }

  }

  return PagedTable;
}

export default PagedTableFactory;
