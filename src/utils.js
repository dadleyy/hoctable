import * as dom from "./utils/dom";
import * as compare from "./utils/compare";

function replace(a1, a2) {
  return a1.splice.apply(a1, [0, a1.length].concat(a2));
}

export default {dom, compare, replace};
