const { default: SearchFactory } = require("hoctable/hoc/search");
const { CLASSES, DEBOUNCE_TIME } = require("hoctable/hoc/search");
const helpers = require("test_helpers");
const React = require("react");

describe("hoc/Search test suite", function() {

  const bag = { };
  const LOADER_TEXT = "loading";
  const OPTIONS = [
    { name: "cafe bene" },
    { name: "capital one cafe" }
  ];

  function Option({ option }) {
    const { name } = option;
    return (
      <div data-rel="option-item"><p data-rel="option-item-text">{name}</p></div>
    );
  }

  class Delegate {

    translate(identifier, item) {
      switch(identifier) {
        case "placeholder":
          return "search";
        default:
          return "whoa";
      }
    }

    search(query, callback) {
      bag.callbacks.search = { query, callback };
    }

  }

  function Loader() {
    return (
      <div data-rel="loader">
        <p>{LOADER_TEXT}</p>
      </div>
    );
  }

  const dom = {

    get input() {
      return bag.dom.container.querySelector(`.${CLASSES.INPUT_CONTAINER} input`);
    }

  };

  beforeEach(helpers.dom.setup.bind(bag));
  afterEach(helpers.dom.teardown.bind(bag));

  beforeEach(function() {
    bag.spies = { };
    bag.callbacks = { };
  });

  function render() {
    ReactDOM.render(<bag.Search delegate={bag.delegate} />, bag.dom.container);
  }

  describe("with default button + loader transclusions", function() {

    beforeEach(function() {
      bag.Search   = SearchFactory(Option);
      bag.delegate = new Delegate();
    });

    beforeEach(render);

    it("should render properly", function() {
      expect(dom.input).not.toBe(null);
    });

    describe("when user inputs some text", function() {

      beforeEach(function(done) {
        helpers.keyboard.fill(dom.input, "my search query");
        setTimeout(done, DEBOUNCE_TIME + 10);
      });

      it("should have asked the delegate for the search results", function() {
        expect(bag.callbacks.search.query).toBe("my search query");
      });

    });

  });

});
