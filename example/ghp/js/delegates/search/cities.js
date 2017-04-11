import Zomato from "services/zomato";
import i18n from "services/i18n";

class Delegate {

  constructor(api_credentials, filters) {
    this.client = new Zomato(api_credentials);
    this.filters = filters;
    this.cache = { };
  }

  text() {
    let { latest: filters } = this.filters;
    let { cities } = filters;
    return cities && cities.length >= 1 ? `${i18n("selected")} (${cities.length})` : i18n("all_cities");
  }

  search(query, callback) {
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

    client.cities(query).then(loaded).catch(failed);
  }

  translate(identifier, item) {
    switch(identifier) {
      case "selection":
      case "option":
        return item.empty ? i18n("no_results") : item.name || i18n("unknown");
      case "placeholder":
        return i18n("search");
      default:
        return "";
    }
  }

  select(value, done) {
    const { filters } = this;
    filters.dispatch({ field: "city", value });
    done(value);
  }

}

export default Delegate;
