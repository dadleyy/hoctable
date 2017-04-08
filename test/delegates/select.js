class Delegate {

  constructor(bag) {
    this.bag = bag;
  }

  text() {
    const { bag } = this;
    return bag.selected_item ? bag.selected_item.name : bag.text;
  }

  options(callback) {
    const { bag } = this;
    bag.callbacks.options = callback;
  }

  select(item, callback) {
    const { bag } = this;
    bag.callbacks.select = { item, callback };
  }

}

module.exports = Delegate;
