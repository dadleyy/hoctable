const {default: Viewport}      = require("hoctable/services/window");
const {default: Popups}        = require("hoctable/services/popups");
const {default: SelectFactory} = require("hoctable/hoc/multi_select");
const React                    = require("react");

describe("hoc/MultiSelect test suite", function() {

  let bag = {};

  class Option extends React.Component {

    constructor(props) {
      super(props);
      bag.options.push(props);
    }

    render() {
      return (
        <div className="custom-option">
        </div>
      );
    }

  }

  class Delegate {

    text() {
      bag.spies.text = true;
      return bag.text;
    }

    options() {
      return bag.options;
    }

  }

  beforeEach(function() {
    bag = {spies: {}, options: []};

    bag.container = document.createElement("div");
    bag.popups    = document.createElement("div");

    document.body.appendChild(bag.popups);
    document.body.appendChild(bag.container);

    Popups.mount(bag.popups);
    Viewport.bind();
  });

  afterEach(function() {
    Popups.unmount();
    document.body.removeChild(bag.popups);
    document.body.removeChild(bag.container);
  });


  describe("default button transclusion", function() {

    beforeEach(function() {
      bag.Select   = SelectFactory(Option);
      bag.delegate = new Delegate();
    });

    it("should throw an exception when rendering without delegate", function() {
      let error = null;

      try {
        ReactDOM.render(<bag.Select />, bag.container);
      } catch(e) {
        error = e;
      }

      expect(error === null).toBe(false);
    });

    function render() {
      ReactDOM.render(<bag.Select delegate={bag.delegate} />, bag.container);
    }

    it("should NOT have called the delegate's \"options\" function", function() {
      render();
      expect(bag.spies.options).toBe(undefined);
    });

    it("should have called the delegate's \"text\" function", function() {
      render();
      expect(bag.spies.text).toBe(true);
    });

    it("should render the delegate's text into it's button", function() {
      bag.text = "click me";
      render();
      let anchor = bag.container.getElementsByTagName("a");
      expect(anchor.length).toBe(1);
      expect(anchor[0].text).toBe("click me");
    });

  });

});
