class Delegate {

  constructor(bag, cycle_delay, full_delay) {
    this.bag = bag;
    this.delays = { cycle: cycle_delay, fullscreen: full_delay };
  }

  items(callback) {
    const { bag } = this;
    let { count } = bag.callbacks.items || { count: 0 };
    bag.callbacks.items = { callback, count: ++count };
  }

  interval() {
    return this.delays.cycle;
  }

  delay() {
    return this.delays.fullscreen;
  }

}

module.exports = Delegate;
