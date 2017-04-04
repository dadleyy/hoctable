const { default: Wall, CLASSES } = require("hoctable/hoc/wall");
const React = require("react");
const helpers = require("test_helpers");
const people = require("fixtures/people");

describe("hoc/Wall test suite", function() {

  const bag = { };

  function Preview(props) {
    return (<div data-rel="preview-item"></div>);
  }

  function Card(props) {
    return (<div data-rel="card-item"></div>);
  }

  class Delegate {

    constructor() {
    }

    items(callback) {
      bag.callbacks.items = callback;
    }

  }

  let dom = {

    get controls() {
      return bag.dom.container.getElementsByClassName(CLASSES.WALL_CONTROLS);
    },

    get viewport() {
      return bag.dom.container.getElementsByClassName(CLASSES.WALL_VIEWPORT);
    },

    get items() {
      return bag.dom.container.querySelectorAll("[data-rel=preview-item]");
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
      expect(typeof bag.callbacks.items).toBe("function");
    });

    it("should render out the controls + viewport", function() { 
      expect(dom.controls.length).toBe(1);
      expect(dom.viewport.length).toBe(1);
    });


    describe("having been provided an array of items via the delegate", function() {

      beforeEach(function() {
        bag.items = people.splice(0, 10);
        bag.callbacks.items(bag.items);
      });

      it("should render out an item component per item in the sent array", function() {
        expect(dom.items.length).toBe(bag.items.length);
      });

    });

  });


});
