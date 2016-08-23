import ColumnHeader from "./ColumnHeader.jsx"
import Events from "./Events.js"

function Factory(RowTransclusion, ColumnTransclusion) {
  let Column = typeof ColumnTransclusion === "function" ? ColumnTransclusion : ColumnHeader;

  class Table extends React.Component {

    constructor(props) {
      super(props);
      let {sorting, delegate} = props;
      let update = this.forceUpdate.bind(this);

      function sorted(new_sorting) {
        Object.assign(sorting, new_sorting);
        delegate.refresh(update);
      }

      this.events = new Events();
      this.events.on("sorted", sorted);
    }

    componentWillUnmount() {
      console.log("done!");
    }

    componentDidMount() {
      let {delegate} = this.props;
      let update = this.forceUpdate.bind(this);
      delegate.refresh(update);
    }

    render() {
      let {events}   = this;
      let {delegate} = this.props;
      let {sorting}  = this.state || {};

      let columns = delegate.columns();
      let rows    = delegate.rows();

      let th_list  = [];
      let col_list = [];
      let tr_list  = [];

      for(let i = 0, c = columns.length; i < c; i++) {
        let column = columns[i];
        let config = {column, delegate, sorting, events};
        th_list.push(<Column config={config} key={column.rel} />);
        col_list.push(<col className={column.rel} key={column.rel} />);
      }

      for(let i = 0, c = rows.length; i < c; i++) {
        let row = rows[i];
        tr_list.push(<RowTransclusion row={row} {...this.props} key={row.$key} />);
      }

      return (
        <table className="hoctable">
          <colgroup>{col_list}</colgroup>
          <thead className="hoctable__table-head"><tr>{th_list}</tr></thead>
          <tbody className="hoctable__table-body">{tr_list}</tbody>
        </table>
      );
    }

  }

  return Table;
}

export {Factory};
