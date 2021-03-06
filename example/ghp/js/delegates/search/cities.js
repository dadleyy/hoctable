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

      callback(location_suggestions);
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
      case "option":
      case "selection":
        return item.empty ? i18n("no_results") : item.name || i18n("unknown");
      case "placeholder":
        return i18n("search_cities");
      default:
        return "";
    }
  }

  select(value, done) {
    const { filters } = this;
    const payloads = [{ field: "city", value }];

    if(value === null) {
      payloads.push({ field: "cuisines", value: null });
    }

    filters.dispatch(...payloads);
    done(value);
  }

}

export default Delegate;
