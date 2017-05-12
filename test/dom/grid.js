const { CLASSES: TABLE_CLASSES } = require("hoctable/hoc/table");
const { CLASSES } = require("hoctable/hoc/grid");
 
function Dom(bag) {

  const dom = {

    pagination: {

      get container() {
        return bag.dom.container.querySelector(`.${TABLE_CLASSES.PAGINATION}`);
      },

      get previous() {
        return bag.dom.container.querySelector(`.${TABLE_CLASSES.PAGINATION_PREVIOUS}`);
      },

      get next() {
        return bag.dom.container.querySelector(`.${TABLE_CLASSES.PAGINATION_NEXT}`);
      }

    },

    get custom_class_column() {
      return bag.dom.container.querySelectorAll(`.${Dom.classes.CUSTOM_COLUMN_CLASS}`);
    },

    get columns() {
      return bag.dom.container.querySelectorAll(`.${CLASSES.GRID_COLUMN_HEAD}`);
    },

    get rows() {
      return bag.dom.container.querySelectorAll(`.${CLASSES.GRID_ROW_CONTAINER}`);
    },

    default: {

      get active_columns() {
        return bag.dom.container.querySelectorAll(`.${CLASSES.GRID_COLUMN_HEAD_ACTIVE}`);
      },

      get columns() {
        return bag.dom.container.querySelectorAll(`.${CLASSES.GRID_COLUMN_HEAD_CONTENT}`);
      }

    }

  };

  return dom;

};

Dom.classes = {
  CUSTOM_COLUMN_CLASS: "test-class"
};

module.exports = Dom;
