function remove(element : Node) : Node {
  return element.parentNode.removeChild(element);
}

function contains(target : Node, child : Node) : boolean {
  let head = child.parentNode;

  while(head != null) {
    if (head == target) return true;
    head = head.parentNode;
  }

  return false;
}

function create(tag : string, style? : any, classes? : Array<string>) : HTMLElement {
  let element = document.createElement(tag);

  element.setAttribute("util-dom", "true");

  let rules = style ? Object.keys(style) : [];

  for(let i = 0, c = rules.length; i < c; i++) {
    let rule  = rules[i];
    element.style[rule] = style[rule];
  }

  for(let i = 0, l = classes || [], c = l.length; i < c; i++) {
    let class_name = l[i];
    element.classList.add(class_name);
  }

  return element;
}

export {create, remove, contains};
