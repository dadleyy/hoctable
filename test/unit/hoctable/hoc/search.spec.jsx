const { default: SearchFactory } = require("hoctable/hoc/search");
const { CLASSES, DEBOUNCE_TIME } = require("hoctable/hoc/search");
const helpers = require("test_helpers");
const people = require("fixtures/people");
const React = require("react");
const ReactDOM = require("react-dom");
const Delegate = require("delegates/search");
const Dom = require("dom/search");

describe("hoc/Search test suite", function() {

  let bag = null;
  let dom = null;

  const LOADER_TEXT = "loading";
  const OPTIONS = [
    { name: "cafe bene" },
    { name: "capital one cafe" }
  ];

  class Option extends React.Component {

    componentWillUnmount() {
      bag.callbacks.unmount = (bag.callbacks.unmount || 0) + 1;
    }

    render() {
      const { props } = this;
      const { name } = props.option;

      return (
        <div data-rel="option-item"><p data-rel="option-item-text">{name}</p></div>
      );
    }

  }

  function Loader() {
    return (
      <div data-rel="loader">
        <p>{LOADER_TEXT}</p>
      </div>
    );
  }

  beforeEach(function() {
    bag = { };
    helpers.dom.setup.call(bag);
    dom = Dom(bag);
  });

  afterEach(function() {
    helpers.dom.teardown.call(bag);
  });

  beforeEach(function() {
    bag.spies = { };
    bag.callbacks = { };
  });

  function render() {
    ReactDOM.render(<bag.Search delegate={bag.delegate} />, bag.dom.container);
  }

  describe("with default option transclusion", function() {

    beforeEach(function() {
      bag.callbacks = { };
      bag.Search   = SearchFactory();
      bag.delegate = new Delegate(bag);
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

      describe("having been provided items through the data callback", function() {

        beforeEach(function() {
          bag.items = people.slice(0, 10);
          bag.callbacks.search.callback(bag.items);
        });

        it("should render out items for each element in the array", function() {
          expect(dom.default.items.length).toBe(bag.items.length);
        });

        describe("having clicked one of the rendered items", function() {

          beforeEach(function() {
            const [ first ] = dom.default.items;
            first.click();
          });

          it("should have sent the item to the delegate\'s select function", function() {
            expect(bag.callbacks.select.item.name).toBe(bag.items[0].name);
          });

          describe("having been provided an item from the select callback" , function() {

            beforeEach(function() {
              bag.callbacks.select.callback(bag.callbacks.select.item);
            });

            it("should have closed the popup", function() {
              expect(bag.dom.popups.children.length).toBe(0);
            });

          });

        });

      });

    });

  });

  describe("with custom option transclusion", function() {

    beforeEach(function() {
      bag.Search   = SearchFactory(Option);
      bag.delegate = new Delegate(bag);
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

      describe("having been provided items through the data callback", function() {

        beforeEach(function() {
          bag.items = people.slice(0, 10);
          bag.callbacks.search.callback(bag.items);
        });

        it("should render out items for each element in the array", function() {
          expect(dom.custom.items.length).toBe(bag.items.length);
        });

        it("should unmount the options when the component itself is unmounted", function() {
          expect(bag.callbacks.unmount).toBe(undefined);
          ReactDOM.unmountComponentAtNode(bag.dom.container);
          expect(bag.callbacks.unmount).toBe(bag.items.length);
        });

        describe("having clicked one of the rendered items", function() {

          beforeEach(function() {
            const [ first ] = dom.custom.items;
            first.click();
          });

          it("should have sent the item to the delegate\'s select function", function() {
            expect(bag.callbacks.select.item.name).toBe(bag.items[0].name);
          });

          describe("having been provided an item from the select callback" , function() {

            beforeEach(function() {
              bag.callbacks.select.callback(bag.callbacks.select.item);
            });

            it("should have closed the popup", function() {
              expect(bag.dom.popups.children.length).toBe(0);
            });

          });

        });

      });

    });

  });

});
