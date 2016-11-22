export function replace(a1, a2) {
  let args = [0, a1.length].concat(a2);
  return a1.splice.apply(a1, args);
}
