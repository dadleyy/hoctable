/*
 *
 */
export function fields(fields) {
  return function compare(a, b) {
    for(let i = 0, c = fields.length; i < c; i++) {
      let f = fields[i];

      if(a[f] !== b[f]) return false;
    }

    return true;
  }
}
