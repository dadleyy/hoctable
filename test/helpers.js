const { default: Viewport } = require("hoctable/services/window");
const { default: Popups }   = require("hoctable/services/popups");

const ReactDOM = require("react-dom");

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
    ReactDOM.unmountComponentAtNode(dom.container);
    Popups.unmount();
    document.body.removeChild(dom.popups);
    document.body.removeChild(dom.container);
    Viewport.unbind();
  }

};

module.exports = { dom };
