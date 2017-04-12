const { CLASSES } = require("hoctable/hoc/menu");

module.exports = function(bag) {

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

  return dom;

};
