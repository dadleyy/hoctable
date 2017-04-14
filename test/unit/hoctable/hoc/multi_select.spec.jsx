const { default: Factory }        = require("hoctable/hoc/multi_select");
const { CLASSES: SELECT_CLASSES } = require("hoctable/hoc/select");
const { CLASSES, DEBOUNCE_TIME }  = require("hoctable/hoc/multi_select");
const helpers                     = require("test_helpers");
const React                       = require("react");
const Delegate                    = require("delegates/multi_select");
const Dom                         = require("dom/multi_select");

describe("hoc/MultiSelect test suite", function() {

  let bag = null;
  let dom = null;

  function Option({ option }) {
    return (<div data-rel="custom-option"></div>);
  }

  beforeEach(function() {
    const callbacks = { }
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

  describe("default option + button transclusion", function() {

    beforeEach(function() {
      bag.Select   = Factory();
      bag.delegate = new Delegate(bag);
      bag.text = "click me";
      bag.selected = [ ];
      bag.options = [
        { id: 1, text: "first item" },
        { id: 2, text: "second item" }
      ];
    });

    beforeEach(render);

    it("should throw an exception when rendering without delegate", function() {
      let error = null;

      try {
        ReactDOM.render(<bag.Select />, bag.dom.container);
      } catch(e) {
        error = e;
      }

      expect(error === null).toBe(false);
    });

    it("should render the delegate's text into it's button", function() {
      expect(dom.default.button.innerHTML).toBe(bag.text);
    });

    it("should not have rendered the menu body", function() {
      expect(dom.menu_body).toBe(null);
      expect(bag.callbacks.options).toBe(undefined);
    });

    describe("having clicked the default button", function() {

      beforeEach(function() {
        dom.default.button.click();
      });

      it("should now have a menu body element", function() {
        expect(dom.menu_body).not.toBe(null);
      });

      it("should have called the delegate's 'options' function", function() {
        expect(bag.callbacks.options).not.toBe(undefined);
      });

      it("should not have any default options rendered out", function() {
        expect(dom.default.options.length).toBe(0);
      });

      describe("having been unmounted before delegate finishes callback", function() {

        beforeEach(function() {
          ReactDOM.unmountComponentAtNode(bag.dom.container);
          bag.callbacks.options.callback(bag.options);
        });

        it("should be okay", function() {
          expect(bag.dom.container.children.length).toBe(0);
        });

      });

      describe("having been sent options through the callback function w/ none selected", function() {

        beforeEach(function() {
          bag.callbacks.options.callback(bag.options);
        });

        it("should render out the option components", function() {
          expect(dom.default.options.length).toBe(2);
        });

        it("should render out each option's \"translate\" value per delegate", function() {
          let { option_texts } = dom.default;
          let [ first, second ] = option_texts;
          expect(first).toBe(bag.options[0].text);
          expect(second).toBe(bag.options[1].text);
        });

        it("should have no selected option toggles", function() {
          let { selected_toggles } = dom.default;
          expect(selected_toggles.length).toBe(0);
        });

        describe("having clicked one of the un-selected option toggles", function() {

          beforeEach(function() {
            let { toggles } = dom.default;
            let [ first ] = toggles;
            first.click();
          });

          it("should have called the delegate's \'toggle\' function with an item and callback", function() {
            expect(bag.callbacks.toggle.item.id).toBe(1);
            expect(typeof bag.callbacks.toggle.callback).toBe("function");
          });

          describe("having added the item to the selected array and called the callback", function() {

            beforeEach(function() {
              bag.selected = [bag.callbacks.toggle.item.id];
              bag.callbacks.toggle.callback();
              bag.callbacks.options.callback(bag.options);
            });

            it("should now have a single selected toggle", function() {
              let { selected_toggles } = dom.default;
              expect(selected_toggles.length).toBe(1);
            });

          });

        });

      });

      describe("having been sent options through the callback function w/ one selected", function() {

        beforeEach(function() {
          bag.selected = [1];
          bag.callbacks.options.callback(bag.options);
        });

        it("should have a single checked toggle", function() {
          let { selected_toggles } = dom.default;
          expect(selected_toggles.length).toBe(1);
        });

      });

    });

  });

  describe("custom option + default button transclusion", function() {

    beforeEach(function() {
      bag.Select   = Factory(Option);
      bag.delegate = new Delegate(bag);
      bag.text = "click me";
      bag.selected = [ ];
      bag.options = [
        { id: 1, text: "first item" },
        { id: 2, text: "second item" }
      ];
    });

    beforeEach(render);

    it("should throw an exception when rendering without delegate", function() {
      let error = null;

      try {
        ReactDOM.render(<bag.Select />, bag.dom.container);
      } catch(e) {
        error = e;
      }

      expect(error === null).toBe(false);
    });

    it("should render the delegate's text into it's button", function() {
      expect(dom.default.button.innerHTML).toBe(bag.text);
    });

    it("should not have rendered the menu body", function() {
      expect(dom.menu_body).toBe(null);
      expect(bag.callbacks.options).toBe(undefined);
    });

    describe("having clicked the default button", function() {

      beforeEach(function() {
        dom.default.button.click();
      });

      it("should now have a menu body element", function() {
        expect(dom.menu_body).not.toBe(null);
      });

      it("should have called the delegate's 'options' function", function() {
        expect(bag.callbacks.options).not.toBe(undefined);
      });

      it("should not have any default options rendered out", function() {
        expect(dom.custom.options.length).toBe(0);
      });

      describe("having been sent options through the callback function w/ none selected", function() {

        beforeEach(function() {
          bag.callbacks.options.callback(bag.options);
        });

        it("should have rendered out the custom options", function() {
          expect(bag.callbacks.options.count).toBe(1);
          expect(dom.custom.options.length).toBe(2);
        });

 
        describe("when the component is unmounted before the search timeout is done", function() {

          beforeEach(function(done) {
            helpers.keyboard.fill(dom.search_input, "hello world");
            ReactDOM.unmountComponentAtNode(bag.dom.container);
            setTimeout(done, DEBOUNCE_TIME + 100);
          });

          it("should NOT have asked the delegate for items again", function() {
            let { query } = bag.callbacks.options.params;
            expect(bag.callbacks.options.count).toBe(1);
          });

        });

        describe("when the user enters a search query", function() {

          beforeEach(function(done) {
            helpers.keyboard.fill(dom.search_input, "hello world");
            setTimeout(done, DEBOUNCE_TIME + 100);
          });

          it("should have asked the delegate for items again", function() {
            let { query } = bag.callbacks.options.params;
            expect(bag.callbacks.options.count).toBe(2);
            expect(query).toBe("hello world");
          });

        });

        describe("when the user enters multiple search queries within short period of time", function() {

          beforeEach(function(done) {
            dom.search_input.value = "hello world";
            dom.search_input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));

            setTimeout(function() {
              dom.search_input.value = "goodbye";
              dom.search_input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
              setTimeout(done, DEBOUNCE_TIME + 100);
            }, DEBOUNCE_TIME / 2);
          });

          it("should only have asked the delegate for items w/ most recent event", function() {
            let { query } = bag.callbacks.options.params;
            expect(bag.callbacks.options.count).toBe(2);
            expect(query).toBe("goodbye");
          });

        });

      });

    });

  });


});
