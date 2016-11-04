import util from "../utils";
import Viewport from "./window"

/* popups service
 *
 * Very similar to the Notes services, this module takes care of adding
 * components to the DOM as popups - fixed-position elements that must
 * have a higher z-index than the rest of the content.
 *
 * Additionally, this service is responsible for closing popups when the
 * user clicks outside them, making sure the popups remain bounded within
 * the viewport, etc..
 *
 * Like the Event class and the Notes service, addition and removal of popups
 * is handled through a unique identifier handle.
 */ 

let root         = null;
let open_popups  = [];
let view_events  = [];

const GUTTER_WIDTH = 100;

function open(component, placement) {
  let id    = util.uuid();
  let style = Object.assign({position: "fixed"}, placement);
  let popup = util.dom.create("div", {style});

  // render the component into the container and add it to our popup root
  ReactDOM.render(component, popup);
  root.appendChild(popup);

  // now we need to make sure the popup remains inside the bounds
  let bounding = popup.getBoundingClientRect();
  let ldist    = (bounding.left + bounding.width) - (window.innerWidth - GUTTER_WIDTH);

  if(ldist > 0)
    popup.style.left = util.dom.px(placement.left - GUTTER_WIDTH);

  if(bounding.left < GUTTER_WIDTH)
    popup.style.left = util.dom.px(placement.left + GUTTER_WIDTH);

  open_popups.push({id, popup});
  return id;
}

function close(popup_id) {
  let count = open_popups.length;

  for(let i = 0; i < count; i++) {
    let p = open_popups[i];
    if(p.id !== popup_id) continue;
    let node = ReactDOM.findDOMNode(p.popup)
    ReactDOM.unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
    open_popups.splice(i, 1);
    return popup_id;
  }

  return -1;
}

function closeOpen(event) {
  let {currentTarget: target} = event;

  // loop over our open popups closing those that are not associated with this event
  for(let i = 0, count = open_popups.length; i < count; i++) {
    let {id, popup} = open_popups[i];
    let node = ReactDOM.findDOMNode(popup);

    // if this node is inside the target of the click - continue
    if(util.dom.contains(node, target)) {
      console.log("avoiding");
      continue;
    }

    // otherwise close it
    return close(id);
  }

  return true;
}

function mount(target) {
  root = target;

  for(let i = 0, c = view_events.length; i < c; i++) {
    Viewport.off(view_events[i]);
  }

  view_events = [Viewport.on("isoclick", closeOpen)];
}

export default {open, close, mount};
