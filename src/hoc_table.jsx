import ColumnHeader from "./column_header";
import Events from "./event_engine";

function Factory(RowTransclusion, ColumnTransclusion) {
  // compose our column component from the column hoc
  let Column = ColumnHeader(ColumnTransclusion);

  function rows(table) {
    let {delegate, sorting} = this.props;

    // no table ref?
    if(!table)
      return;

    function render(row_data) {
      let {childNodes: children} = table;

      for(let i = 0, c = children.length; i < c; i++) {
        let child = children[i];

        if("tbody" === child.nodeName.toLowerCase())
          ReactDOM.unmountComponentAtNode(child);
      }

      for(let i = 0, c = row_data.length; i < c; i++) {
        let row  = row_data[i];
        let body = document.createElement("tbody");

        ReactDOM.render(<RowTransclusion row={row} />, body);
        table.appendChild(body);
      }
    }

    delegate.rows(sorting, render)
  }

  class Table extends React.Component {

    constructor(props) {
      super(props);
      let {sorting, delegate} = props;

      function update() {
        this.forceUpdate();
      }

      this.unsubscribe = sorting.subscribe(update.bind(this));
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      let {events}   = this;
      let {sorting, delegate} = this.props;

      let columns = delegate.columns();

      let th_list  = [];
      let col_list = [];
      let tr_list  = [];

      for(let i = 0, c = columns.length; i < c; i++) {
        let column = columns[i];
        let config = {column, delegate, sorting};
        th_list.push(<Column {...config} key={column.rel} />);
        col_list.push(<col className={column.rel} key={column.rel} />);
      }

      return (
        <table className="hoctable" ref={rows.bind(this)}>
          <colgroup>{col_list}</colgroup>
          <thead className="hoctable__table-head"><tr>{th_list}</tr></thead>
        </table>
      );
    }

  }

  return Table;
}

export {Factory};
