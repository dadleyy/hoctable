const events = require("../../src/event_engine");

describe("events test suite", function() {

  it("should return -1 when given anything other than a function", function() {
    let evts   = new events.default();
    let called = false;
    let id     = evts.on("something", null);
    expect(id).toBe(-1);
  });

  it("should return -1 when given anything other than a function", function() {
    let evts   = new events.default();
    let called = false;
    let id     = evts.on("something", undefined);
    expect(id).toBe(-1);
  });

  it("should return -1 when given anything other than a function", function() {
    let evts   = new events.default();
    let called = false;
    let id     = evts.on("something", {});
    expect(id).toBe(-1);
  });

  it("should return -1 when given anything other than a function", function() {
    let evts   = new events.default();
    let called = false;
    let id     = evts.on("something", false);
    expect(id).toBe(-1);
  });

  it("should trigger events having been added", function() {
    let evts   = new events.default();
    let called = false;
    evts.on("something", function() { called = true; });
    expect(called).toBe(false);
    evts.trigger("something");
    expect(called).toBe(true);
  });

});
