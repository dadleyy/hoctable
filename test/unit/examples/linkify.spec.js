const {default: linkify} = require("example/services/github/linkify");

const fixtures = [{
  input: "",
  output: "",
}, {
  input: "@someone123",
  output: "[@someone123](https://github.com/someone123)",
}, {
  input: " @leading_spaces ",
  output: " [@leading_spaces](https://github.com/leading_spaces) ",
}, {
  input: "at ending @leading_spaces",
  output: "at ending [@leading_spaces](https://github.com/leading_spaces)",
}, {
  input: "no instance",
  output: "no instance",
}];

function run({input, output}) {
  it(`given ${input} - ${output}`, function() {
    let result = linkify(input);
    expect(result).toBe(output);
  });
}

describe("linkify test suite", function() {

  for(let i = 0, c = fixtures.length; i < c; i++) {
    run(fixtures[i]);
  }

});
