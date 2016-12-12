const {default: Popups} = require("hoctable/services/popups");

describe("services/popups test suite", function() {

  let bag = {};

  it("should return -1 if the serivce has not yet been mounted", function() {
    let placement = {};
    let id = Popups.open(<div></div>, placement);
    expect(id).toBe(-1);
  });

  describe("after user has mounted the service", function() {

    beforeEach(function() {
      bag = {};
      bag.container = document.createElement("div");
      bag.container.setAttribute("class", "popups");
      document.body.appendChild(bag.container);
      Popups.mount(bag.container);
    });

    afterEach(function() {
      Popups.unmount();
      document.body.removeChild(bag.container);
    });

    it("should return a string when opening new popups", function() {
      let id = Popups.open(<div></div>, {top: 0, left: 0});
      expect(typeof id).toBe("string");
    });

  });

});
