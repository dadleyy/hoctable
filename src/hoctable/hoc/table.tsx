import utils from "hoctable/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";

export interface PaginationState {
  current : number;
  total   : number;
  size    : number;
}

export type UpdateCallback = () => void;
export type DataLoadedCallback = (result : DataResult) => void;

export interface PaginationProps {
  move       : (new_page : number, callback : UpdateCallback) => void;
  pagination : PaginationState;
}

export interface ButtonProps {
  label   : string;
  handler : () => void;
}

export interface ColumnDefinition {
  rel       : string;
  name      : string;
  sortable? : boolean;
  style?    : any;
  classes?  : Array<string>;
}

export interface ColumnFlags {
  active : boolean;
}

export interface ColumnProps {
  sort   : (column : ColumnDefinition, callback : UpdateCallback) => void;
  column : ColumnDefinition;
  flags  : ColumnFlags;
}

export interface DataResult {
  rows : Array<any>;
  total : number;
}

export interface TableDelegate {
  rows    : (pagination : PaginationState, sorting : ColumnDefinition, callback : DataLoadedCallback) => void;
  columns : () => Array<ColumnDefinition>;
}

export interface TableProps {
  delegate   : TableDelegate;
  pagination : PaginationState | null;
  sorting    : ColumnDefinition | null;
}

export type RowTransclusion    = React.ComponentClass<any>;
export type ColumnTransclusion = React.ComponentClass<ColumnProps>;
export type ComposedTable      = React.ComponentClass<TableProps>;
export type ComposedPager      = React.ComponentClass<PaginationProps>;

export const CLASSES = {
  PAGINATION                 : "hoctable__pagination",
  PAGINATION_EMPTY           : "hoctable__pagination--empty",
  PAGINATION_CONTAINER       : "hoctable__table-pagination",
  PAGINATION_CONTROLS        : "hoctable__pagination-controls",
  PAGINATION_NEXT            : "hoctable__pagination-next",
  PAGINATION_PREVIOUS        : "hoctable__pagination-previous",
  PAGINATION_TOTAL           : "hoctable__pagination-total",
  PAGINATION_INFO            : "hoctable__pagination-info",
  TABLE                      : "hoctable__table",
  TABLE_TBODY                : "hoctable__table-tbody",
  TABLE_HEAD                 : "hoctable__table-head",
  TABLE_CONTAINER            : "hoctable__table-container",
  TABLE_HEADER_CELL          : "hoctable__table-header-cell",
  TABLE_HEADER_CELL_ACTIVE   : "hoctable__table-header-cell--active",
  TABLE_HEADER_CELL_SORTABLE : "hoctable__table-header-cell--sortable"
};

// This component is used by the table to handle updating it's pagination references and subsequently re-rendering.
export class Pagination extends React.Component<PaginationProps, any> {

  constructor(props) {
    super(props);
  }

  render() : React.ReactElement<any> {
    const { move, pagination } = this.props;
    const { total, size, current } = pagination;
    const update = this.forceUpdate.bind(this);

    // Do nothing but render out an empty div if we have no pagination information
    if(total >= 1 === false) {
      return (<div className={CLASSES["PAGINATION_EMPTY"]}></div>);
    }

    const first = current * size;
    const end   = first + size;

    function go(amt : number) : void {
      move(current + amt, update);
    }

    function previous() : void {
      return go(-1);
    }

    function next() : void {
      return go(1);
    }

    const buttons = [];

    // If we're no longer on the first page, render our back button
    if(current >= 1) {
      buttons.push(<a className={CLASSES["PAGINATION_PREVIOUS"]} onClick={previous} key="previous">previous</a>);
    }

    /* If we're both able to identify the last index we "would" render, and that index is less than the total amount of
     * items that our delegate told us it has, render our next button.
     */
    if(end && end < total) {
      buttons.push(<a className={CLASSES["PAGINATION_NEXT"]} onClick={next} key="next">next</a>);
    }

    // Calculate the max page if the delegate had a non-zero positive total and we're rendering more than one item.
    const max_page = total >= 1 && size >= 1 ? Math.ceil(total / size) : 0;

    return (
      <div className={CLASSES["PAGINATION"]}>
        <div className={CLASSES["PAGINATION_INFO"]} data-single-page={max_page === 1}>
          <p>page {current + 1} of {max_page} <span className={CLASSES["PAGINATION_TOTAL"]}>({total} results)</span></p>
        </div>
        <div className={CLASSES["PAGINATION_CONTROLS"]}>{buttons}</div>
      </div>
    );
  }
}

/* In order to allow users to _optionally_ provide a column header transclusion, the table delegates the construction
 * of a column header component to this factory.
 */
function ColumnFactory(Transclusion? : ColumnTransclusion) : ColumnTransclusion {

  class ColumnHeader extends React.Component<ColumnProps, any> {

    constructor(props) {
      super(props);
    }

    sort() : void {
      const { sort, column } = this.props;
      const update = this.forceUpdate.bind(this);

      if(column.sortable !== true) {
        return;
      }

      sort(column, update);
    }

    render() : React.ReactElement<any> {
      const { column, flags } = this.props;
      const { name, sortable, classes: user_classes } = column;

      const class_list = (user_classes || []).concat(CLASSES["TABLE_HEADER_CELL"]);

      // If this column's sort relationship matched that of the table, add our table header active class to the ele
      if(flags && flags.active === true) {
        class_list.push(CLASSES["TABLE_HEADER_CELL_ACTIVE"]);
      }

      if(sortable === true) {
        class_list.push(CLASSES["TABLE_HEADER_CELL_SORTABLE"]);
      }

      let content = <div className={CLASSES["TH_CELL"]}><span>{name}</span></div>;

      // If there was user-provided transclusion, replace the content with a new instance of that transclusion.
      if(Transclusion) {
        content = <Transclusion sort={this.sort} column={column} flags={flags} />;
      }

      return <th className={class_list.join(" ")} onClick={this.sort.bind(this)}>{content}</th>;
    }

  }

  return ColumnHeader;
}

