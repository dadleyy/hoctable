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

  function filters(current_state, payload) {
    let result = [];

    if(!current_state)
      return result;

    if(payload.type === "CLEAR_FILTERS")
      return [{property: null}];

    if(!payload.filter)
      return current_state;

    for(let i = 0, c = current_state.length; i < c; i++) {
      let {id, property, operator, value} = current_state[i];

      if(id !== payload.filter.id) {
        result.push({id, property, operator, value});
        continue;
      }

      let current = {id, property, operator, value};

      if(payload.type === "PROPERTY_SELECTION") {
        result.push({id, property: payload.property});
        continue;
      }

      if(payload.type === "VALUE_SELECTION") {
        result.push({id, property, operator, value: payload.value});
        continue;
      }

      current = {id, property, operator: payload.operator};

      // if we're enumerated, start w/ all selected
      if(property.type === "enumerated" && payload.operator.id == "is_any") {
        current.value = property.values.slice(0);
      }

      result.push(current);
    }

    return result;
  }

  function pass(current_state) {
    return current_state || [];
  }

  let reducer = Redux.combineReducers({sorting, pagination, filters, properties: pass});

  let delegate = new ProductDelegate();

  function warm(__, {results: properties}) {
    let store  = Redux.createStore(reducer, {
      properties: properties,
      sorting: {rel: "name"},
      pagination: {current: 0, size: 10},
      filters: [{id: 1, property: null}]
    });

    ReactDOM.render(<Products table={delegate} store={store} />, el("main"));
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
