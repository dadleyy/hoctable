import defer from "../services/defer";

import GenreDelegate from "../delegates/genre_menu";
import TableDelegate from "../delegates/table";
import Filters from "../services/filters";

const path = "/";
const view = "example/ghp/js/views/index";

// Index route
//
// Here we are demonstrating the initialization of application state inside a route's resolution phase. The goal here 
// is to prepare all of the necessary state/classes/instances that will be used in the view.

function resolve() {
  let filters = new Filters();
  let table_delegate = new TableDelegate(filters);
  let genre_delegate = new GenreDelegate(filters);

  return defer.resolve({ table_delegate, genre_delegate, filters });
}

export default { path, view, resolve };
