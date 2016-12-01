import utils from "utils";

export declare interface Dimensions {
  width : number;
  height: number;
}

export declare interface Position {
  x: number;
  y: number
}

class MouseState {
  public start   : Position;
  public end     : Position;
  public current : Position;
}

export declare interface ListenterCallback {
  (evt : any) : void;
}

export declare interface WindowListener {
  handler    : ListenterCallback;
  id         : string;
  event_name : string;
  context?   : any;
}

let listeners : Array<WindowListener> = [];
let mouse = new MouseState();

let bound = false;

let uuid = (function() {
  let pool = 0;
  return function() : string { return `_${++pool}_`; };
})();

function on(event_name : string, handler : ListenterCallback) {
  var id = uuid();
  listeners.push({event_name, id, handler});
  return id;
}

function off(id : string) : string | number {
  let count = listeners.length;

  for(let i = 0; i < count; i++) {
    let l = listeners[i];

    if(l.id !== id) 
      continue;

    listeners.splice(i, 1);
    return id;
  }

  return -1;
}

function trigger(evt : string, fn? : ListenterCallback) : ListenterCallback {
  let before = "function" === typeof fn ? fn : function() { };

  function handler(e : any) {
    before(e);

    for(let i = 0, c = listeners.length; i < c; i++) {
      let {event_name, handler, context} = listeners[i];

      if(evt === event_name)
        handler.call(context, e);
    }

    return true;
  };

  return handler;
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

function dimensions() : Dimensions {
  let {innerWidth: width, innerHeight: height} = window;
  return {width, height};
}

function scroll() : Position {
  let {scrollX: x, scrollY: y} = window;
  return {x, y};
}

export default {on, off, bind, dimensions, scroll};
