const { default: Viewport } = require("hoctable/services/window");

describe("services/window test suite", function() {

  const bag = { };

  function mouse(type, x, y) {
    let event = document.createEvent("MouseEvents");
    event.initMouseEvent(type, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);

    function send() {
      document.dispatchEvent(event);
    }

    return { event, send };
  }

  mouse.down = function(x, y) {
    return mouse("mousedown", x, y);
  };

  mouse.click = function(x, y) {
    return mouse("click", x, y);
  };

  mouse.up = function(x, y) {
    return mouse("mouseup", x, y);
  };

  beforeEach(Viewport.bind);
  afterEach(Viewport.unbind);

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
