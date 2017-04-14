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
    const { options } = bag.callbacks;
    const count = options && options.count ? options.count + 1 : 1;

    bag.callbacks.options = { callback, count };
  }

  select(item, callback) {
    const { bag } = this;
    const { select } = bag.callbacks;

    const count = (select && select.count ? select.count : 0) + 1;

    bag.callbacks.select = { item, callback, count };
  }

}

module.exports = Delegate;
