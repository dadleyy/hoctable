import {reducers, services} from "hoctable";
import Paged from "../../pages/people_paged";
import PagedDelegate from "../../services/delegates/people/paged";

function Route() {
  let {sorting, pagination} = reducers;

  let reducer = Redux.combineReducers({sorting, pagination});

  // prepare our sort store
  let store  = Redux.createStore(reducer, {
    sorting: {rel: "name"},
    pagination: {current: 0, size: 3}
  });

  // create an instance of the table delegate
  let delegate = new PagedDelegate();

  return Q.resolve(<Paged delegate={delegate} store={store} />);
}

export default Route;

