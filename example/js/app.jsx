import Delegate from "./services/delegate";

import People from "./pages/people";
import FourOhFour from "./pages/missing";

import sortingReducer from "./reducers/sorting";

function el(id) {
  return document.getElementById(id);
}

page("/people", function() {
  // prepare our sort store
  let sorting  = Redux.createStore(sortingReducer, {rel: "name"});
  // create an instance of the table delegate
  let delegate = new Delegate(sorting);
  // render the people view onto the main view element
  ReactDOM.render(<People delegate={delegate} sorting={sorting} />, el("main"));
});



page("*", function() {
  ReactDOM.render(<FourOhFour />, el("main"));
});

page.start({popstate: true})
