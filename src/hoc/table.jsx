import ColumnFactory from "hoc/column_header";
import PaginationFactory from "hoc/pagination";
import utils from "utils";

function PagedTableFactory(RowTransclusion, ColumnTransclusion) {
  // compose our column component from the column hoc
  let Column = ColumnFactory(ColumnTransclusion);
  let Pagination = PaginationFactory();

  class PagedTable extends React.Component {

    constructor(props) {
      super(props);
      let pagination  = {};
      let sorting     = {};

      this.bodies     = [];
      this.transclude = this.transclude.bind(this);
      this.state      = {pagination, sorting};
    }

    shouldComponentUpdate() {
    }

    componentWillUnmount() {
    }

    transclude(table) {
      let {props, bodies, state} = this;
      let {delegate} = props;

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
        this.temp = false;
      }

      let {pagination, sorting} = state;
      delegate.rows({pagination, sorting}, render.bind(this))
    }

    render() {
      // reference the props, proxy and state (which has the total)
      let {props, state} = this;
      let {pagination} = state;
      let {delegate} = props;
      let update = this.setState.bind(this);

      function sort(column) {
        update({sorting: {column}});
      }

      let col_delegate  = {sort};

      let page_delegate = {
        move() {
          let {size, total} = pagination;
          update({pagination: {size, total, current: new_page}});
        }
        total() {
          return pagination.total;
        }
        size() {
          return pagination.size;
        }
        current() {
          return pagination.current;
        }
      }

      // create the two composed components we need to render
      let pager = <Pagination delegate={page_delegate} />;

      let columns = delegate.columns();

      let th_list  = [];
      let col_list = [];
      let tr_list  = [];

      for(let i = 0, c = columns.length; i < c; i++) {
        let column    = columns[i];
        th_list.push(<Column column={column} key={column.rel} />);
        col_list.push(<col className={column.rel} key={column.rel} style={column.style} />);
      }
      

      return (
        <div className="hoctable-paged-table">
          <div className="hoctable-paged-table__table">
            <table className="hoctable-table" ref={this.transclude}>
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
