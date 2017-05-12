import utils from "hoctable/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  UpdateCallback,
  PaginationState,
  DataLoadedCallback,
  PaginationProps,
  ButtonProps,
  ColumnDefinition,
  ColumnFlags,
  ColumnProps,
  DataResult,
  TableDelegate,
  TableProps,
  RowTransclusion,
  ColumnTransclusion,
  ComposedTable,
  Pagination
} from "hoctable/hoc/table";

export const CLASSES = {
  GRID                     : "hoctable__grid",
  GRID_HEAD                : "hoctable__grid-head",
  GRID_CONTAINER           : "hoctable__grid-container",
  GRID_ROW_CONTAINER       : "hoctable__grid-row-container",
  GRID_COLUMN_HEAD         : "hoctable__grid-header-cell",
  GRID_COLUMN_HEAD_ACTIVE  : "hoctable__grid-header-cell--active",
  GRID_COLUMN_HEAD_CONTENT : "hoctable__grid-header-cell-content"
};

function ColumnFactory(Transclusion? : ColumnTransclusion) : ColumnTransclusion {

  class ColumnHeader extends React.Component<ColumnProps, any> {

    constructor(props) {
      super(props);
    }

    sort() : void {
      const { sort, column } = this.props;
      const update = this.forceUpdate.bind(this);

      if(column.sortable === false) {
        return;
      }

      sort(column, update);
    }

    render() : React.ReactElement<any> {
      const { column, flags } = this.props;
      const { name, rel } = column;

      const header_class = CLASSES["GRID_COLUMN_HEAD"];
      const active_class = CLASSES["GRID_COLUMN_HEAD_ACTIVE"];
      const class_name = flags && flags.active === true ? `${header_class} ${active_class}` : header_class;

      let content = <div className={CLASSES["GRID_COLUMN_HEAD_CONTENT"]}><span>{name}</span></div>;

      // If there was user-provided transclusion, replace the content with a new instance of that transclusion.
      if(Transclusion) {
        content = <Transclusion sort={this.sort} column={column} flags={flags} />;
      }

      return <div className={class_name} onClick={this.sort.bind(this)}>{content}</div>;
    }

  }

  return ColumnHeader;
}

function GridFactory(Row : RowTransclusion, Column? : ColumnTransclusion) : ComposedTable {
  // Create the header cell by transcluding the user-provided component to our column factory
  const HeaderCell = ColumnFactory(Column);

  class PagedGrid extends React.Component<TableProps, any> {
    private bodies         : Array<HTMLElement>;
    private pagination     : PaginationState;
    private sorting        : ColumnDefinition | null;
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
          const body = utils.dom.create("div", null, [CLASSES["GRID_ROW_CONTAINER"]]);

          ReactDOM.render(<Row row={row} />, body);
          table.appendChild(body);
          bodies.push(body);
        }

        // Update our pagination's reference to the total amount of data (as returned by the delegate)
        pagination.total = total;

        // Render the pagination component
        ReactDOM.render(<Pagination {...pagination_props} />, pager);
      };

      const current_request = this.render_request = utils.uuid();

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
      const { sorting, pagination } = this.state;
      const { delegate } = this.props;
      const column_headers = [ ];

      /* Ask the delegate for it's columns and iterate over each, creating a table header cell and a colgroup <col />
       * element in order to keep the body's column width equal to that of the header's.
       */
      for(let i = 0, columns = delegate.columns(), c = columns.length; i < c; i++) {
        const column = columns[i];
        const active = sorting && column.rel === sorting.rel;
        const flags = { active };

        // Create and insert the column (which may itself have a transclusion).
        column_headers.push(<HeaderCell column={column} key={column.rel} sort={this.sort.bind(this)} flags={flags} />);
      }

      return (
        <div className={CLASSES["GRID"]}>
          <div className={CLASSES["PAGINATION_CONTAINER"]} ref="pager"></div>
          <div className={CLASSES["GRID_CONTAINER"]}>
            <div className={CLASSES["GRID_HEAD"]}>{column_headers}</div>
            <div className={CLASSES["GRID_GRID"]} ref={this.transclude.bind(this)} />
          </div>
        </div>
      );
    }

  }

  return PagedGrid;
}

export default GridFactory;
