const { default: ActionMenu } = require("hoctable/hoc/menu");
const { CLASSES }             = require("hoctable/hoc/menu");
const { default: Popups }     = require("hoctable/services/popups");
const { SYNC_WAIT_TIME }      = require("hoctable/services/popups");
const helpers                 = require("test_helpers");
const React                   = require("react");
const Dom                     = require("dom/menu");

describe("hoc/ActionMenu test suite", function() {

  let bag = null;
  let dom = null;

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

  function render() {
    ReactDOM.render(<bag.Menu {...bag.render_props} />, bag.dom.container);
  }

  beforeEach(function() {
    bag = { };
    dom = Dom(bag);

    bag.Menu = ActionMenu(Menu);
    bag.render_props = { text: BUTTON_TEXT, menu_body_text: MENU_BODY_TEXT };
  });

  describe("with unmounted popup manager", function() {

    beforeEach(function() {
      const container = document.createElement("div");
      document.body.appendChild(container);
      bag.dom = { container };
    });

    afterEach(function() {
      document.body.removeChild(bag.dom.container);
      delete bag.dom;
    });

    beforeEach(render);

    it("should throw an exception if popup manager was not mounted", function(done) {
      Popups.on("error", function(e) {
        expect(e).not.toBe(undefined);
        done();
      });
      dom.default.button.click();
    });

  });

  describe("with mounted poup manager", function() {

    beforeEach(function() {
      helpers.dom.setup.call(bag);
    });

    afterEach(function() {
      helpers.dom.teardown.call(bag);
    });

    describe("with custom button", function() {

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

      beforeEach(render);

      it("should render out the transcluded button, sending all props down to it", function() {
        expect(dom.custom.button.firstChild.innerHTML).toBe(BUTTON_TEXT);
      });

      it("should render the menu when the clicked", function() {
        expect(dom.menu).toBe(null);
        dom.custom.button.click();
        expect(dom.menu.firstChild.innerHTML).toBe(MENU_BODY_TEXT);
      });

      describe("having opened the popup", function() {

        beforeEach(render);

        beforeEach(function() {
          dom.custom.button.click();
        });

        it("should close it when clicking anywhere else on page", function(done) {
          expect(dom.menu.children.length).toBe(1);
          let { innerWidth: x, innerHeight: y } = window;

          dom.menu.style.width = "0px";
          dom.menu.style.height = "0px";
          dom.menu.style.overflow = "hidden";

          function close() {
            helpers.mouse.click(x + 10, y + 10).send();

            // todo - first click in tests not closing always, need to figure out why.
            if(dom.menu !== null) {
              helpers.mouse.click(x + 10, y + 10).send();
            }

            expect(dom.menu).toBe(null);
            setTimeout(done, 0);
          }

          setTimeout(close, 100 + SYNC_WAIT_TIME);
        });

      });

    });

  });

});

