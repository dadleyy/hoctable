const {default: utils} = require("hoctable/utils");

describe("utils test suite", function() {

  describe("uuid generation", function() {

    it("generates a string", function() {
      expect(typeof utils.uuid()).toBe("string");
    });

  });

  describe("add/remove classes", function() {

    let bag = {};

    beforeEach(function() {
      bag = {};
      bag.container = document.createElement("div");
    });

    it("should add classes that are non-existant", function() {
      utils.dom.classes.add(bag.container, "new-class");
      expect(bag.container.className).toBe("new-class");
    });

    it("should remove classes that are existant", function() {
      utils.dom.classes.add(bag.container, "new-class");
      utils.dom.classes.remove(bag.container, "new-class");
      expect(bag.container.className).toBe("");
    });

  });

});
