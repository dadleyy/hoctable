import {reducers} from "hoctable";
import Delegate from "./services/delegate";
import People from "./pages/people";
import FourOhFour from "./pages/missing";

function el(id) {
  return document.getElementById(id);
}

page("/people", function() {
  let reducer = Redux.combineReducers({sorting: reducers.sorting});

  // prepare our sort store
  let store  = Redux.createStore(reducer, {sorting: {rel: "name"}});

  // create an instance of the table delegate
  let delegate = new Delegate(store);

  // render the people view onto the main view element
  ReactDOM.render(<People delegate={delegate} store={store} />, el("main"));
});



page("*", function() {
  ReactDOM.render(<FourOhFour />, el("main"));
});

page.start({popstate: true})
