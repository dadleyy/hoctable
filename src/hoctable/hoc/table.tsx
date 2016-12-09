import utils from "hoctable/utils";

export interface PaginationState {
  current : number;
  total   : number;
  size    : number;
}

export interface PaginationDelegate {
  goTo(new_page : number) : void;
  pagination              : () => PaginationState;
}

export interface PaginationProps {
  delegate : PaginationDelegate
}

export interface ButtonProps {
  label   : string;
  handler : () => void;
}

export function DefaultButton(props : ButtonProps) {
  let {label, handler} = props;
  let class_name = `hoctable-pagination__${label}`;
  return (<div className={class_name}><a onClick={handler}>{label}</a></div>);
}

export interface ColumnDefinition {
  rel    : string;
  name   : string;
  style? : any;
}

export interface ColumnDelegate {
  sort     : (column : ColumnDefinition) => void;
  isActive : (column : ColumnDefinition) => boolean;
}

export interface ColumnContentProps {
  column: ColumnDefinition;
}

export interface ColumnProps {
  delegate : ColumnDelegate;
  column   : ColumnDefinition;
}

export interface DataLoadedCallback {
  (row_data : Array<any>, total : number) : void;
}

export interface TableDelegate {
  rows       : (callback : DataLoadedCallback) => void;
  columns    : () => Array<ColumnDefinition>;
  paging     : PaginationDelegate;
  sorting    : ColumnDelegate;
}

export interface TableProps {
  delegate : TableDelegate;
}

export interface PaginationProxy extends PaginationDelegate {
  total : number;
}

export interface TableProxies {
  pagination : PaginationProxy;
  sorting    : ColumnDelegate;
}

export type RowTransclusion = React.ComponentClass<any>;
export type ColTransclusion = React.StatelessComponent<any>;
export type ComposedTable   = React.ComponentClass<TableProps>;
export type ComposedPager   = React.ComponentClass<PaginationProps>;

export function PaginationFactory(Next = DefaultButton, Previous = DefaultButton) : ComposedPager {

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

const TH_CLASS        = "hoctable__column-header";
const TH_CLASS_ACTIVE = "hoctable__column-header--active";

function DefaultColumnContent(props : ColumnContentProps) : React.ReactElement<any> {
  let {column} = props;

  return (
    <div className="hoctable__column-content">
      <span>{column.name}</span>
    </div>
  );
}

function ColumnFactory(Transclusion = DefaultColumnContent) {

  class ColumnHeader extends React.Component<ColumnProps, any> {

    constructor(props) {
      super(props);
      this.sort = this.sort.bind(this);
    }

    sort() {
      let update = this.forceUpdate.bind(this);
      let {delegate, column} = this.props;
      delegate.sort(column);
      update();
    }

    render() {
      let {column, delegate} = this.props;
      let {name, rel} = column;
      let th_class = TH_CLASS;

      if(delegate.isActive(column))
        th_class += ` ${TH_CLASS_ACTIVE}`;

      let body = Transclusion ? <Transclusion column={column} /> : <span>{name}</span>;

      return (
        <th className={th_class} onClick={this.sort}>
          <div className="hoctable__cell-inner">{body}</div>
        </th>
      )
    }

  }

  return ColumnHeader;
}

function Factory(Row : RowTransclusion, Column? : ColTransclusion) : ComposedTable {
  // compose our column component from the column hoc
  let ComposedColumn = ColumnFactory(Column);
  let Pagination = PaginationFactory();

  class PagedTable extends React.Component<TableProps, any> {
    private bodies  : Array<HTMLElement>;
    private proxies : TableProxies;

    constructor(props : TableProps) {
      super(props);
      // prepare an array to hold of the html nodes that we create during our renders
      // so that we can delete them and unmount components later.
      this.bodies = [];

      // get references to the delegate and bind an updater function that will be used
      // in the proxies we create to wrap our delegate's functionality.
      let {delegate} = this.props;
      let update     = this.forceUpdate.bind(this);

      // create the pagination proxy
      let pagination = {
        total: 0,

        pagination() {
          let {size, current} = delegate.paging.pagination();
          let {total} = this;
          return {size, total, current};
        },

        goTo(new_page) {
          delegate.paging.goTo(new_page);
          update();
        }

      };

      // create the sorting proxy
      let sorting = {

        sort(column) {
          props.delegate.sorting.sort(column);
          update();
        },

        isActive(column) {
          return false;
        }

      };

      this.proxies = {pagination, sorting};
    }

    transclude(table : HTMLElement) {
      let {props, bodies, proxies, refs} = this;
      let {delegate} = props;

      if(!table) return;

      function render(row_data : Array<any>, total : number) {
        let {childNodes: children} = table;
        let pager = refs["pager"] as HTMLElement;

        ReactDOM.unmountComponentAtNode(pager);

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

          ReactDOM.render(<Row row={row} />, body);
          table.appendChild(body);
          bodies.push(body);
        }

        proxies.pagination.total = total;
        // render the pagination
        ReactDOM.render(<Pagination delegate={proxies.pagination} />, pager);
      }

      delegate.rows(render.bind(this));
    }

    render() {
      // reference the props, proxy and state (which has the total)
      let {props, proxies} = this;
      let {delegate} = props;

      let th_list  = [];
      let col_list = [];

      for(let i = 0, columns = delegate.columns(), c = columns.length; i < c; i++) {
        let column = columns[i];
        th_list.push(<ComposedColumn column={column} key={column.rel} delegate={proxies.sorting} />);
        col_list.push(<col className={column.rel} key={column.rel} style={column.style} />);
      }

      return (
        <div className="hoctable-paged-table">
          <div className="hoctable-paged-table__pagination" ref="pager"></div>
          <div className="hoctable-paged-table__table">
            <table className="hoctable-table" ref={this.transclude.bind(this)}>
              <colgroup>{col_list}</colgroup>
              <thead className="hoctable-table__table-head"><tr>{th_list}</tr></thead>
            </table>
          </div>
        </div>
      );
    }

  }

  return PagedTable;
}

export default Factory;
