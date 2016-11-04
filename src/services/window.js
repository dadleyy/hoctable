import utils from "../utils";

/* viewport service
 *
 * This service binds viewport-level events to the dom so that other
 * components/modules needing that information may and and remove these
 * listeners at will; the module binds all of its events at application
 * startup to handlers that find matching events and call them as needed.
 * It is likely that there will be events fired that have no active 
 * listeners, but that is ok.
 *
 * The management (addition/removal) of the listeners is handled the same
 * way as the popup/note/event engines - a unique identifier handler is 
 * create for each listener.
 *
 */

let listeners = [];
let bound     = false;
let mouse     = {};

function on(event_name, handler) {
  var id = utils.uuid();
  listeners.push({event_name, id, handler});
  return id;
}

function off(id) {
  let count = listeners.length;

  for(let i = 0; i < count; i++) {
    let l = listeners[i];
    if(l.id !== id) continue;
    listeners.splice(i, 1);
    return id;
  }

  return -1;
}

function trigger(event, fn) {
  return function handler(e) {
    if("function" === typeof fn) fn(e);

    for(let i = 0, c = listeners.length; i < c; i++) {
      let {event_name, handler, context} = listeners[i];
      if(event_name === event) handler.call(context, e);
    }

    return true;
  };
}

function move(e) {
  mouse.current = {x: e.clientX, y: e.clientY};
}

function down(e) {
  mouse.start = {x: e.clientX, y: e.clientY};
}

function up(e) {
  mouse.end = {x: e.clientX, y: e.clientY};
}

function click(e) {
  // if this was a drag event - do nothing
  if(mouse.start.x !== mouse.end.x || mouse.start.y !== mouse.end.y) return;
  trigger("isoclick")(e);
}

function bind() {
  if(bound) { return false; }
  bound = true;

  document.addEventListener("click", trigger("click", click));
  document.addEventListener("mousedown", trigger("mousedown", down));
  document.addEventListener("mousemove", trigger("mousemove", move));
  document.addEventListener("mouseup", trigger("mouseup", up));
  document.addEventListener("keyup", trigger("keyup"));
  document.addEventListener("keyup", trigger("keyup"));

  let vendors = [
    "onfullscreenchange",
    "onwebkitfullscreenchange",
    "onmozfullscreenchange",
    "onmsfullscreenchange"
  ];

  for(let i = 0, c = vendors.length; i < c; i++) {
    let name = vendors[i];
    document[name] = trigger("fullscreen");
  }
}

export default {on, off, bind};
