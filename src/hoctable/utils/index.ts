import * as dom from "hoctable/utils/dom";

function replace<T>(target : Array<T>, source : Array<T>) : Array<T> {
  target.length = 0;

  for(let i = 0, c = source.length; i < c; i++) {
    target.push(source[i]);
  }

  return target;
}

export default {dom, replace};
