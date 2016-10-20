import utils from "../utils";

let compare = utils.compare.fields(["total", "size", "current"]);

function PaginationFactory(PageTransclusion) {

  class Pagination extends React.Component {

    constructor(props) {
      super(props);
    }

    componentWillUnmount() {
    }

    render() {
      let {store}    = this.props;
      let pagination = store.getState();
    
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
      let next     = end && (end < total) ? <a onClick={move(1)}>next</a> : null;
      let max_page = total >= 1 && size >= 1 ? Math.ceil(total / size) : 0;

      return (
        <div className="hoctable-pagination clearfix">
          <div className="hoctable-pagination__info">
            <p>page {current + 1} of {max_page} <span className="hoctable-pagination__info__total">({total} results)</span></p>
          </div>
          <div className="hoctable-pagination__previous">{previous}</div>
          <div className="hoctable-pagination__next">{next}</div>
        </div>
      );
    }
  }

  return Pagination;
}

export default PaginationFactory;
