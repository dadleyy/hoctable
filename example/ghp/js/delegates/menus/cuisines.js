import Zomato from "services/zomato";
import i18n from "services/i18n";

function lower(s) { return s.toLowerCase(); }

class Delegate {

  constructor(api_credentials, filters) {
    this.client = new Zomato(api_credentials);
    this.filters = filters;
    this.cache = [ ];
  }

  isSelected(item) {
    const { cuisine } = item;
    const { latest: filters } = this.filters;
    return (filters.cuisines || []).some(function({ cuisine_id }) { return cuisine_id === cuisine.cuisine_id; });
  }

  text() {
    let { latest: filters } = this.filters;
    let { cuisines } = filters;
    return cuisines && cuisines.length >= 1 ? `${i18n("selected")} (${cuisines.length})` : i18n("all_cuisines");
  }

  options(params, callback) {
    const { client, filters, cache } = this;
    const { query } = params;
    const { city } = filters.latest;

    function filter({ cuisine }) {
      const { cuisine_name } = cuisine;
      return lower(cuisine_name).indexOf(query) !== -1;
    }

    function loaded({ cuisines }) {
      const { warm } = cache;

      if(!warm) {
        cache.splice(0, 0, ...cuisines);
        cache.warm = true;
      }

      const filtered = (query ? cuisines.filter(filter) : cuisines).slice(0, 15);

      if(filtered.length === 0) {
        return callback([{ empty: true }]);
      }

      callback(filtered);
    }

    if(cache.warm) {
      return loaded({ cuisines: cache });
    }

    function failed(error) {
      console.error(error);
      const options = [{ error }];
      callback(options);
    }

    client.cuisines(city.id, query, { count: 5 }).then(loaded).catch(failed);
  }

  translate(identifier, item) {
    switch(identifier) {
      case "option":
        return item.empty ? i18n("no_results") : (item.cuisine ? item.cuisine.cuisine_name : i18n("unknown"));
      case "placeholder":
        return i18n("search");
      default:
        return "";
    }
  }

  toggle(option, done) {
    const { filters } = this;
    const { latest } = filters;
    const { cuisines } = latest;
    const { cuisine } = option;

    if(!cuisines || cuisines.length === 0) {
      filters.dispatch({ field: "cuisines", value: [cuisine] });
      return done();
    }

    // Clear out the previous list of cities from our filter.
    const new_list = latest.cuisines.filter(function({ cuisine_id }) { return cuisine_id !== cuisine.cuisine_id; });

    // If the filtered list was the same as it was, add the new city, otherwise use the filtered on.
    const value = new_list.length === latest.cuisines.length ? [cuisine].concat(new_list) : new_list;

    filters.dispatch({ field: "cuisines", value });
    done();
  }

}

export default Delegate;
