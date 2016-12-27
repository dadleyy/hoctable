const {default: TableFactory, CLASSES} = require("hoctable/hoc/table");

describe("hoc/Table component test suite", function() {

  const TEST_COLUMNS = [
    {rel: "alpha", name: "alpha column"},
    {rel: "beta", name: "beta column"},
    {rel: "gamma", name: "gamma column"}
  ];

  const TEST_ROWS = [
    {name: "danny", favorite_language: "go"},
  ];

  let bag = null;

  class Row extends React.Component {

    constructor(props) {
      super(props);
      bag.rendered.rows.push(props);
    }

    render() {
      let {row} = this.props;

      if(row.empty)
        return (<tr className="test-row"><td>no results</td></tr>);

      return (
        <tr className="test-row">
          <td>{row.content}</td>
        </tr>
      );
    }

  }

  class Delegate {

    constructor() {
    }

    pagination() {
      bag.spies.pagination = true;
      return bag.pagination;
    }

    sorting() {
      bag.spies.sorting = true;
      return bag.sorting;
    }

    columns() {
      bag.spies.columns = true;
      return bag.columns;
    }

    rows(callback) {
      bag.spies.rows = true;
      bag.rows(callback);
    }

  }

  class View extends React.Component {

    constructor(props) {
      super(props);
      bag.update = this.forceUpdate.bind(this);
    }

    render() {
      return (<div><bag.Table delegate={bag.delegate} /></div>);
    }

  }

  function render() {
    ReactDOM.render(<View />, bag.container);
  }

  let dom = {

    get pagination() {
      let [pagination] = bag.container.getElementsByClassName(CLASSES.PAGINATION_CONTAINER);
      return pagination;
    },

    get pagination_empty() {
      return dom.pagination.getElementsByClassName(CLASSES.PAGINATION_EMPTY);
    },

    get pagination_previous() {
      return dom.pagination.getElementsByClassName(CLASSES.PAGINATION_PREVIOUS);
    },

    get pagination_next() {
      return dom.pagination.getElementsByClassName(CLASSES.PAGINATION_NEXT);
    },

    get active_th() {
      let [thead]  = bag.container.getElementsByTagName("thead");
      let [active] = thead.getElementsByClassName(CLASSES.TH_CLASS_ACTIVE);
      return active;
    },

    get rows() {
      return bag.container.getElementsByTagName("tbody");
    },

    get active_th_html() {
      let {active_th} = dom;
      let [span] = active_th.getElementsByTagName("span");
      return span.innerHTML;
    }

  };

  describe("basic use: simple row transclusion w/ default column", function() {

    beforeEach(function() {
      let rendered = {rows: []};
      bag = {spies: {}, rows: [], rendered};

      bag.container = document.createElement("div");
      bag.Table     = TableFactory(Row);
      bag.delegate  = new Delegate();
      bag.columns   = TEST_COLUMNS.slice(0);
      bag.rows      = function(callback) { callback([{name: "danny"}]); }

      bag.sorting    = {};
      bag.pagination = {total: 0, size: 10, current: 0};

    });

    it("should throw an exception when used without a delegate", function() {
      let error = null;

      try {
        ReactDOM.render(<bag.Table />, bag.container);
      } catch(e) {
        error = e;
      }

      expect(error === null).toBe(false);
    });

    it("should have called the delegate\'s \"columns\" function after rendering", function() {
      expect(bag.spies.columns).toBe(undefined);
      render();
      expect(bag.spies.columns).toBe(true);
    });

    it("should have called the delegate\'s \"rows\" function after rendering", function() {
      expect(bag.spies.rows).toBe(undefined);
      render();
      expect(bag.spies.rows).toBe(true);
    });

    it("should have called the delegate\'s \"sorting\" function after rendering", function() {
      expect(bag.spies.sorting).toBe(undefined);
      render();
      expect(bag.spies.sorting).toBe(true);
    });

    it("should have called the delegate\'s \"pagination\" function after rendering", function() {
      expect(bag.spies.pagination).toBe(undefined);
      render();
      expect(bag.spies.pagination).toBe(true);
    });

    it("should render out a colgroup w/ cols to match the returned columns", function() {
      render();
      let [colgroup] = bag.container.getElementsByTagName("colgroup");
      expect(colgroup.childNodes.length).toBe(3);
    });

    it("should render out a thead w/ th elements to match the returned columns", function() {
      render();
      let thead = bag.container.getElementsByTagName("thead");
      expect(thead.length).toBe(1);
      let cells = thead[0].getElementsByTagName("th");
      expect(cells.length).toBe(3);

      for(let i = 0, c = bag.columns.length; i < c; i++) {
        let column = bag.columns[i];
        let cell   = cells[i];
        let [span] = cell.getElementsByTagName("span");
        expect(span.innerHTML).toBe(column.name);
      }
    });

    it("should render out a th element with an active class based on \"sorting\"", function() {
      bag.sorting = {rel: TEST_COLUMNS[1].rel};
      render();

      expect(dom.active_th_html).toBe(TEST_COLUMNS[1].name);

      bag.sorting = {rel: TEST_COLUMNS[0].rel};
      bag.update();

      expect(dom.active_th_html).toBe(TEST_COLUMNS[0].name);
    });

    it("should render out an empty pagination when total is 0", function() {
      let cb = null;
      bag.rows = function(callback) { cb = callback; }
      bag.pagination = {total: 0};
      render();
      expect(dom.pagination_empty.length).toBe(0);
      cb([]);
      expect(dom.pagination_empty.length).toBe(1);
    });

    it("should render a \"next\" but not \"previous\" button when on first page", function() {
      bag.pagination = {total: 50, size: 10, current: 0};
      render();
      expect(dom.pagination_next.length).toBe(1);
      expect(dom.pagination_previous.length).toBe(0);
    });

    it("should render out both \"next\" and \"previous\" button when not on first or last page", function() {
      bag.pagination = {total: 50, size: 10, current: 1};
      render();
      expect(dom.pagination_next.length).toBe(1);
      expect(dom.pagination_previous.length).toBe(1);
    });

    it("should render out \"previous\" but not \"next\" button when on last page", function() {
      bag.pagination = {total: 50, size: 10, current: 4};
      render();
      expect(dom.pagination_next.length).toBe(0);
      expect(dom.pagination_previous.length).toBe(1);
    });

    it("should render out the transcluded for every row data object sent into the callback", function() {
      let called = 0;
      let items  = [{}];

      bag.rows = function(cb) { 
        called++;
        cb(items);
      }

      render();
      expect(dom.rows.length).toBe(1);
      expect(called).toBe(1);

      items.push({});

      bag.update();
      expect(dom.rows.length).toBe(2);
      expect(called).toBe(2);
    });

  });

});
