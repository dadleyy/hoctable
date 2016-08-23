const TH_CLASS        = "hoctable__column-header";
const TH_CLASS_ACTIVE = "hoctable__column-header--active";

class ColumnHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {config} = this.props;
    let {column, delegate, events, sorting} = config;
    let {name} = column;
    let th_class = TH_CLASS;

    if("function" === typeof delegate.translate)
      name = delegate.translate(column);

    function select() {
      events.trigger("sorted", {column});
    }

    if(sorting && sorting.column.rel === column.rel)
      th_class += TH_CLASS_ACTIVE;

    return (
      <th className={th_class} onClick={select}>
        <div className="hoctable__cell-inner">
          <span>{name}</span>
        </div>
      </th>
    )
  }

}

export default ColumnHeader;
