function PaginationFactory(PageTransclusion) {

  class Pagination extends React.Component {

    constructor(props) {
      super(props);
    }

    componentWillUnmount() {
    }

    render() {
      let {delegate} = this.props;
      let total   = delegate.total();
      let current = delegate.current();
      let size    = delegate.size();

      if(!total)
        return (<div className="hoctable-pagination--empty"></div>);

      let first = current * size;
      let end   = first + size;

      function move(amt) {
        return function go() {
          delegate.move(current + amt);
        }
      }

      let previous = first > 0 ? <a onClick={move(-1)}>previous</a> : null;
      let next     = end && (end < total) ? <a onClick={move(1)}>next</a> : null;
      let max_page = total >= 1 && size >= 1 ? Math.ceil(total / size) : 0;

      return (
        <div className="hoctable-pagination clearfix">
          <div className="hoctable-pagination__info" data-single-page={max_page === 1}>
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
