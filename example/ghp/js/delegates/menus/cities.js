import Zomato from "services/zomato";
import i18n from "services/i18n";

class Delegate {

  constructor(api_credentials, filters) {
    this.client = new Zomato(api_credentials);
    this.filters = filters;
    this.cache = { };
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
    let { client, cache } = this;

    function loaded({ location_suggestions }) {
      if(location_suggestions.length === 0) {
        return callback([{ empty: true }]);
      }

      const options = [{ name: i18n("all_cities"), all: true }].concat(location_suggestions);
      callback(options);
    }

    function failed(error) {
      console.error(error);
      let options = [{ error }];
      callback(options);
    }

    if(cache.warm) {
      return loaded(cache);
    }

    const { query } = params;
    client.cities(query).then(loaded).catch(failed);
  }

  translate(identifier, item) {
    switch(identifier) {
      case "option":
        return item.name || i18n("unknown");
      case "placeholder":
        return i18n("search");
      default:
        return "";
    }
  }

  toggle(city, done) {
    const { filters } = this;
    const { latest } = filters;
    const { cities } = latest;

    if(!cities || cities.length === 0) {
      filters.dispatch({ field: "cities", value: [city] });
      return done();
    }

    // Clear out the previous list of cities from our filter.
    const new_list = latest.cities.filter(function({ id }) { return id !== city.id; });

    // If the filtered list was the same as it was, add the new city, otherwise use the filtered on.
    const value = new_list.length === latest.cities.length ? [city].concat(new_list) : new_list;

    filters.dispatch({ field: "cities", value });
    done();
  }

}

export default Delegate;
