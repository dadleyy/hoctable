import Zomato from "services/zomato";
import i18n from "services/i18n";

class Delegate {

  constructor(api_credentials, filters) {
    this.client = new Zomato(api_credentials);
    this.filters = filters;
  }

  isSelected(item) {
    const { latest: filters } = this.filters;
    return (filters.cities || []).some(function({ id }) { return id === item.id; });
  }

  text() {
    let { latest: filters } = this.filters;
    let { cities } = filters;
    return cities && cities.length >= 1 ? `${i18n("selected")} (${cities.length})` : i18n("all_cities");
  }

  options(params, callback) {
    const { client, filters } = this;
    const { query } = params;
    const { city } = filters.latest;

    function loaded({ cuisines }) {
      if(cuisines.length === 0) {
        return callback([{ empty: true }]);
      }

      const options = cuisines.slice(0, 5);
      callback(options);
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
    const new_list = latest.cuisines.filter(function({ id }) { return id !== cuisine.id; });

    // If the filtered list was the same as it was, add the new city, otherwise use the filtered on.
    const value = new_list.length === latest.cities.length ? [cuisine].concat(new_list) : new_list;

    filters.dispatch({ field: "cuisines", value });
    done();
  }

}

export default Delegate;
