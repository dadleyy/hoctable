export function addClass(element : HTMLElement, class_name : string) : void {
  const {className: current_value} = element;
  const current_list = current_value.split(" ").filter(function(v) : boolean { return v.length >= 1; });

  if(current_list.indexOf(class_name) !== -1) {
    return;
  }

  current_list.push(class_name);
  element.className = current_list.join(" ");
}

export function removeClass(element : HTMLElement, class_name : string) : void {
  const { className: attr } = element;
  const current_list = attr.split(" ").filter(function(v) : boolean { return v.length >= 1 && v !== class_name; });
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

  for(const property in style) {
    const value = style[property];
    apply(property, value);
  }

  return node;
}

function create(tag : string, style? : any, classes? : Array<string>) : HTMLElement {
  const element = document.createElement(tag);

  element.setAttribute("util-dom", "true");

  if(style) {
    stylize(element, style);
  }

  for(let i = 0, l = classes || [], c = l.length; i < c; i++) {
    const class_name = l[i];
    addClass(element, class_name);
  }

  return element;
}

export default {
  classes: { add: addClass, remove: removeClass },
  create, remove, contains, stylize
};
