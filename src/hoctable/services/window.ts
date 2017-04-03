import util from "hoctable/utils";

export interface Dimensions {
  width  : number;
  height : number;
}

export interface Position {
  x : number;
  y : number;
}

class MouseState {
  start   : Position;
  end     : Position;
  current : Position;

  constructor() {
    this.start = this.end = this.current = { x: -1, y: -1 };
  }
}

export interface WindowListener {
  handler    : EventListener;
  id         : string;
  event_name : string;
  context?   : any;
}

interface Dictionary<T> { [key : string] : T; }

interface InteralState {
  mouse           : MouseState;
  listeners       : Array<WindowListener>;
  bound           : boolean;
  document_events : Dictionary<EventListener>;
}

const ENTER_FULLSCREEN = [
  "requestFullscreen",
  "webkitRequestFullscreen",
  "mozRequestFullScreen",
  "msRequestFullscreen"
];

const EXIT_FULLSCREEN = [
  "exitFullscreen",
  "webkitExitFullscreen",
  "mozCancelFullScreen",
  "msExitFullscreen"
];

const FULLSCREEN_ELEMENT = [
  "fullscreenElement",
  "webkitFullscreenElement",
  "mozFullScreenElement",
  "msFullscreenElement"
];

const internal_state : InteralState = {
  mouse: new MouseState(),
  listeners: [],
  bound: false,
  document_events: {},
};

function on(event_name : string, handler : EventListener, context? : any) : string {
  const id = util.uuid();
  internal_state.listeners.push({ event_name, id, handler, context });

  return id;
}

function off(id : string) : string | number {
  let { listeners } = internal_state;

  for(let i = 0, c = listeners.length; i < c; i++) {
    let l = listeners[i];

    if(l.id !== id) {
      continue;
    }

    listeners.splice(i, 1);

    return id;
  }

  return -1;
}

function trigger(evt : string, fn? : EventListener) : EventListener {
  let before = "function" === typeof fn ? fn : function() : void { };

  function handler(e : any) : void {
    let { listeners } = internal_state;

    before(e);

    for(let i = 0, c = listeners.length; i < c; i++) {
      let { event_name, handler, context } = listeners[i];

      if(evt === event_name) {
        handler.call(context, e);
      }
    }
  }

  return handler;
}

function move(e) : void {
  let { mouse } = internal_state;
  mouse.current = { x: e.clientX, y: e.clientY };
}

function down(e) : void {
  let { mouse } = internal_state;
  mouse.start = { x: e.clientX, y: e.clientY };
}

function up(e) : void {
  let { mouse } = internal_state;
  mouse.end = { x: e.clientX, y: e.clientY };
}

function click(e) : void {
  let { mouse } = internal_state;
  let { start, end } = mouse;

  // If the mouse moved during the click, do nothing.
  if(start.x !== end.x || start.y !== end.y) {
    return;
  }

  trigger("isoclick")(e);
}

function unbind() : void {
  let { listeners } = internal_state;
  listeners.length = 0;

  for(let key in internal_state.document_events) {
    let listener = internal_state.document_events[key];
    document.removeEventListener(key, listener);
  }

  internal_state.bound = false;
}

internal_state.document_events["click"] = trigger("click", click);
internal_state.document_events["mousedown"] = trigger("mousedown", down);
internal_state.document_events["mousemove"] = trigger("mousemove", move);
internal_state.document_events["mouseup"] = trigger("mouseup", up);
internal_state.document_events["keyup"] = trigger("keyup");
internal_state.document_events["keydown"] = trigger("keydown");

function bind() : void {
  const { bound } = internal_state;

  if(bound) {
    return;
  }

  internal_state.bound = true;
  internal_state.mouse = new MouseState();

  for(let key in internal_state.document_events) {
    let listener = internal_state.document_events[key];
    document.addEventListener(key, listener);
  }

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
  let { innerWidth: width, innerHeight: height } = window;

  return { width, height };
}

function scroll() : Position {
  let { scrollX: x, scrollY: y } = window;

  return { x, y };
}

let fullscreen = {

  open(el : Node) : boolean {
    let fn      = null;
    let vendors = (el === null ? EXIT_FULLSCREEN : ENTER_FULLSCREEN).slice(0);

    if(el === null) {
      el = document;
    }

    while(!fn && vendors.length) {
      let name = vendors.shift();
      fn = el[name];
    }

    // Browser does not support fullscreen
    if(typeof fn !== "function") {
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

export default {
  on, off, bind, dimensions, scroll, fullscreen, unbind
};
