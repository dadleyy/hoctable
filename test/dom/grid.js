const { CLASSES: TABLE_CLASSES } = require("hoctable/hoc/table");
const { CLASSES } = require("hoctable/hoc/grid");
 
function Dom(bag) {

  function find(selector) {
    return bag.dom.container.querySelectorAll(selector);
  }

  const dom = {

    find,

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
      return find(`.${Dom.classes.CUSTOM_COLUMN_CLASS}`);
    },

    get columns() {
      return find(`.${CLASSES.GRID_COLUMN_HEAD}`);
    },

    get rows() {
      return find(`.${CLASSES.GRID_ROW_CONTAINER}`);
    },

    get non_sortable_columns() {
      return find(`.${CLASSES.GRID_COLUMN_HEAD}:not(.${CLASSES.GRID_COLUMN_HEAD_SORTABLE})`);
    },

    get sortable_columns() {
      return find(`.${CLASSES.GRID_COLUMN_HEAD_SORTABLE}`);
    },

    custom: {

      get columns() {
        return find(`.${Dom.classes.CUSTOM_COLUMN_TRANSCLUSION_CLASS}`);
      }

    },

    default: {

      get active_columns() {
        return find(`.${CLASSES.GRID_COLUMN_HEAD_ACTIVE}`);
      },

      get columns() {
        return find(`.${CLASSES.GRID_COLUMN_HEAD_CONTENT}`);
      }

    }

  };

  return dom;

};

Dom.classes = {
  CUSTOM_COLUMN_CLASS: "test-class",
  CUSTOM_COLUMN_TRANSCLUSION_CLASS: "custom-column-transclusion"
};

module.exports = Dom;
