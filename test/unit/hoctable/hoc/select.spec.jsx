const { default: SelectFactory } = require("hoctable/hoc/select");
const { CLASSES }                = require("hoctable/hoc/select");
const { default: Popups }        = require("hoctable/services/popups");
const helpers                    = require("test_helpers");
const React                      = require("react");
const ReactDOM                   = require("react-dom");
const Delegate                   = require("delegates/select");
const Dom                        = require("dom/select");

describe("hoc/Select test suite", function() {

  let bag = null;
  let dom = null;

  const LOADER_TEXT = "loading";
  const OPTIONS = [
    { name: "cafe bene" },
    { name: "capital one cafe" }
  ];

  function Button() { return (<a data-rel="custom-button"></a>); }

  function Option({ option }) {
    const { name } = option;
    return (
      <div data-rel="option-item"><p data-rel="option-item-text">{name}</p></div>
    );
  }

  function Loader() {
    bag.callbacks.loader = (bag.callbacks.loader || 0) + 1;
    return (
      <div data-rel="loader">
        <p>{LOADER_TEXT}</p>
      </div>
    );
  }

  beforeEach(function() {
    const callbacks = { };
    bag = { callbacks };
    dom = Dom(bag);
    helpers.dom.setup.call(bag);
  });

  afterEach(function() {
    helpers.dom.teardown.call(bag);
  });

  function render() {
    ReactDOM.render(<bag.Select delegate={bag.delegate} />, bag.dom.container);
  }

  describe("with default button + loader transclusions", function() {

    beforeEach(function() {
      bag.Select   = SelectFactory(Option);
      bag.delegate = new Delegate(bag);
    });

    it("should not throw an exception when rendering without delegate", function() {
      let error = null;
      try {
        ReactDOM.render(<bag.Select />, bag.dom.container);
      } catch(e) {
        error = e;
      }

      expect(error).toBe(null);
    });

    it("should render the delegate's text into it's button", function() {
      bag.text = "click me";
      render();
      expect(dom.default_button.text).toBe("click me");
    });

    it("should not have rendered a menu body into the popup yet", function() {
      render();
      expect(dom.menu_body).toBe(null);
    });

    describe("having rendered and been opened via click", function() {

      beforeEach(render);

      beforeEach(function() {
        dom.default_button.click();
      });

      it("should render the default loader component", function() {
        expect(dom.default_loader).not.toBe(null);
      });

      describe("having been unmounted before the delegate finishes the callback", function() {

        beforeEach(function() {
          ReactDOM.unmountComponentAtNode(bag.dom.container);
          bag.callbacks.options.callback(OPTIONS);
        });

        it("should be okay", function() {
          expect(dom.options).toBe(null);
        });

      });

      describe("having been sent options via the delegate", function() {

        beforeEach(function() {
          bag.callbacks.options.callback(OPTIONS);
        });

        it("should render out the item components", function() {
          expect(dom.options.length).toBe(2);

          for(let i = 0, c = dom.options.length; i < c; i++) {
            let { innerHTML } = dom.options[i].querySelector("[data-rel=option-item-text]");
            let { name } = OPTIONS[i];
            expect(innerHTML).toBe(name);
          }

        });

        describe("having selected an option via click", function() {

          beforeEach(function() {
            let [ first ] = dom.options;
            first.click();
          });

          it("should have called the \'select\' function on the delegate", function() {
            let { item } = bag.callbacks.select;
            expect(item.name).toBe(OPTIONS[0].name);
          });

          describe("having called the select callback after sending the item", function() {

            it("should now render the item\'s text in the button", function() {
              let { callback, item } = bag.callbacks.select;
              bag.selected_item = item;
              callback();
              expect(dom.default_button.innerHTML).toBe(OPTIONS[0].name);
            });

            it("should have closed the popup", function() {
              let { callback, item } = bag.callbacks.select;
              bag.selected_item = item;
              callback();
              expect(dom.default_button.innerHTML).toBe(OPTIONS[0].name);
              expect(dom.menu_body).toBe(null);
            });

            it("should NOT have closed the popup if the callback", function() {
              let { callback, item } = bag.callbacks.select;
              bag.selected_item = item;
              callback({ remain_open: true });
              expect(dom.default_button.innerHTML).toBe(OPTIONS[0].name);
              expect(dom.menu_body).not.toBe(null);
            });

          });

        });

      });

    });

  });

  describe("with custom button transclusion", function() {

    beforeEach(function() {
      bag.Select   = SelectFactory(Option, Button);
      bag.delegate = new Delegate(bag);
    });

    beforeEach(render);

    it("should render out the custom button", function() {
      expect(dom.custom_button).not.toBe(null);
    });

  });

  describe("with custom loading transclusion", function() {

    beforeEach(function() {
      bag.Select   = SelectFactory(Option, undefined, Loader);
      bag.delegate = new Delegate(bag);
    });

    beforeEach(render);

    it("should render out the loading component while options are loading", function() {
      dom.default_button.click();
      expect(dom.transcluded_loader.firstChild.innerHTML).toBe(LOADER_TEXT);
      expect(dom.default_loader).toBe(null);
    });

    it("should no longer display the loading component after delegate sends options", function() {
      dom.default_button.click();
      expect(dom.transcluded_loader.firstChild.innerHTML).toBe(LOADER_TEXT);
      bag.callbacks.options.callback([{ }]);
      expect(dom.transcluded_loader).toBe(null);
    });

    describe("having been opened via click", function() {

      beforeEach(function() {
        dom.default_button.click();
      });

      describe("having been sent options via the delegate", function() {

        beforeEach(function() {
          bag.callbacks.options.callback(OPTIONS);
        });

        it("should render out the item components", function() {
          expect(dom.options.length).toBe(2);

          for(let i = 0, c = dom.options.length; i < c; i++) {
            let { innerHTML } = dom.options[i].querySelector("[data-rel=option-item-text]");
            let { name } = OPTIONS[i];
            expect(innerHTML).toBe(name);
          }

        });

        describe("having selected an option via click", function() {

          beforeEach(function() {
            let [ first ] = dom.options;
            first.click();
          });

          it("should have called the \'select\' function on the delegate", function() {
            let { item } = bag.callbacks.select;
            expect(item.name).toBe(OPTIONS[0].name);
          });

          describe("having called the select callback after sending the item", function() {

            it("should now render the item\'s text in the button", function() {
              let { callback, item } = bag.callbacks.select;
              bag.selected_item = item;
              callback();
              expect(dom.default_button.innerHTML).toBe(OPTIONS[0].name);
            });

            it("should have closed the popup", function() {
              let { callback, item } = bag.callbacks.select;
              bag.selected_item = item;
              callback();
              expect(dom.default_button.innerHTML).toBe(OPTIONS[0].name);
              expect(dom.menu_body).toBe(null);
            });

            it("should NOT have closed the popup if the callback", function() {
              let { callback, item } = bag.callbacks.select;
              bag.selected_item = item;
              callback({ remain_open: true });
              expect(dom.default_button.innerHTML).toBe(OPTIONS[0].name);
              expect(dom.menu_body).not.toBe(null);
            });

            describe("having remained open after selection", function() {

              beforeEach(function(done) {
                let { callback, item } = bag.callbacks.select;
                bag.selected_item = item;
                expect(bag.callbacks.options.count).toBe(1);
                callback({ remain_open: true });
                setTimeout(done, 200);
              });

              it("should not render the loader again while loading options", function() {
                expect(bag.callbacks.options.count).toBe(2);
                expect(bag.callbacks.loader).toBe(1);
              });

            });

          });

        });

      });
    });

  });

});
