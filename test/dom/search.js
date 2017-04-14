const { CLASSES } = require("hoctable/hoc/search");

module.exports = function(bag) {

  const dom = {

    get input() {
      return bag.dom.container.querySelector(`.${CLASSES.INPUT_CONTAINER} input`);
    },

    controls: {

      get clear() {
        return bag.dom.container.querySelector(`.${CLASSES.SELECTION_CLEAR_CONTROL}`);
      }

    },

    indicators: {

      get has_selection() {
        return bag.dom.container.querySelector(`.${CLASSES.SEARCH_FILLED}`) !== null;
      }

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


  return dom;

};
