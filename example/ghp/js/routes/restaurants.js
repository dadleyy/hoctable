import defer from "services/defer";
import * as env from "config/environment";

import Filters from "services/filters";
import TableDelegate from "delegates/tables/restaurants";
import CategoryDelegate from "delegates/menus/categories";
import CityDelegate from "delegates/menus/cities";

const path = "restaurants";
const view = "example/ghp/js/views/restaurants";

function resolve() {
  const { access_token, api_base_url } = env.zomato || { };

  if(!access_token) {
    return defer.reject(new Error("invalid contentful configuration"));
  }

  const filters = new Filters();
  const table_delegate = new TableDelegate({ access_token, api_base_url }, filters);
  const category_delegate = new CategoryDelegate({ access_token, api_base_url }, filters);
  const city_delegate = new CityDelegate({ access_token, api_base_url }, filters);

  return defer.resolve({ filters, table_delegate, category_delegate, city_delegate });
}

export default { path, view, resolve };
