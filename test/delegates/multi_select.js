class Delegate {

  constructor(bag) {
    this.bag = bag;
  }

  text() {
    const { bag } = this;
    return bag.text;
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
    return item ? item.text : "placeholder";
  }

  toggle(item, callback) {
    const { bag } = this;
    bag.callbacks.toggle = { item, callback };
  }

}

module.exports = Delegate;
