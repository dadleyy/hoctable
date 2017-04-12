const { CLASSES: SELECT_CLASSES } = require("hoctable/hoc/select");
const { CLASSES }  = require("hoctable/hoc/multi_select");

module.exports = function(bag) {

  const dom = {

    get menu_body() {
      return bag.dom.popups.querySelector(`.${CLASSES.MULTISELECT}`);
    },

    get search_input() {
      return bag.dom.popups.querySelector(`.${CLASSES.MULTISELECT_SEARCH} input`);
    },

    custom: {

      get options() {
        return bag.dom.popups.querySelectorAll("[data-rel=custom-option]");
      },

    },

    default: {

      get button() {
        return bag.dom.container.querySelector(`.${SELECT_CLASSES.SELECT_BUTTON}`);
      },

      get options() {
        return bag.dom.popups.querySelectorAll(`.${CLASSES.MULTISELECT_ITEM}`);
      },

      get option_texts() {
        let { options } = dom.default;
        let texts = [ ];

        for(let i = 0, c = options.length; i < c; i++) {
          let { firstChild } = options[i].querySelector(`.${CLASSES.MULTISELECT_ITEM_TEXT}`);
          texts.push(firstChild.innerHTML);
        }

        return texts;
      },

      get toggles() {
        let { menu_body } = dom;
        return menu_body.querySelectorAll(`.${CLASSES.MULTISELECT_ITEM_TOGGLE} input`);
      },

      get selected_toggles() {
        let { menu_body } = dom;
        return menu_body.querySelectorAll(`.${CLASSES.MULTISELECT_ITEM_TOGGLE} input:checked`);
      }

    }

  };

  return dom;

};
