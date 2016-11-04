/* remove
 *
 * removes the element from the dom by using it's parent.
 */
export function remove(element) {
  return element.parentNode.removeChild(element);
}

/* contains
 *
 * returns true|false depending on wheather or not child is in target.
 */
export function contains(target, child) {
  let head = child.parentNode;

  while(head != null) {
    if (head == target) return true;
    head = head.parentNode;
  }

  return false;
}

/* create
 *
 * creates an element and sets styles based on an option set provided
 */
export function create(tag, {style} = {}) {
  let element = document.createElement(tag);

  element.setAttribute("util-dom", "true");

  if(!style)
    return element;

  let rules = Object.keys(style);

  for(let i = 0, c = rules.length; i < c; i++) {
    let rule  = rules[i];
    element.style[rule] = style[rule];
  }

  return element;
}

/* px
 *
 * adds `px` to the end of a string
 */
export function px(amt) { return `${amt}px`; }
