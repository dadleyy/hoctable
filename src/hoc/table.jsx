import ColumnHeader from "./column_header";
import utils from "../utils";

function TableFactory(RowTransclusion, ColumnTransclusion) {
  // compose our column component from the column hoc
  let Column = ColumnHeader(ColumnTransclusion);

  function rows(table) {
    let {delegate, store} = this.props;
    let {bodies} = this;

    // no table ref?
    if(!table)
      return;

    function render(row_data) {
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
    }

    delegate.rows(store, render)
  }

  class Table extends React.Component {

    constructor(props) {
      super(props);
      let {store, delegate}   = props;
      let {sorting: previous} = store.getState();

      function update() {
        this.forceUpdate();
      }

      this.unsubscribe = store.subscribe(update.bind(this));
      this.bodies      = [];
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      let {store, delegate} = this.props;

      let columns = delegate.columns(store);

      let th_list  = [];
      let col_list = [];
      let tr_list  = [];

      for(let i = 0, c = columns.length; i < c; i++) {
        let column = columns[i];
        let config = {column, delegate, store};
        th_list.push(<Column {...config} key={column.rel} />);
        col_list.push(<col className={column.rel} key={column.rel} />);
      }

      return (
        <table className="hoctable-table" ref={rows.bind(this)}>
          <colgroup>{col_list}</colgroup>
          <thead className="hoctable-table__table-head"><tr>{th_list}</tr></thead>
        </table>
      );
    }

  }

  return Table;
}

export default TableFactory;
