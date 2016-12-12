const {default: Viewport}   = require("hoctable/services/window");
const {default: Popups}     = require("hoctable/services/popups");
const {default: ActionMenu} = require("hoctable/hoc/action_menu");
const React                 = require("react");

describe("hoc/ActionMenu test suite", function() {

  let bag = {};

  class Button extends React.Component {

    constructor(props) {
      super(props);
      bag.spies.button_create = true;
    }

    render() {
      let {text} = this.props;
      bag.spies.button_render = true;

      return (
        <div className="test-button"><a>{text}</a></div>
      );
    }

  }

  class Menu extends React.Component {

    constructor(props) {
      super(props);
      bag.spies.menu_create = true;
    }

    render() {
      let {text} = this.props;
      bag.spies.menu_render = true;
      return (
        <div className="test-popup">
          <h1>{text}</h1>
        </div>
      );
    }

  }

  beforeEach(function() {
    bag = {spies: {}, options: []};
    bag.container = document.createElement("div");
    bag.popups    = document.createElement("div");

    document.body.appendChild(bag.popups);
    document.body.appendChild(bag.container);

    Popups.mount(bag.popups);
    Viewport.bind();
    bag.Menu = ActionMenu(Menu, Button);
  });

  afterEach(function() {
    Popups.unmount();
    document.body.removeChild(bag.popups);
    document.body.removeChild(bag.container);
  });

  it("should render out the transcluded button", function() {
    ReactDOM.render(<bag.Menu text={"testing 123"} />, bag.container);
    let btn = bag.container.getElementsByClassName("test-button");
    expect(btn.length).toBe(1);
    expect(bag.spies.button_render).toBe(true);
    expect(bag.spies.button_create).toBe(true);
    expect(bag.spies.menu_create).toBe(undefined);
    expect(bag.spies.menu_render).toBe(undefined);
    expect(bag.popups.childNodes.length).toBe(0);
  });

  it("should render the menu when the clicked", function() {
    ReactDOM.render(<bag.Menu text={"testing 123"} />, bag.container);
    let [trigger] = bag.container.getElementsByClassName("test-button");
    let [anchor]  = trigger.getElementsByTagName("a");
    effroi.mouse.click(anchor);
    expect(bag.spies.menu_create).toBe(true);
    expect(bag.spies.menu_render).toBe(true);
    expect(bag.popups.childNodes.length).toBe(1);
    let [heading] = bag.popups.getElementsByTagName("h1");
    expect(heading.innerHTML).toBe("testing 123");
  });

  describe("having opened the popup", function() {

    beforeEach(function() {
      ReactDOM.render(<bag.Menu text={"testing 123"} />, bag.container);
      let [trigger] = bag.container.getElementsByClassName("test-button");
      let [anchor]  = trigger.getElementsByTagName("a");
      effroi.mouse.click(anchor);

      bag.distraction = document.createElement("div");
      document.body.appendChild(bag.distraction);
    });

    afterEach(function() {
      document.body.removeChild(bag.distraction);
    });

    it("should close it when clicking anywhere else on page", function() {
      bag.distraction.style.position = "fixed";
      bag.distraction.style.bottom = "0px";
      bag.distraction.style.right = "0px";
      bag.distraction.style.width = "10px";
      bag.distraction.style.height = "10px";
      expect(bag.popups.childNodes.length).toBe(1);
      effroi.mouse.click(bag.distraction);
      expect(bag.popups.childNodes.length).toBe(0);
    });

  });

});

