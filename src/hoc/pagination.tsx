export declare interface PaginationState {
  current : number;
  total   : number;
  size    : number;
}

export declare interface PaginationDelegate {
  goTo(new_page : number) : void;
  pagination              : () => PaginationState;
}

export declare interface PaginationProps {
  delegate : PaginationDelegate
}

export declare interface ButtonProps {
  label   : string;
  handler : () => void;
}

function DefaultButton(props : ButtonProps) {
  let {label, handler} = props;
  let class_name = `hoctable-pagination__${label}`;
  return (<div className={class_name}><a onClick={handler}>{label}</a></div>);
}

function Factory(Next = DefaultButton, Previous = DefaultButton) : React.ComponentClass<PaginationProps> {

  class Pagination extends React.Component<PaginationProps, any> {

    constructor(props) {
      super(props);
    }

    render() {
      let {delegate} = this.props;
      let {total, size, current} = delegate.pagination();
      let update = this.forceUpdate.bind(this);

      if(!total)
        return (<div className="hoctable-pagination--empty"></div>);

      let first = current * size;
      let end   = first + size;

      function go(amt : number) {
        delegate.goTo(current + amt);
        update();
      }

      function previous() {
        return go(-1);
      }

      function next() {
        return go(1);
      }

      let buttons = [];

      if(first > 0)
        buttons.push(<Previous label={"previous"} handler={previous} key="previous"/>);

      if(end && end < total)
        buttons.push(<Next label={"next"} handler={next} key="next" />);

      let max_page = total >= 1 && size >= 1 ? Math.ceil(total / size) : 0;

      return (
        <div className="hoctable-pagination clearfix">
          <div className="hoctable-pagination__info" data-single-page={max_page === 1}>
            <p>page {current + 1} of {max_page} <span className="hoctable-pagination__info__total">({total} results)</span></p>
          </div>
          <div className="hoctable-pagination__controls">{buttons}</div>
        </div>
      );
    }
  }

  return Pagination;

}

export default Factory;
