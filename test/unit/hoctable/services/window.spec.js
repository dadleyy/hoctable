const { default: Viewport } = require("hoctable/services/window");
const { mouse } = require("test_helpers");

describe("services/window test suite", function() {

  const bag = { };

  beforeEach(Viewport.bind);
  afterEach(Viewport.unbind);


  describe("fullscreen event bindings", function() {

    beforeEach(function() {
      bag.fullscreen_element = document.createElement("div");
      document.body.appendChild(bag.fullscreen_element);
    });

    afterEach(function() {
      document.body.removeChild(bag.fullscreen_element);
      delete bag.fullscreen_element;
    });

    it("should return a boolean when attempting to open an element", function() {
      let result = Viewport.fullscreen.open(bag.fullscreen_element);
      expect(typeof result).toBe("boolean");
    });

    it("should return a boolean when attempting to open null", function() {
      let result = Viewport.fullscreen.open(null);
      expect(typeof result).toBe("boolean");
    });

    it("should return null when attempting to get the current element having not opened anything", function() {
      expect(Viewport.fullscreen.current).toBe(null);
    });

  });

  describe("having been accidentally bound twice", function() {

    beforeEach(Viewport.bind);

    beforeEach(function() {
      bag.clicks = 0;
    });

    function handle() {
      bag.clicks++;
    }

    it("should not be executing listeners twice", function() {
      var a = Viewport.on("click", handle);
      mouse.click(0,0).send();
      expect(bag.clicks).toBe(1);
      Viewport.off(a);
    });

  });

  it("should return a unique id when adding event listeners", function() {
    var a = Viewport.on("click");
    expect(typeof a).toBe("string");
    Viewport.off(a);
  });

  describe("iso click event handlers", function() {

    function handler() {
      bag.spies.isoclick = true;
    }

    beforeEach(function() {
      bag.spies = { isoclick: false };
      bag.listeners = [ Viewport.on("isoclick", handler) ];
    });

    afterEach(function() {
      let [ isoclick ] = bag.listeners;
      Viewport.off(isoclick);
    });

    it("should call the iso click handler when mouse not moved", function() {
      mouse.down(0,0).send();
      mouse.up(0,0).send();
      mouse.click(0,0).send();

      expect(bag.spies.isoclick).toBe(true);
    });

  });

});
