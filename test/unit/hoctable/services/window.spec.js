const { default: Viewport } = require("hoctable/services/window");

describe("services/window test suite", function() {

  const bag = { };

  function mouse(type, x, y) {
    let event = document.createEvent("MouseEvents");
    event.initMouseEvent(type, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
    return event;
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

  beforeEach(function() {
    Viewport.bind();
  });

  afterEach(function() {
    Viewport.unbind();
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
      document.dispatchEvent(mouse.down(0,0));
      document.dispatchEvent(mouse.up(0,0));
      document.dispatchEvent(mouse.click(0,0));
      expect(bag.spies.isoclick).toBe(true);
    });

  });

});
