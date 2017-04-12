const { CLASSES } = require("hoctable/hoc/search");

module.exports = function(bag) {

  return {

    get input() {
      return bag.dom.container.querySelector(`.${CLASSES.INPUT_CONTAINER} input`);
    },

    controls: {
    },

    default: {

      get items() {
        return bag.dom.popups.querySelectorAll(`.${CLASSES.ITEM_CONTAINER}`);
      }

    },

    custom: {

      get items() {
        return bag.dom.popups.querySelectorAll("[data-rel=option-item]");
      }

    }

  };

};
