import {reducers, services} from "hoctable";
import People from "../../pages/people";
import Delegate from "../../services/delegates/people/basic";

function Basic() {
  let reducer = Redux.combineReducers({sorting: reducers.sorting});

  // prepare our sort store
  let store  = Redux.createStore(reducer, {sorting: {rel: "name"}});

  // create an instance of the table delegate
  let delegate = new Delegate();

  // render the people view onto the main view element
  return Q.resolve(<People delegate={delegate} store={store} />);
}

export default Basic;
