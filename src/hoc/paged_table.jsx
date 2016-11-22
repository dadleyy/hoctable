import ColumnFactory from "./column_header";
import PaginationFactory from "./pagination";
import utils from "../utils";

function PagedTableFactory(RowTransclusion, ColumnTransclusion, PageTransclusion) {
  // compose our column component from the column hoc
  let Column = ColumnFactory(ColumnTransclusion);
  let Pagination = PaginationFactory(PageTransclusion);

  function rows(table) {
    let {delegate, store} = this.props;
    let {bodies} = this;

    // no table ref?
    if(!table)
      return;

    function render(row_data, total) {
      let {childNodes: children} = table;

      // cleanup previous tbody elements
      while(bodies.length) {
        let [next] = bodies.splice(0, 1);
        ReactDOM.unmountComponentAtNode(next);
        utils.dom.remove(next);
      }

      // loop over row data, creating a tbody and a transclusion instance
      // for each row, adding them into the tbody storage array to be cleaned
      // up on the next iteration.
      for(let i = 0, c = row_data.length; i < c; i++) {
        let row  = row_data[i];
        let body = document.createElement("tbody");

        ReactDOM.render(<RowTransclusion row={row} />, body);
        table.appendChild(body);
        bodies.push(body);
      }

      this.temp = true;
      store.dispatch({type: "PAGINATION_TOTAL", total});
      this.temp = false;
    }

    delegate.rows(store, render.bind(this))
  }

  class PagedTable extends React.Component {

    constructor(props) {
      super(props);
      let {store, delegate} = props;
      let cache = props.cache || [];

      this.bodies = [];

      function setState() {
        this.setState({updated: Date.now()});
      }

      this.subscriptions = [
        store.subscribe(setState.bind(this))
      ];
    }

    shouldComponentUpdate() {
      let {temp} = this;
      return temp !== true;
    }

    componentWillUnmount() {
      let {subscriptions} = this;

      while(subscriptions.length) {
        let fn = subscriptions.shift();
        fn();
      }

    }

    render() {
      // reference the props, proxy and state (which has the total)
      let {props, state, total, page_store} = this;

      // get the shared state store from the props
      let {store, delegate} = props;

      // create the two composed components we need to render
      let pager = <Pagination store={store} />;

      let columns = delegate.columns(store);

      let th_list  = [];
      let col_list = [];
      let tr_list  = [];

      for(let i = 0, c = columns.length; i < c; i++) {
        let column    = columns[i];
        let config    = {column, delegate, store};
        th_list.push(<Column {...config} key={column.rel} />);
        col_list.push(<col className={column.rel} key={column.rel} style={column.style} />);
      }

      return (
        <div className="hoctable-paged-table">
          <div className="hoctable-paged-table__table">
            <table className="hoctable-table" ref={rows.bind(this)}>
              <colgroup>{col_list}</colgroup>
              <thead className="hoctable-table__table-head"><tr>{th_list}</tr></thead>
            </table>
          </div>
          <div className="hoctable-paged-table__pagination">{pager}</div>
        </div>
      );
    }

  }

  return PagedTable;
}

export default PagedTableFactory;
