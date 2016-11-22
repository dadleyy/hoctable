const {default: {truncr}} = require("../../src/utils");

describe("utils test suite", function() {

  it("should not change a string less than the specified length", function() {
    let result = truncr("short", 10);
    expect(result).toBe("short");
  });

  it("should truncate the string at the word before if the position falls in the middle", function() {
    let result = truncr("123456789 12345", 10);
    expect(result).toBe("123456789");
  });

  it("should fall back if falls in middle of word", function() {
    let result = truncr("123456789 12345", 13);
    expect(result).toBe("123456789");
  });

});
