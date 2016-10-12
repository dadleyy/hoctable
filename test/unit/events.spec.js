const events = require("../../src/Events");

describe("events test suite", function() {

  it("should trigger events having been added", function() {
    let evts   = new events.default();
    let called = false;
    evts.on("something", function() { called = true; });
    expect(called).toBe(false);
    evts.trigger("something");
    expect(called).toBe(true);
  });

});
