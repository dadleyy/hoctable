const { CLASSES } = require("hoctable/hoc/select");

module.exports = function(bag) {

  const dom = {

    get default_button() {
      return bag.dom.container.querySelector(`.${CLASSES.SELECT_BUTTON}`);
    },

    get custom_button() {
      return bag.dom.container.querySelector("[data-rel=custom-button]");
    },

    get menu_body() {
      return bag.dom.popups.querySelector(`.${CLASSES.SELECT}`);
    },

    get transcluded_loader() {
      let { menu_body } = dom;
      return menu_body && menu_body.querySelector("[data-rel=loader]");
    },

    get default_loader() {
      let { menu_body } = dom;
      return menu_body && menu_body.querySelector(`.${CLASSES.SELECT_LOADING}`);
    },

    get options() {
      let { menu_body } = dom;
      return menu_body && menu_body.querySelectorAll("[data-rel=option-item]");
    }

  };

  return dom;

};
