const { default: utils } = require("hoctable/utils");

describe("utils test suite", function() {

  describe("uuid generation", function() {

    it("generates a string", function() {
      expect(typeof utils.uuid()).toBe("string");
    });

  });

  describe("create element", function() {

    it("should create an element with the styles and classes provided", function() {
      let element = utils.dom.create("div", { height: "20px" }, ["some-class", "some-other-class"]);
      expect(element.style.height).toBe("20px");
      let { classList: classes } = element;
      expect(classes.contains("some-class")).toBe(true);
      expect(classes.contains("some-other-class")).toBe(true);
    });

  });

  describe("add/remove classes", function() {

    let bag = {};

    beforeEach(function() {
      bag = {};
      bag.container = document.createElement("div");
    });

    it("should not add classes that are already existant", function() {
      utils.dom.classes.add(bag.container, "new-class");
      expect(bag.container.classList.length).toBe(1);
      utils.dom.classes.add(bag.container, "new-class");
      expect(bag.container.classList.length).toBe(1);
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
