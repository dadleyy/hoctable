import * as dom from "./utils/dom";
import * as compare from "./utils/compare";

// in-place replace of array elements. shim for coffeescript `array[0...] = other` sugar
function replace(a1, a2) {
  return a1.splice.apply(a1, [0, a1.length].concat(a2));
}

// primative unique id generation. module-scoped integer incremented each call
let id = 0;
function uuid() {
  return `id-${++id}`;
}

function truncr(input, length) {
  if("string" !== typeof input)
    return input;

  // easy - string is shorter
  if(input.length < length)
    return input;

  let parts = input.split(" ");
  let out   = [];
  let count = 0;

  for(let i = 0, c = parts.length; i < c; i++) {
    let chunk = parts[i];
    if(count + chunk.length > length) break;
    count += chunk.length;
    out.push(chunk);
  }

  return out.join(" ");
}

export default {dom, compare, replace, uuid, truncr};
