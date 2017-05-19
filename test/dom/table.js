const { CLASSES } = require("hoctable/hoc/table");

module.exports = function(bag) {

  function find(selector) {
    return bag.dom.container.querySelectorAll(selector);
  }

  const dom = {
    find,

    get colgroup() {
      return bag.dom.container.querySelector(`.${CLASSES.TABLE} colgroup`);
    },

    pagination: {

      get container() {
        return bag.dom.container.querySelector(`.${CLASSES.PAGINATION}`);
      },

      get previous() {
        return bag.dom.container.querySelector(`.${CLASSES.PAGINATION_PREVIOUS}`);
      },

      get next() {
        return bag.dom.container.querySelector(`.${CLASSES.PAGINATION_NEXT}`);
      }

    },

    get rows() {
      return find(`.${CLASSES.TABLE_TBODY}`);
    },

    get non_sortable_columns() {
      return find(`.${CLASSES.TABLE_HEADER_CELL}:not(.${CLASSES.TABLE_HEADER_CELL_SORTABLE})`);
    },

    get sortable_columns() {
      return find(`.${CLASSES.TABLE_HEADER_CELL_SORTABLE}`);
    },

    custom: {

      get columns() {
        return find("[data-rel=test-column-inner]");
      }

    },

    default: {

      get active_columns() {
        return find(`.${CLASSES.TABLE_HEADER_CELL_ACTIVE}`);
      },

      get columns() {
        return find(`.${CLASSES.TABLE_HEAD} th`);
      }

    }

  };

  return dom;

};
