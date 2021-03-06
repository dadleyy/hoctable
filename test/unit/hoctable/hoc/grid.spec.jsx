const { default: GridFactory, CLASSES } = require("hoctable/hoc/grid");
const helpers = require("test_helpers");
const people = require("fixtures/people");
const Delegate = require("delegates/table");
const Dom = require("dom/grid");

describe("hoc/Grid component test suite", function() {

  const TEST_COLUMNS = [
    {rel: "alpha", name: "alpha column", sortable: true},
    {rel: "beta", name: "beta column", classes: [Dom.classes.CUSTOM_COLUMN_CLASS]},
    {rel: "gamma", name: "gamma column"}
  ];

  let bag = null;
  let dom = null;

  function Row({ row }) {
    if(row.empty) {
      return (<div data-rel="empty-test-row"><span>no results</span></div>);
    }

    return (
      <div data-rel="test-row">
        <div>{row.content}</div>
      </div>
    );
  }

  function Column({ column }) {
    return (
      <div data-rel="test-column-inner" className={Dom.classes.CUSTOM_COLUMN_TRANSCLUSION_CLASS}>
        <p>{column.name}</p>
      </div>
    );
  }

  class View extends React.Component {

    constructor(props) {
      super(props);
      bag.update = this.forceUpdate.bind(this);
    }

    render() {
      return (
        <div>
          <bag.Grid sorting={bag.sorting} pagination={bag.pagination} delegate={bag.delegate} />
        </div>
      );
    }

  }

  function render() {
    ReactDOM.render(<View />, bag.dom.container);
  }

  beforeEach(function() {
    const callbacks = { };
    bag = { callbacks };
    dom = Dom(bag);

    bag.pagination = null;
    bag.sorting = null;
    bag.columns = TEST_COLUMNS;
    helpers.dom.setup.call(bag)
  });

  afterEach(function() {
    helpers.dom.teardown.call(bag)
  });

  describe("custom row transclusion + default column", function() {

    beforeEach(function() {
      bag.Grid = GridFactory(Row);
      bag.delegate = new Delegate(bag);
    });

    it("should not have rendered out the pagination quite yet", function() {
      expect(dom.pagination.container).toBe(null);
    });

    describe("having a default sorting provided", function() {

      beforeEach(function() {
        bag.sorting = { rel: "alpha" };
      });

      beforeEach(render);

      it("should have rendered an active table header", function() {
        let { active_columns } = dom.default;
        expect(active_columns.length).toBe(1);
        let [ first ] = active_columns;
        let { innerHTML } = first.querySelector("span");
        expect(innerHTML).toBe(TEST_COLUMNS[0].name);
      });

      it("should have provided the sorting information to the row callback", function() {
        expect(bag.callbacks.rows.sorting.rel).toBe("alpha");
      });

    });

    describe("having a default pagination provided", function() {

      beforeEach(function() {
        bag.pagination = { current: 2, size: 20 };
      });

      beforeEach(render);

      it("should have provided the delgate with correct data into the row data callback", function() {
        expect(bag.callbacks.rows.pagination.current).toBe(2);
        expect(bag.callbacks.rows.pagination.size).toBe(20);
        expect(bag.callbacks.rows.sorting).toBe(null);
      });

    });

    describe("having been provided row data by the delegate w/ no total", function() {

      beforeEach(function() {
        bag.pagination = { current: 0, size: 5 };
      });

      beforeEach(render);

      beforeEach(function() {
        let rows = [ ];
        bag.callbacks.rows.callback({ rows, total: 0 });
      });

      it("should have not rendered the pagination component", function() {
        expect(dom.pagination.container).toBe(null);
      });

      it("should have rendered out exactly one sortable column", function() {
        const { sortable_columns } = dom;
        expect(sortable_columns.length).toBe(1);
      });

    });

    describe("having been unmounted before delegate finishes row data loading", function() {

      beforeEach(render);

      beforeEach(function() {
        const rows = people.slice(0, 5);
        ReactDOM.unmountComponentAtNode(bag.dom.container);
        bag.callbacks.rows.callback({ rows, total: 5 });
      });

      it("should not try rendering the items", function() {
        expect(bag.dom.container.children.length).toBe(0);
      });

    });

    describe("having been provided row data by the delegate w/ a single page of data on page 0", function() {

      beforeEach(function() {
        bag.pagination = { current: 0, size: 5 };
      });

      beforeEach(render);

      beforeEach(function() {
        let rows = people.slice(0, 5);
        bag.callbacks.rows.callback({ rows, total: 5 });
      });

      it("should have rendered the pagination component", function() {
        expect(dom.pagination.container).not.toBe(null);
      });

      it("should not have rendered out any pagination actions", function() {
        expect(dom.pagination.next).toBe(null);
        expect(dom.pagination.previous).toBe(null);
      });

      it("should have rendered out all 5 rows using the row container", function() {
        const { rows } = dom;
        expect(rows.length).toBe(5);
      });

    });

    describe("having been provided row data by the delegate w/ a two pages of data on page 0", function() {

      beforeEach(function() {
        bag.pagination = { current: 0, size: 5 };
      });

      beforeEach(render);

      beforeEach(function() {
        let rows = people.slice(0, 5);
        bag.callbacks.rows.callback({ rows, total: 10 });
      });

      it("should have rendered the pagination component", function() {
        expect(dom.pagination.container).not.toBe(null);
      });

      it("should not have rendered out any pagination actions", function() {
        expect(dom.pagination.next).not.toBe(null);
        expect(dom.pagination.previous).toBe(null);
      });

    });

    describe("having been provided row data by the delegate w/ a two pages of data on page 1", function() {

      beforeEach(function() {
        bag.pagination = { current: 1, size: 5 };
      });

      beforeEach(render);

      beforeEach(function() {
        let rows = people.slice(0, 5);
        bag.callbacks.rows.callback({ rows, total: 10 });
      });

      it("should have rendered the pagination component", function() {
        expect(dom.pagination.container).not.toBe(null);
      });

      it("should not have rendered out any pagination actions", function() {
        expect(dom.pagination.next).toBe(null);
        expect(dom.pagination.previous).not.toBe(null);
      });

    });

    describe("having been provided row data by the delegate w/ a three pages of data on page 1", function() {

      beforeEach(function() {
        bag.pagination = { current: 1, size: 5 };
      });

      beforeEach(render);

      beforeEach(function() {
        let rows = people.slice(0, 5);
        expect(bag.callbacks.rows.pagination.current).toBe(1);
        expect(bag.callbacks.rows.sorting).toBe(null);
        bag.callbacks.rows.callback({ rows, total: 15 });
      });

      it("should have rendered the pagination component", function() {
        expect(dom.pagination.container).not.toBe(null);
      });

      it("should not have rendered out any pagination actions", function() {
        expect(dom.pagination.next).not.toBe(null);
        expect(dom.pagination.previous).not.toBe(null);
      });

      it("renders the columns", function() {
        const { columns } = dom;
        expect(columns.length).toBe(3);
      });

      it("renders the custom classes on columns", function() {
        const { custom_class_column: columns } = dom;
        expect(columns.length).toBe(1);
      });

      describe("when user clicks a non-sortable column", function() {

        beforeEach(function() {
          const [ column ] = dom.non_sortable_columns;
          column.click();
        });

        it("should have called the rows function again w/ the new sorting info", function() {
          expect(bag.callbacks.rows.sorting).toBe(null);
        });

      });

      describe("when user clicks a sortable column", function() {

        beforeEach(function() {
          let [ first ] = dom.sortable_columns;
          first.click();
        });

        it("should have called the rows function again w/ the new sorting info", function() {
          expect(bag.callbacks.rows.sorting.rel).toBe(TEST_COLUMNS[0].rel);
          expect(bag.callbacks.rows.sorting.direction).toBe(false);
        });

        describe("when user clicks the same column again", function() {

          beforeEach(function() {
            let rows = people.slice(0, 5);
            bag.callbacks.rows.callback({ rows, total: 15 });
            let [ first ] = dom.default.columns;
            first.click();
          });

          it("should have swapped the direction", function() {
            expect(bag.callbacks.rows.sorting.direction).toBe(true);
          });

        });

      });

      describe("when user clicked the previous button", function() {

        beforeEach(function() {
          dom.pagination.previous.click();
        });

        it("should have called the rows function again w/ the new page", function() {
          let { rows: row_callback } = bag.callbacks;
          expect(row_callback.pagination.current).toBe(0);
        });

      });

      describe("when user clicked the next button", function() {

        beforeEach(function() {
          dom.pagination.next.click();
        });

        it("should have called the rows function again w/ the new page", function() {
          let { rows: row_callback } = bag.callbacks;
          expect(row_callback.pagination.current).toBe(2);
        });

      });

    });

  });

  describe("custom row transclusion + default column", function() {

    beforeEach(function() {
      bag.Grid = GridFactory(Row, Column);
      bag.delegate = new Delegate(bag);
    });

    beforeEach(render);

    it("renders the transcluded content", function() {
      const { columns } = dom.custom;
      expect(columns.length).toBe(3);
    });

  });

});
