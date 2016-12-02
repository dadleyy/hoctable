import PaginationFactory from "hoc/pagination";
import {PaginationDelegate, PaginationState} from "hoc/pagination";

import utils from "utils";

export declare interface ColumnDefinition {
  rel    : string;
  name   : string;
  style? : any;
}

export declare interface ColumnDelegate {
  sort     : (column : ColumnDefinition) => void;
  isActive : (column : ColumnDefinition) => boolean;
}

export declare interface ColumnContentProps {
  column: ColumnDefinition;
}

export declare interface ColumnProps {
  delegate : ColumnDelegate;
  column   : ColumnDefinition;
}

export declare interface DataLoadedCallback {
  (row_data : Array<any>, total : number) : void;
}

export declare interface TableDelegate {
  rows       : (callback : DataLoadedCallback) => void;
  columns    : () => Array<ColumnDefinition>;
  sorting    : (column : ColumnDefinition) => boolean;
  pagination : () => PaginationState;
  goTo       : (new_page : number) => void;
  sort       : (column : ColumnDefinition) => void;
}

export declare interface TableProps {
  delegate : TableDelegate;
}

export declare interface TableProxies {
  pagination : PaginationDelegate;
  sorting    : ColumnDelegate;
}

type RowTransclusion = React.ComponentClass<any>;
type ColTransclusion = React.StatelessComponent<any>;
type ComposedTable   = React.ComponentClass<TableProps>;

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

      // creaete the pagination proxy
      let pagination = {

        pagination() {
          return delegate.pagination();
        },

        goTo(new_page) {
          delegate.goTo(new_page);
          update();
        }

      };

      // create the sorting proxy
      let sorting = {

        sort(column) {
          props.delegate.sort(column);
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
