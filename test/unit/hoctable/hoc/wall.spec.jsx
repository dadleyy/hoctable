const {default: Wall, CLASSES} = require("hoctable/hoc/wall");
const React = require("react");

describe("hoc/Wall test suite", function() {

  let bag = {};

  class Preview extends React.Component {
  }

  class Card extends React.Component {
  }

  class Delegate {

    constructor() {
    }

    items(callback) {
      bag.spies.items = true;
      bag.items(callback);
    }

  }

  let dom = {

    get controls() {
      return bag.container.getElementsByClassName(CLASSES.WALL_CONTROLS);
    },

    get viewport() {
      return bag.container.getElementsByClassName(CLASSES.WALL_VIEWPORT);
    }

  };

  beforeEach(function() {
    bag = {
      spies : { }, 
      store : { items: [] }
    };

    bag.items = function(callback) {
      callback(bag.store.items);
    };

    bag.container = document.createElement("div");
    bag.Wall      = Wall(Preview, Card);
    bag.delegate  = new Delegate();

    document.body.appendChild(bag.container);
  });

  afterEach(function() {
    document.body.removeChild(bag.container);
  });

  function render() {
    ReactDOM.render(<bag.Wall delegate={bag.delegate} />, bag.container);
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
      expect(err === null).toBe(false);
    });

  });

  it("should provide the data loaded callback to the delegate in load", function() { 
    let cb = null;
    bag.items = function(c) { cb = c; };
    render();
    expect(typeof cb === "function").toBe(true);
  });

  it("should render out the controls + viewport", function() { 
    expect(dom.controls.length).toBe(0);
    expect(dom.viewport.length).toBe(0);
    render();
    expect(dom.controls.length).toBe(1);
    expect(dom.viewport.length).toBe(1);
  });


});