/* This factory defines a high order table component that accepts transclusions for both it's row component and it's
 * table header cell component. The table's delegate is relied upon to provide the column definition objects as well
 * as the data that will ultimately be used to render instances of the transcluded row component.
 */
function TableFactory(Row : RowTransclusion, Column? : ColumnTransclusion) : ComposedTable {
  // Create the header cell by transcluding the user-provided component to our column factory
  const HeaderCell = ColumnFactory(Column);

  class PagedTable extends React.Component<TableProps, any> {
    private bodies         : Array<HTMLElement>;
    private render_request : string;

    constructor(props : TableProps) {
      super(props);

      /* Prepare an array to hold of the html nodes that we create during our renders so that we can delete them and
       * unmount components later.
       */
      this.bodies = [ ];

      // If initial sorting + pagination information was provided, update to align w/ that information
      this.state = {
        sorting    : props.sorting || null,
        pagination : props.pagination || { size: 10, current: 0, total: 0 }
      };
    }

    componentWillUnmount() : void {
      this.render_request = null;
    }

    /* During the rendering of the table, it will attempt to assign this function to the table element's 'ref' react
     * property. Once called, this function will attempt to load in the delegate's row data via it's `rows` function
     * and subsequently iterate over each elment, rendering it into place.
     */
    transclude(table : HTMLElement) : void {
      const { props, bodies, refs, state } = this;
      const { sorting, pagination } = state;
      const { delegate } = props;

      if(!table) {
        return;
      }

      const pagination_props = { pagination, move: this.move.bind(this) };
      const current_request = this.render_request = utils.uuid();

      const render = (data : DataResult) : void => {
        const { rows, total } = data;

        const { render_request } = this;

        // Prevent rendering if not latest.
        if(render_request !== current_request) {
          return;
        }

        // Remove the previous pagination component.
        const pager = refs["pager"] as HTMLElement;
        ReactDOM.unmountComponentAtNode(pager);

        // Cleanup previous tbody elements.
        while(bodies.length) {
          const [next] = bodies.splice(0, 1);
          ReactDOM.unmountComponentAtNode(next);
          utils.dom.remove(next);
        }

        /* Iterate over the row data, creating a <tbody> container for them and rendering a new instance of the `Row`
         * transclusion into it; preserving the strict html table hierachy rules.
         */
        for(let i = 0, c = rows.length; i < c; i++) {
          const row  = rows[i];
          const body = utils.dom.create("tbody", null, [CLASSES["TABLE_TBODY"]]);

          ReactDOM.render(<Row row={row} />, body);
          table.appendChild(body);
          bodies.push(body);
        }

        // Update our pagination's reference to the total amount of data (as returned by the delegate)
        pagination.total = total;

        // Render the pagination component
        ReactDOM.render(<Pagination {...pagination_props} />, pager);
      };

      // Start the data source loading
      delegate.rows(pagination, sorting, render);
    }

    move(new_page : number, done : UpdateCallback) : void {
      const { state } = this;
      const pagination = { ...state.pagination, current: new_page };
      this.setState({ pagination });
      done();
    }

    sort(column : ColumnDefinition, done : UpdateCallback) : void {
      const { rel } = column;
      let { sorting } = this.state;
      let { direction } = sorting || { direction: false };

      if(sorting && sorting.rel === rel) {
        direction = !direction;
      }

      sorting = { rel, direction };
      this.setState({ sorting });
      done();
    }

    render() : React.ReactElement<any> {
      const { sorting } = this.state;
      const { delegate } = this.props;
      const head = { cols: [ ], cells: [ ] };

      /* Ask the delegate for it's columns and iterate over each, creating a table header cell and a colgroup <col />
       * element in order to keep the body's column width equal to that of the header's.
       */
      for(let i = 0, columns = delegate.columns(), c = columns.length; i < c; i++) {
        const column = columns[i];
        const active = sorting && column.rel === sorting.rel;
        const flags = { active };

        // Create and insert the column (which may itself have a transclusion).
        head.cells.push(<HeaderCell column={column} key={column.rel} sort={this.sort.bind(this)} flags={flags} />);

        // Create a <col> element for the colgroup with the style (if any) specified on the column object.
        head.cols.push(<col className={column.rel} key={column.rel} style={column.style} />);
      }

      return (
        <div className={CLASSES["TABLE"]}>
          <div className={CLASSES["PAGINATION_CONTAINER"]} ref="pager"></div>
          <div className={CLASSES["TABLE_CONTAINER"]}>
            <table className={CLASSES["TABLE_TABLE"]} ref={this.transclude.bind(this)}>
              <colgroup>{head.cols}</colgroup>
              <thead className={CLASSES["TABLE_HEAD"]}><tr>{head.cells}</tr></thead>
            </table>
          </div>
        </div>
      );
    }

  }

  return PagedTable;
}

export default TableFactory;
