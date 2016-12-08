const {default: TableFactory} = require("hoctable/hoc/table");
const {default: Pagination}   = require("hoctable/stores/pagination");
const {default: Sorting}      = require("hoctable/stores/sorting");

describe("hoc/Table component test suite", function() {

  let bag = null;

  class Row extends React.Component {

    constructor(props) {
      super(props);
      bag.rows.push(props);
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

  beforeEach(function() {
    bag = {spies: {}, rows: []};

    bag.container = document.createElement("div");
    bag.Table     = TableFactory(Row);
  });

  afterEach(function() {
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

  describe("using delegate to load in row data", function() {

    class Delegate {

      constructor() {
        this.paging  = new Pagination();
        this.sorting = new Sorting();
      }

      columns() {
        bag.spies.columns = true;
        return [{rel: "name"}, {rel: "age"}];
      }

      rows(callback) {
        callback([{empty: true}], 0);
      }

    }

    beforeEach(function() {
      bag.delegate = new Delegate();
    });

    it("should ask for delegate's columns", function() {
      ReactDOM.render(<bag.Table delegate={bag.delegate} />, bag.container);
      expect(bag.spies.columns).toBe(true);
    });

    it("should render out the transcluded row component", function() {
      ReactDOM.render(<bag.Table delegate={bag.delegate} />, bag.container);
      expect(bag.container.getElementsByClassName("test-row").length).toBe(1);
    });

  });

});
