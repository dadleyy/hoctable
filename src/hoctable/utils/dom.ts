export function addClass(element : HTMLElement, class_name : string) : void {
  let {className: current_value} = element;
  let current_list = current_value.split(" ").filter(function(v) : boolean { return v.length >= 1; });

  if(current_list.indexOf(class_name) !== -1) {
    return;
  }

  current_list.push(class_name);
  element.className = current_list.join(" ");
}

export function removeClass(element : HTMLElement, class_name : string) : void {
  let { className: attr } = element;
  let current_list = attr.split(" ").filter(function(v) : boolean { return v.length >= 1 && v !== class_name; });
  element.className = current_list.join(" ");
}

function remove(element : Node) : Node {
  return element.parentNode.removeChild(element);
}

function contains(target : Node, child : Node) : boolean {
  let head = child.parentNode;

  while(head) {
    if (head === target) return true;
    head = head.parentNode;
  }

  return false;
}

function stylize(node : HTMLElement, style : CSSStyleDeclaration) : HTMLElement {
  const apply = node.style.setProperty.bind(node.style);

  for(let property in style) {
    let value = style[property];
    apply(property, value);
  }

  return node;
}

function create(tag : string, style? : any, classes? : Array<string>) : HTMLElement {
  let element = document.createElement(tag);

  element.setAttribute("util-dom", "true");

  if(style) {
    stylize(element, style);
  }

  for(let i = 0, l = classes || [], c = l.length; i < c; i++) {
    let class_name = l[i];
    element.classList.add(class_name);
  }

  return element;
}

const classes = { add: addClass, remove: removeClass };

export default { create, remove, contains, classes, stylize };
