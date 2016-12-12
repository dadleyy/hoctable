import utils from "hoctable/utils";

/* types */

export interface PaginationState {
  current : number;
  total   : number;
  size    : number;
}

export interface UpdateCallback {
  () : void;
}

export interface PaginationProps {
  move       : (new_page : number, callback : UpdateCallback) => void;
  pagination : PaginationState;
}

export interface ButtonProps {
  label   : string;
  handler : () => void;
}

export interface ColumnDefinition {
  rel    : string;
  name   : string;
  style? : any;
}

export interface ColumnProps {
  sort   : (column : ColumnDefinition, callback : UpdateCallback) => void;
  column : ColumnDefinition;
  active : boolean;
}

export interface DataLoadedCallback {
  (row_data : Array<any>) : void;
}

export interface TableDelegate {
  rows       : (callback : DataLoadedCallback) => void;
  columns    : () => Array<ColumnDefinition>;
  pagination : () => PaginationState;
  goTo       : (new_page : number, callback : UpdateCallback) => void;
  sortBy     : (column : ColumnDefinition, callback : UpdateCallback) => void;
  sorting    : () => ColumnDefinition;
}

export interface TableProps {
  delegate : TableDelegate;
}

export type RowTransclusion    = React.ComponentClass<any>;
export type ColumnTransclusion = React.ComponentClass<ColumnProps>;
export type ComposedTable      = React.ComponentClass<TableProps>;
export type ComposedPager      = React.ComponentClass<PaginationProps>;

/* constants */

const TH_CLASS        = "hoctable__column-header";
const TH_CLASS_ACTIVE = "hoctable__column-header--active";

function merge(callbacks : Array<UpdateCallback>) {
  return function exec() {
    for(let i = 0, c = callbacks.length; i < c; i++) callbacks[i]();
  }
}

/* components */

/* DefaultPageButton
 */
export function DefaultPageButton(props : ButtonProps) {
  let {label, handler} = props;
  let class_name = `hoctable-pagination__${label}`;
  return (<div className={class_name}><a onClick={handler}>{label}</a></div>);
}

/* PaginationFactory
 */
export function PaginationFactory(Next = DefaultPageButton, Previous = DefaultPageButton) : ComposedPager {

  class Pagination extends React.Component<PaginationProps, any> {

    constructor(props) {
      super(props);
    }

    render() {
      let {move, pagination} = this.props;
      let {total, size, current} = pagination;
      let update = this.forceUpdate.bind(this);

      if(!total)
        return (<div className="hoctable-pagination--empty"></div>);

      let first = current * size;
      let end   = first + size;

      function go(amt : number) {
        move(current + amt, update);
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

/* ColumnFactory
 */
function ColumnFactory(Transclusion? : ColumnTransclusion) : ColumnTransclusion {

  class ColumnHeader extends React.Component<ColumnProps, any> {

    constructor(props) {
      super(props);
      this.sort = this.sort.bind(this);
    }

    sort() {
      let update = this.forceUpdate.bind(this);
      let {sort, column} = this.props;
      sort(column, update);
    }

    render() {
      let {column, active} = this.props;
      let {name, rel} = column;
      let th_class = TH_CLASS;

      if(active === true)
        th_class += ` ${TH_CLASS_ACTIVE}`;

      let content = <div className="hoctable__cell-inner"><span>{name}</span></div>;

      if(Transclusion)
        content = <Transclusion sort={this.sort} column={column} active={active} />;

      return <th className={th_class} onClick={this.sort}>{content}</th>;
    }

  }

  return ColumnHeader;
}

/* TableFactory
 */
function TableFactory(Row : RowTransclusion, Column? : ColumnTransclusion) : ComposedTable {
  // compose our column component from the column hoc
  let ComposedColumn = ColumnFactory(Column);
  let Pagination     = PaginationFactory();

  class PagedTable extends React.Component<TableProps, any> {
    private bodies  : Array<HTMLElement>;

    constructor(props : TableProps) {
      super(props);
      // prepare an array to hold of the html nodes that we create during our renders
      // so that we can delete them and unmount components later.
      this.bodies = [];
    }

    transclude(table : HTMLElement) {
      let {props, bodies, refs} = this;
      let {delegate} = props;

      if(!table) 
        return;

      let update = this.forceUpdate.bind(this);

      function move(new_page : number, callback : UpdateCallback) {
        let finish = merge([callback, update]);
        delegate.goTo(new_page, finish);
      }

      function render(row_data : Array<any>) : void {
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

        let pagination = delegate.pagination();
        // render the pagination
        ReactDOM.render(<Pagination move={move} pagination={pagination} />, pager);
      }

      delegate.rows(render.bind(this));
    }

    render() {
      // reference the props, proxy and state (which has the total)
      let {delegate} = this.props;

      let sorting  = delegate.sorting();
      let th_list  = [];
      let col_list = [];
      let update   = this.forceUpdate.bind(this);

      function sort(column : ColumnDefinition, callback : UpdateCallback) {
        let finish = merge([callback, update]);
        delegate.sortBy(column, finish);
      }

      // ask the delegate for it's columns looping over and appending both elements to be rendered
      // inside the <thead> as well as <col> elements to place inside the <colgroup> element.
      for(let i = 0, columns = delegate.columns(), c = columns.length; i < c; i++) {
        let column = columns[i];
        let active = column.rel === sorting.rel;

        // add an instance of the composed column component to our cells to render in the <thead>
        th_list.push(<ComposedColumn column={column} key={column.rel} sort={sort} active={active} />);

        // add an instance of a <col> element which we are using to do the styling of the table
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

export default TableFactory;
