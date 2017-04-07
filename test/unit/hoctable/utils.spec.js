const { default: utils } = require("hoctable/utils");

describe("utils test suite", function() {

  describe("uuid generation", function() {

    it("generates a string", function() {
      expect(typeof utils.uuid()).toBe("string");
    });

  });

  describe("stylize", function() {

    let tag = null;

    function get(property) {
      return tag.style.getPropertyValue(property);
    }

    const properties = {
      get color() {
        return get("color");
      }
    };

    beforeEach(function() {
      tag = document.createElement("div");
    });

    it("should apply styles appropriately", function() {
      expect(properties.color).not.toBe("red");
      utils.dom.stylize(tag, { color: "red" });
      expect(properties.color).toBe("red");
    });

    it("should override styles appropriately", function() {
      tag.style["color"] = "blue";
      expect(properties.color).toBe("blue");
      utils.dom.stylize(tag, { color: "red" });
      expect(properties.color).toBe("red");
    });

  });

  describe("extend", function() {

    it("should override first object w/ new properties from second", function() {
      var a = { name: "danny" };
      var b = { name: "gerry" };
      var r = utils.extend(a, b);
      expect(r.name).toBe("gerry");
      expect(a.name).toBe("danny");
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
