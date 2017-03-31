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
    return filters.category ? filters.category.name : i18n("all_categories");
  }

  options(callback) {
    let { client, cache } = this;

    function loaded({ categories }) {
      let options = categories.map(function({ categories }) { return categories; });
      cache.categories = categories;
      cache.warm = true;
      callback([{ name: i18n("all_categories"), all: true }].concat(options));
    }

    function failed(error) {
      console.error(error);
      let options = [{ error }];
      callback(options);
    }

    if(cache.warm) {
      return loaded(cache);
    }

    client.categories().then(loaded).catch(failed);
  }

  translate(item) {
    return item.name || i18n("unknown");
  }


  select(category, done) {
    let { filters } = this;
    filters.dispatch({ field: "category", value: category });
    done();
  }

}

export default Delegate;
