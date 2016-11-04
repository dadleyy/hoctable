import {reducers, services} from "hoctable";

import Delegate from "./services/delegates/people/basic";
import PagedDelegate from "./services/delegates/people/paged";
import ProductDelegate from "./services/delegates/product_table";

import People from "./pages/people";
import Paged from "./pages/people_paged";
import Products from "./pages/products";
import FourOhFour from "./pages/missing";

function el(id) {
  return document.getElementById(id);
}

page("/products", function() {
  let {sorting, pagination} = reducers;

  function filter(current_state, payload) {
    let result = Object.assign({}, current_state);
    let {type} = payload;

    if(type === "PROPERTY_SELECTION") {
      let {property} = payload;
      result = {property};
    }

    if(type === "OPERATOR_SELECTION") {
      let {operator} = payload;
      Object.assign(result, {operator});
    }

    if(type === "FILTER_SELECTION") {
      let {filter_value} = payload;
      Object.assign(result, {filter_value});
    }

    return result;
  }

  function pass(current_state) {
    return current_state || [];
  }

  let reducer = Redux.combineReducers({sorting, pagination, filter, properties: pass});

  let delegate = new ProductDelegate();

  function warm(__, {results: properties}) {
    let store  = Redux.createStore(reducer, {
      properties: properties,
      sorting: {rel: "name"},
      pagination: {current: 0, size: 10},
      filter: {property: null}
    });

    ReactDOM.render(<Products table-delegate={delegate} store={store} />, el("main"));
  }

  function failed(error) {
    console.error(error);
    page("/error");
  }

  qwest.get(`/api/properties`)
    .then(warm)
    .catch(failed);
});

page("/people/paged", function() {
  let reducer = Redux.combineReducers({
    sorting: reducers.sorting,
    pagination: reducers.pagination
  });

  // prepare our sort store
  let store  = Redux.createStore(reducer, {
    sorting: {rel: "name"},
    pagination: {current: 0, size: 3}
  });

  // create an instance of the table delegate
  let delegate = new PagedDelegate();

  ReactDOM.render(<Paged delegate={delegate} store={store} />, el("main"));
});


page("/people", function() {
  let reducer = Redux.combineReducers({sorting: reducers.sorting});

  // prepare our sort store
  let store  = Redux.createStore(reducer, {sorting: {rel: "name"}});

  // create an instance of the table delegate
  let delegate = new Delegate();

  // render the people view onto the main view element
  ReactDOM.render(<People delegate={delegate} store={store} />, el("main"));
});



page("*", function() {
  ReactDOM.render(<FourOhFour />, el("main"));
});

services.Popups.mount(el("popups"));
services.Viewport.bind();
page.start({popstate: true})
