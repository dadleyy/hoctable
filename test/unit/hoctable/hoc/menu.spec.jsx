const { default: ActionMenu } = require("hoctable/hoc/menu");
const { CLASSES }             = require("hoctable/hoc/menu");
const helpers                 = require("test_helpers");
const React                   = require("react");

describe("hoc/ActionMenu test suite", function() {

  const bag = { };
  const BUTTON_TEXT = "button text here";
  const MENU_BODY_TEXT = "menu body text";

  class Button extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      let { text } = this.props;

      return (
        <div data-rel="button"><a>{text}</a></div>
      );
    }

  }

  class Menu extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      let { menu_body_text } = this.props;

      return (
        <div data-rel="menu-body">
          <h1>{menu_body_text}</h1>
        </div>
      );
    }

  }

  const dom = {

    get menu() {
      let { popups } = bag.dom;
      return popups && popups.querySelector("[data-rel=menu-body]");
    },

    custom: {

      get button() {
        let { container } = bag.dom;
        return container && container.querySelector("[data-rel=button]");
      }

    },

    default: {

      get button() {
        let { container } = bag.dom;
        return container && container.querySelector(`.${CLASSES.MENU_DEFAULT_BUTTON}`);
      }

    }

  };

  function render() {
    ReactDOM.render(<bag.Menu {...bag.render_props} />, bag.dom.container);
  }

  beforeEach(helpers.dom.setup.bind(bag));
  afterEach(helpers.dom.teardown.bind(bag));

  describe("with custom button", function() {

    beforeEach(function() {
      bag.spies = { };
      bag.Menu = ActionMenu(Menu);
      bag.render_props = { text: BUTTON_TEXT, menu_body_text: MENU_BODY_TEXT };
    });

    beforeEach(render);

    it("should render out the text inside the default button", function() {
      let { innerHTML } = dom.default.button;
      expect(innerHTML).toBe(bag.render_props.text);
    });

  })

  describe("with custom button", function() {

    beforeEach(function() {
      bag.spies = { };
      bag.Menu = ActionMenu(Menu, Button);
      bag.render_props = { text: BUTTON_TEXT, menu_body_text: MENU_BODY_TEXT };
    });

    it("should render out the transcluded button, sending all props down to it", function() {
      render();
      expect(dom.custom.button.firstChild.innerHTML).toBe(BUTTON_TEXT);
    });

    it("should render the menu when the clicked", function() {
      render();
      expect(dom.menu).toBe(null);
      dom.custom.button.click();
      expect(dom.menu.firstChild.innerHTML).toBe(MENU_BODY_TEXT);
    });

    describe("having opened the popup", function() {

      beforeEach(render);

      beforeEach(function() {
        dom.custom.button.click();
        bag.distraction = document.createElement("div");
        bag.distraction.style.position = "fixed";
        bag.distraction.style.bottom = "0px";
        bag.distraction.style.right = "0px";
        bag.distraction.style.width = "10px";
        bag.distraction.style.height = "10px";
        document.body.appendChild(bag.distraction);
      });

      afterEach(function() {
        document.body.removeChild(bag.distraction);
      });

      it("should close it when clicking anywhere else on page", function() {
        expect(dom.menu.children.length).toBe(1);
        bag.distraction.click();
        expect(dom.menu).toBe(null);
      });

    });

  });

});

