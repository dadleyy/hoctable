const TH_CLASS        = "hoctable__column-header";
const TH_CLASS_ACTIVE = "hoctable__column-header--active";

function Factory(Transclusion) {

  class ColumnHeader extends React.Component {

    constructor(props) {
      super(props);
    }

    sort() {
      let {column, sorting} = this.props;
      sorting.dispatch({type: "COLUMN_CLICK", column});
    }

    render() {
      let {column, delegate, sorting} = this.props;
      let {name, rel} = column;
      let th_class = TH_CLASS;

      if("function" === typeof delegate.translate)
        name = delegate.translate(column);

      if(sorting && sorting.column && sorting.column.rel === column.rel)
        th_class += ` ${TH_CLASS_ACTIVE}`;

      let body = Transclusion ? <Transclusion column={column} delegate={delegate} /> : <span>{name}</span>;

      return (
        <th className={th_class} onClick={this.sort.bind(this)}>
          <div className="hoctable__cell-inner">{body}</div>
        </th>
      )
    }

  }

  return ColumnHeader;
}

export default Factory;
