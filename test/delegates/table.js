class Delegate {

  constructor(bag) {
    this.bag = bag;
  }

  columns() {
    const { bag } = this;
    return bag.columns;
  }

  rows(pagination, sorting, callback) {
    const { bag } = this;
    bag.callbacks.rows = { pagination, sorting, callback };
  }

}

module.exports = Delegate;
