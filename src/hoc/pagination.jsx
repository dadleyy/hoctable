import utils from "../utils";

let compare = utils.compare.fields(["total", "size", "current"]);

function PaginationFactory(PageTransclusion) {

  class Pagination extends React.Component {

    constructor(props) {
      super(props);
      let {store}  = props;
      let previous = {};

      function update() {
        let {pagination} = store.getState();
        let same_state   = compare(pagination, previous);
        previous = Object.assign(previous, pagination);
        return same_state === false ? this.forceUpdate() : null;
      }

      let unsubscribe = store.subscribe(update.bind(this));
      this.handles    = {unsubscribe};
    }

    componentWillUnmount() {
      let {handles} = this;
      handles.unsubscribe();
    }

    render() {
      let {store} = this.props;
      let {pagination} = store.getState();

      if(!pagination)
        return (<div className="hoctable-pagination--empty"></div>);

      let {size, total, current} = pagination;

      if(!total)
        return (<div className="hoctable-pagination--empty"></div>);

      let first = current * size;
      let end   = first + size;

      function move(amt) {
        return function go() {
          store.dispatch({type: "PAGINATION_MOVEMENT", amt});
        }
      }

      let previous = first > 0 ? <a onClick={move(-1)}>previous</a> : null;
      let next     = end < total ? <a onClick={move(1)}>next</a> : null;

      return (
        <div className="hoctable-pagination">
          <div className="hoctable-pagination__previous">{previous}</div>
          <div className="hoctable-pagination__next">{next}</div>
        </div>
      );
    }
  }

  return Pagination;
}

export default PaginationFactory;
