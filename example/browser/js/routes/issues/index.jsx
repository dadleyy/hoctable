import {reducers, services} from "hoctable";
import Page from "../../pages/issues/index";
import Delegate from "../../services/delegates/issues/table";

const {pagination, sorting} = reducers;

function Index(context) {
  let {org, repo} = context.params;
  let delegate = new Delegate(org, repo);
  let reducer  = Redux.combineReducers({pagination, sorting});
  let store    = Redux.createStore(reducer, {pagination: {current: 0, size: 25}});
  return Q.resolve(<Page table={delegate} store={store} />);
}

export default Index;
