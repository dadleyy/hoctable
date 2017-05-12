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

const FULLSCREEN_ERROR = [
  "fullscreenerror",
  "webkitfullscreenerror",
  "mozfullscreenerror"
];

const FULLSCREEN_CHANGE = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange"
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
  const { listeners } = internal_state;

  for(let i = 0, c = listeners.length; i < c; i++) {
    const l = listeners[i];

    if(l.id !== id) {
      continue;
    }

    listeners.splice(i, 1);

    return id;
  }

  return -1;
}

function trigger(evt : string, fn? : EventListener) : EventListener {
  const before = "function" === typeof fn ? fn : function() : void { };

  function handler(e : any) : void {
    const { listeners } = internal_state;

    before(e);

    for(let i = 0, c = listeners.length; i < c; i++) {
      const { event_name, handler, context } = listeners[i];

      if(evt === event_name) {
        handler.call(context, e);
      }
    }
  }

  return handler;
}

function move(e : MouseEvent) : void {
  const { mouse } = internal_state;
  mouse.current = { x: e.clientX, y: e.clientY };
}

function down(e : MouseEvent) : void {
  const { mouse } = internal_state;
  mouse.start = { x: e.clientX, y: e.clientY };
}

function up(e : MouseEvent) : void {
  const { mouse } = internal_state;
  mouse.end = { x: e.clientX, y: e.clientY };
}

function click(e : MouseEvent) : void {
  const { mouse } = internal_state;
  const { start, end } = mouse;

  // If the mouse moved during the click, do nothing.
  if(start.x !== end.x || start.y !== end.y) {
    return;
  }

  trigger("isoclick")(e);
}

function unbind() : void {
  const { listeners } = internal_state;
  listeners.length = 0;

  for(const key in internal_state.document_events) {
    const listener = internal_state.document_events[key];
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

for(let i = 0, c = ENTER_FULLSCREEN.length; i < c; i++) {
  const enter_fn = ENTER_FULLSCREEN[i];

  if(typeof document.body[enter_fn] !== "function") {
    continue;
  }

  const change_event = FULLSCREEN_CHANGE[i];
  const error_event = FULLSCREEN_ERROR[i];

  if(change_event && error_event) {
    internal_state.document_events[change_event] = trigger("fullscreenchange");
    internal_state.document_events[error_event] = trigger("fullscreenerror");
  }
}

function bind() : void {
  const { bound } = internal_state;

  if(bound) {
    return;
  }

  internal_state.bound = true;
  internal_state.mouse = new MouseState();

  for(const key in internal_state.document_events) {
    const listener = internal_state.document_events[key];
    document.addEventListener(key, listener);
  }
}

function dimensions() : Dimensions {
  const { innerWidth: width, innerHeight: height } = window;

  return { width, height };
}

function scroll() : Position {
  const { scrollX: x, scrollY: y } = window;

  return { x, y };
}

const fullscreen = {

  open(el : Node) : boolean {
    let fn      = null;
    const vendors = (el === null ? EXIT_FULLSCREEN : ENTER_FULLSCREEN).slice(0);

    if(el === null) {
      el = document;
    }

    while(!fn && vendors.length) {
      const name = vendors.shift();
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
    const vendors = FULLSCREEN_ELEMENT.slice(0);

    while(!result && vendors.length) {
      result = document[vendors.shift()] || null;
    }

    return result;
  }

};

export default {
  on, off, bind, dimensions, scroll, fullscreen, unbind
};
