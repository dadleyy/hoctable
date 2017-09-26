class Delegate {

  constructor(bag) {
    this.bag = bag;
  }

  options(params, callback) {
    const { bag } = this;
    let { count } = bag.callbacks.options || { count: 0 };
    bag.callbacks.options = { callback, params, count: ++count };
  }

  isSelected(item) {
    const { bag } = this;
    return bag.selected.indexOf(item.id) !== -1;
  }

  translate(identifier, item) {
    const { bag } = this;
    return item ? item.text : bag.text;
  }

  toggle(item, callback) {
    const { bag } = this;
    bag.callbacks.toggle = { item, callback };
  }

}

module.exports = Delegate;
