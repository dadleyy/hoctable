class SearchDelegate {

  constructor(bag) {
    this.bag = bag;
  }

  select(item, callback) {
    const { bag } = this;
    let { count } = bag.callbacks.select || { count: 0 };
    count++;
    bag.callbacks.select = { item, callback, count };
  }

  translate(identifier, item) {
    switch(identifier) {
      case "placeholder":
        return "search";
      default:
        return "whoa";
    }
  }

  search(query, callback) {
    const { bag } = this;
    let { count } = bag.callbacks.search || { count: 0 };
    count++;
    bag.callbacks.search = { query, callback, count };
  }

}

module.exports = SearchDelegate;
