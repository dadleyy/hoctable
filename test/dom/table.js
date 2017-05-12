const { CLASSES } = require("hoctable/hoc/table");

module.exports = function(bag) {

  const dom = {

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
      return bag.dom.container.querySelectorAll(`.${CLASSES.TABLE_TBODY}`);
    },

    default: {

      get active_columns() {
        return bag.dom.container.querySelectorAll(`.${CLASSES.TABLE_HEADER_CELL_ACTIVE}`);
      },

      get columns() {
        return bag.dom.container.querySelectorAll(`.${CLASSES.TABLE_HEAD} th`);
      }

    }

  };

  return dom;

};
