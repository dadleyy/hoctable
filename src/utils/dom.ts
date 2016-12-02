export function remove(element : Node) : Node {
  return element.parentNode.removeChild(element);
}

export function contains(target : Node, child : Node) : boolean {
  let head = child.parentNode;

  while(head != null) {
    if (head == target) return true;
    head = head.parentNode;
  }

  return false;
}

export function create(tag : string, style : any) : HTMLElement {
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
