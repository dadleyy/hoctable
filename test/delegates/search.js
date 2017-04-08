class SearchDelegate {

  constructor(bag) {
    this.bag = bag;
  }

  select(item, callback) {
    const { bag } = this;
    bag.callbacks.select = { item, callback };
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
    bag.callbacks.search = { query, callback };
  }

}

module.exports = SearchDelegate;
