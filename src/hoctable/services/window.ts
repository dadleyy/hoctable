export interface Dimensions {
  width : number;
  height: number;
}

export interface Position {
  x: number;
  y: number
}

class MouseState {
  public start   : Position;
  public end     : Position;
  public current : Position;
}

export interface ListenerCallback {
  (evt : any) : void;
}

export interface WindowListener {
  handler    : ListenerCallback;
  id         : string;
  event_name : string;
  context?   : any;
}

const ENTER_FULLSCREEN   = ["requestFullscreen" , "webkitRequestFullscreen" , "mozRequestFullScreen" , "msRequestFullscreen"];
const EXIT_FULLSCREEN    = ["exitFullscreen"    , "webkitExitFullscreen"    , "mozCancelFullScreen"  , "msExitFullscreen"];
const FULLSCREEN_ELEMENT = ["fullscreenElement" , "webkitFullscreenElement" , "mozFullScreenElement" , "msFullscreenElement"];

let listeners : Array<WindowListener> = [];
let mouse = new MouseState();

let bound = false;

let uuid = (function() {
  let pool = 0;
  return function() : string { return `_${++pool}_`; };
})();

function on(event_name : string, handler : ListenerCallback, context? : any) : string {
  var id = uuid();
  listeners.push({event_name, id, handler, context});
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

function trigger(evt : string, fn? : ListenerCallback) : ListenerCallback {
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

let fullscreen = {
  
  open(el : Node) : boolean {
    let fn      = null;
    let vendors = (el === null ? EXIT_FULLSCREEN : ENTER_FULLSCREEN).slice(0);

    if(el === null)
      el = document;

    while(!fn && vendors.length) {
      let name = vendors.shift();
      fn = el[name];
    }

    // fullscreen not supported
    if("function" !== typeof fn) {
      return false;
    }

    return fn.call(el) || true;
  },

  get current() : Node {
    let result  = null;
    let vendors = FULLSCREEN_ELEMENT.slice(0);

    while(!result && vendors.length) {
      result = document[vendors.shift()];
    }

    return result;
  }

};

export default {on, off, bind, dimensions, scroll, fullscreen};
