const { default: Viewport } = require("hoctable/services/window");
const { default: Popups }   = require("hoctable/services/popups");

const ReactDOM = require("react-dom");

const internals = { listeners: [ ], uuid: 0 };

function create(type, relationship_key) {
  let element = document.createElement(type);
  element.setAttribute("data-rel", relationship_key);
  document.body.appendChild(element);
  return element;
}

const dom = {

  setup() {
    let popups = create("div", "popup-mountpoint");
    let container = create("div", "component-container");
    Viewport.bind();
    Popups.mount(popups);
    this.dom = { popups, container };
  },

  teardown() {
    let { dom } = this;

    try {
      ReactDOM.unmountComponentAtNode(dom.container);
    } catch(e) { }

    Popups.unmount();
    document.body.removeChild(dom.popups);
    document.body.removeChild(dom.container);
    Viewport.unbind();
  }

};

function mouse(type, x, y, target = document) {
  let event = document.createEvent("MouseEvents");
  event.initMouseEvent(type, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);

  function send() {
    target.dispatchEvent(event);
  }

  return { event, send };
}

mouse.down = function(x, y) {
  return mouse("mousedown", x, y);
};

mouse.click = function(x, y, target = document.body) {
  return mouse("click", x, y, target);
};

mouse.up = function(x, y) {
  return mouse("mouseup", x, y);
};

mouse.over = function(x, y, target = document) {
  return mouse("mouseover", x, y, target);
};

mouse.out = function(x, y, target = document) {
  return mouse("mouseout", x, y, target);
};

function fullScreenError(event) {
  let { listeners } = internals;

  for(let i = 0, c = listeners.length; i < c; i++) {
    let { event_name, handler } = listeners[i];
    if(event_name === "fullscreen:error") handler(event);
  }
}

function fullScreenEvent(event) {
  let { listeners } = internals;

  for(let i = 0, c = listeners.length; i < c; i++) {
    let { event_name, handler } = listeners[i];
    if(event_name === "fullscreen:change") handler(event);
  }
}

if(document.body.requestFullScreen) {
  window.addEventListener('fullscreenchange', fullScreenEvent);
  window.addEventListener('fullscreenerror', fullScreenError);
} else if(document.body.webkitRequestFullScreen) {
  window.addEventListener('webkitfullscreenchange', fullScreenEvent);
  window.addEventListener('webkitfullscreenerror', fullScreenError);
} else if(document.body.mozRequestFullScreen) {
  window.addEventListener('mozfullscreenchange', fullScreenEvent);
  window.addEventListener('mozfullscreenerror', fullScreenError);
}

const fullscreen = {

  on(event_name, handler) {
    let id = `--${++internals.uuid}--`;
    internals.listeners.push({ event_name, handler, id });
    return id;
  },

  off(target) {
    let { listeners } = internals;
    internals.listeners = listeners.filter(function({ id }) { return id !== target; });
  }

};

function keyboard() {
}

keyboard.fill = function(element, value) {
  const event = new Event("input", { bubbles: true, cancelable: true });
  element.value = value;
  element.dispatchEvent(event);
};

module.exports = { dom, fullscreen, mouse, keyboard };
