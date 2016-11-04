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

export default {dom, compare, replace, uuid};
