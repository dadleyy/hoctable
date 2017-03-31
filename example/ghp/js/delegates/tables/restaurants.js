import i18n from "services/i18n";
import Zomato from "services/zomato";

class Delegate {

  constructor(api_credentials, filters) {
    this.client = new Zomato(api_credentials);
    this.filters = filters;
  }

  columns() {
    return [
      { rel: "name",    name: i18n("name"),    style: { width: '30%' }   },
      { rel: "address", name: i18n("address"), style: { width: '70%' }   },
      { rel: "rating",  name: i18n("rating"),  style: { width: '210px' } }
    ];
  }

  rows(pagination, sorting, callback) {
    let { latest: filters } = this.filters;
    let { client } = this;
    let { current, size } = pagination;
    let start = current * size;
    let params = { };

    function toRow({ restaurant }) {
      return { restaurant };
    }

    function loaded(response) {
      const { results_found: total, restaurants } = response;
      const rows = restaurants.map(toRow);
      callback({ rows, total });
    }

    function failed(error) {
      console.error(error);
      let rows = [{ error }];
      callback({ rows });
    }

    if(filters.location) {
      let { latitude, longitude } = filters.location;
      params.lat = latitude;
      params.lon = longitude;
    }

    if(filters.title) {
      params.q = filters.title;
    }

    if(filters.category && filters.category.all !== true) {
      let { id: category_id } = filters.category;
      params.category = category_id;
    }

    return client.search({ start, count: size, ...params }).then(loaded).catch(failed);
  }

}

export default Delegate;
