const { default: Wall, CLASSES, DEBOUNCEMENT } = require("hoctable/hoc/wall");
const React = require("react");
const helpers = require("test_helpers");
const people = require("fixtures/people");
const ReactDOM = require("react-dom");

describe("hoc/Wall test suite", function() {

  const bag = { };
  const CYCLE_INTERVAL = 500;
  const FULLSCREEN_DELAY = 100;

  function Preview({ item }) {
    const style = { display: "block", width: "100px", height: "100px" };
    return (<div data-rel="preview-item" style={style}>{item.name}</div>);
  }

  function Card({ item }) {
    return (<div data-rel="card-item">{item.name}</div>);
  }

  class Delegate {

    constructor() {
    }

    items(callback) {
      let { count } = bag.callbacks.items || { count: 0 };
      bag.callbacks.items = { callback, count: ++count };
    }

    interval() {
      return CYCLE_INTERVAL;
    }

    delay() {
      return FULLSCREEN_DELAY;
    }

  }

  let dom = {

    buttons: {

      get enter_fullscreen() {
        return bag.dom.container.querySelector(`.${CLASSES.WALL_CONTROL_IN}`);
      },

      get exit_fullscreen() {
        return bag.dom.container.querySelector(`.${CLASSES.WALL_CONTROL_OUT}`);
      }

    },

    get controls() {
      return bag.dom.container.getElementsByClassName(CLASSES.WALL_CONTROLS);
    },

    get viewport() {
      return bag.dom.container.getElementsByClassName(CLASSES.WALL_VIEWPORT);
    },

    get items() {
      return bag.dom.container.querySelectorAll("[data-rel=preview-item]");
    },

    get highlight() {
      return bag.dom.container.querySelectorAll(`.${CLASSES.WALL_HIGHLIGHT_ITEM}`);
    }

  };

  beforeEach(helpers.dom.setup.bind(bag));
  afterEach(helpers.dom.teardown.bind(bag));

  beforeEach(function() {
    bag.callbacks = { };
    bag.Wall      = Wall(Preview, Card);
    bag.delegate  = new Delegate();
  });

  function render() {
    ReactDOM.render(<bag.Wall delegate={bag.delegate} />, bag.dom.container);
  }

  describe("without valid delegate", function() {

    beforeEach(function() {
      bag.delegate = null;
    });

    it("should throw an exception w/o a delegate", function() {
      let err = null;
      try {
        render();
      } catch(e) { err = e; }
      expect(err).not.toBe(null);
    });

  });

  describe("rendering the wall component", function() {

    beforeEach(render);

    it("should provide the data loaded callback to the delegate in load", function() { 
      expect(typeof bag.callbacks.items.callback).toBe("function");
    });

    it("should render out the controls + viewport", function() { 
      expect(dom.controls.length).toBe(1);
      expect(dom.viewport.length).toBe(1);
    });


    describe("having been provided an array of items via the delegate", function() {

      beforeEach(function() {
        bag.items = people.slice(0, 10);
        bag.callbacks.items.callback(bag.items);
      });

      it("should render out an item component per item in the sent array", function() {
        expect(dom.items.length).toBe(bag.items.length);
      });


      it("should not have rendered out the exit button", function() {
        expect(dom.buttons.exit_fullscreen).toBe(null);
      });

      describe("when user clicks the fullscreen button control", function() {

        function change(evt) {
          bag.fullscreen_event = evt;
          bag.callbacks.fullscreen();
        }

        function errored(evt) {
          bag.fullscreen_event = evt;
          bag.callbacks.fullscreen();
        }

        beforeEach(function(done) {
          bag.fullscreen_event = null
          bag.fullscreen_subscriptions = {
            change: helpers.fullscreen.on("fullscreen:change", change),
            error: helpers.fullscreen.on("fullscreen:error", errored),
          };

          bag.callbacks.fullscreen = function() {
            setTimeout(done, 10);
          };

          dom.buttons.enter_fullscreen.click();
        });

        afterEach(function() {
          let { fullscreen_subscriptions } = bag;
          ReactDOM.unmountComponentAtNode(bag.dom.container);
          helpers.fullscreen.off(fullscreen_subscriptions.change);
          helpers.fullscreen.off(fullscreen_subscriptions.error);
        });

        it("should have attempt to open the element in full screen", function() {
          expect(bag.fullscreen_event).not.toBe(null);
        });

        describe("having waited the fullscreen delay", function() {

          beforeEach(function(done) {
            expect(bag.callbacks.items.count).toBe(1);
            setTimeout(done, FULLSCREEN_DELAY);
          });

          it("should have asked the delegate for items once again", function() {
            expect(bag.callbacks.items.count).toBe(2);
          });

          it("should render out the buttons!", function() {
            expect(dom.buttons.enter_fullscreen).toBe(null);
            expect(dom.buttons.exit_fullscreen).not.toBe(null);
          });

          describe("having been provided w/ items again", function() {

            beforeEach(function(done) {
              bag.callbacks.items.callback(bag.items);
              setTimeout(done, CYCLE_INTERVAL + FULLSCREEN_DELAY);
            });

            it("should have randomly highlighted an item", function() {
              expect(dom.highlight.length).toBe(1);
            });

            describe("having received a mouse over event on an item", function() {

              beforeEach(function(done) {
                const [ first ] = dom.items;
                const { width, height, left, top } = first.getBoundingClientRect();
                helpers.mouse.over(left + (width * 0.5), top + (height * 0.5), first).send();
                setTimeout(done, DEBOUNCEMENT);
              });

              it("should have a highlighted item", function() {
                let [ highlight ] = dom.highlight;
                let { innerHTML: text } = highlight.querySelector("[data-rel=card-item]");
                expect(text).toBe(bag.items[0].name);
              });

            });

          });

        });

      });

    });

  });

});
