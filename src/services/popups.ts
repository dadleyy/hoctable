import util from "utils";
import Viewport from "services/window"

export declare interface PopupPlacement {
  left   : number;
  right? : number;
  top    : number;
}

export declare interface PopupGlobalCloseEvent {
  target : Node
}

let root         = null;
let open_popups  = [];
let view_events  = [];

const GUTTER_WIDTH = 100;

let uuid = (function() {
  let pool = 0;
  return function() : string { return `_${++pool}_`; };
})();

function open(component : React.ReactElement<any>, placement : PopupPlacement) : string {
  let style : React.CSSProperties = {top: `${placement.top}px`, right: placement.right, position: "absolute"};
  let id    = uuid();

  if(placement.left && !placement.right) 
    style.left = `${placement.left}px`;

  let popup = util.dom.create("div", style);

  // render the component into the container and add it to our popup root
  ReactDOM.render(component, popup);
  root.appendChild(popup);

  // now we need to make sure the popup remains inside the bounds
  let bounding = popup.getBoundingClientRect();
  let ldist    = (bounding.left + bounding.width) - (window.innerWidth - GUTTER_WIDTH);

  if(ldist > 0)
    popup.style.left = `${placement.left - GUTTER_WIDTH}px`;

  if(bounding.left < GUTTER_WIDTH)
    popup.style.left = `${placement.left + GUTTER_WIDTH}px`;

  open_popups.push({id, popup});
  return id;
}

function close(popup_id : string) : number {
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

export default {open, close, mount};
