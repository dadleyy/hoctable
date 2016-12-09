import util from "hoctable/utils";
import Viewport from "hoctable/services/window"

export interface PopupPlacement {
  left   : number;
  right? : number;
  top    : number;
}

export interface PopupGlobalCloseEvent {
  target : Node
}

let root         = null;
let open_popups  = [];
let view_events  = [];

const GUTTER_WIDTH = 10;

let uuid = (function() {
  let pool = 0;
  return function() : string { return `_${++pool}_`; };
})();

function open(component : React.ReactElement<any>, placement : PopupPlacement) : string | number {
  if(root === null)
    return -1;

  let style : React.CSSProperties = {top: `${placement.top}px`, right: placement.right, position: "absolute"};

  if(placement.left && !placement.right) 
    style.left = `${placement.left}px`;

  let id = uuid();

  let popup = util.dom.create("div", style);

  // render the component into the container and add it to our popup root
  ReactDOM.render(component, popup);
  root.appendChild(popup);

  open_popups.push({id, popup});
  return id;
}

function close(popup_id : string | number) : number {
  let count = open_popups.length;

  for(let i = 0; i < count; i++) {
    let p = open_popups[i];

    if(p.id !== popup_id) 
      continue;

    let node = ReactDOM.findDOMNode(p.popup)

    ReactDOM.unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
    open_popups.splice(i, 1);

    return 0;
  }

  return -1;
}

function closeOpen(trigger : PopupGlobalCloseEvent) : number {
  let {target} = trigger;

  // loop over our open popups closing those that are not associated with this event
  for(let i = 0, count = open_popups.length; i < count; i++) {
    let {id, popup} = open_popups[i];
    let node = ReactDOM.findDOMNode(popup);

    // if this node is inside the target of the click - continue
    if(util.dom.contains(node, target))
      continue;

    // otherwise close it
    return close(id);
  }

  return 0;
}

function mount(target) {
  root = target;

  for(let i = 0, c = view_events.length; i < c; i++) {
    Viewport.off(view_events[i]);
  }

  view_events = [Viewport.on("isoclick", closeOpen)];
}

function unmount() {
  root = null;

  while(open_popups.length)
    close(open_popups[0].id);
}

export default {open, close, mount, unmount};
