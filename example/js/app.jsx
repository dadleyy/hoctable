import {reducers} from "hoctable";

import Delegate from "./services/delegate";
import PagedDelegate from "./services/paged_delegate";

import People from "./pages/people";
import Paged from "./pages/paged";
import FourOhFour from "./pages/missing";

function el(id) {
  return document.getElementById(id);
}

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

  delegate.rows(store, function(rows, total) {
    store.dispatch({type: "PAGINATION_TOTAL", total});
    // render the people view onto the main view element
    ReactDOM.render(<Paged delegate={delegate} store={store} />, el("main"));
  });

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

page.start({popstate: true})
