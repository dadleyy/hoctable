const { default: Factory }        = require("hoctable/hoc/multi_select");
const { CLASSES: SELECT_CLASSES } = require("hoctable/hoc/select");
const { CLASSES, DEBOUNCE_TIME }  = require("hoctable/hoc/multi_select");
const helpers                     = require("test_helpers");
const React                       = require("react");

describe("hoc/MultiSelect test suite", function() {

  let bag = { };

  function Option({ option }) {
    return (<div data-rel="custom-option"></div>);
  }

  class Delegate {

    text() {
      return bag.text;
    }

    options(params, callback) {
      let { count } = bag.callbacks.options || { count: 0 };
      bag.callbacks.options = { callback, params, count: ++count };
    }

    isSelected(item) {
      return bag.selected.indexOf(item.id) !== -1;
    }

    translate(identifier, item) {
      return item ? item.text : "placeholder";
    }

    toggle(item, callback) {
      bag.callbacks.toggle = { item, callback };
    }

  }

  const dom = {

    get menu_body() {
      return bag.dom.popups.querySelector(`.${CLASSES.MULTISELECT}`);
    },

    get search_input() {
      return bag.dom.popups.querySelector(`.${CLASSES.MULTISELECT_SEARCH} input`);
    },

    custom: {

      get options() {
        return bag.dom.popups.querySelectorAll("[data-rel=custom-option]");
      },

    },

    default: {

      get button() {
        return bag.dom.container.querySelector(`.${SELECT_CLASSES.SELECT_BUTTON}`);
      },

      get options() {
        return bag.dom.popups.querySelectorAll(`.${CLASSES.MULTISELECT_ITEM}`);
      },

      get option_texts() {
        let { options } = dom.default;
        let texts = [ ];

        for(let i = 0, c = options.length; i < c; i++) {
          let { firstChild } = options[i].querySelector(`.${CLASSES.MULTISELECT_ITEM_TEXT}`);
          texts.push(firstChild.innerHTML);
        }

        return texts;
      },

      get toggles() {
        let { menu_body } = dom;
        return menu_body.querySelectorAll(`.${CLASSES.MULTISELECT_ITEM_TOGGLE} input`);
      },

      get selected_toggles() {
        let { menu_body } = dom;
        return menu_body.querySelectorAll(`.${CLASSES.MULTISELECT_ITEM_TOGGLE} input:checked`);
      }

    }

  };

  beforeEach(helpers.dom.setup.bind(bag));
  afterEach(helpers.dom.teardown.bind(bag));

  beforeEach(function() {
    bag.callbacks = { };
  });

  function render() {
    ReactDOM.render(<bag.Select delegate={bag.delegate} />, bag.dom.container);
  }

  describe("default option + button transclusion", function() {

    beforeEach(function() {
      bag.Select   = Factory();
      bag.delegate = new Delegate();
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
      bag.delegate = new Delegate();
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

        describe("when the user enters a search query", function() {

          beforeEach(function(done) {
            dom.search_input.value = "hello world";
            dom.search_input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            setTimeout(done, DEBOUNCE_TIME + 100);
          });

          it("should have asked the delegate for items again", function() {
            let { query } = bag.callbacks.options.params;
            expect(bag.callbacks.options.count).toBe(2);
            expect(query).toBe("hello world");
          });

        });

      });

    });

  });


});
