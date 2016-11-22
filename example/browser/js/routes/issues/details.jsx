import {reducers, services} from "hoctable";
import Page from "../../pages/issues/details";
import Delegate from "../../services/delegates/issues/comments_table";

const {pagination, sorting} = reducers;

function Details(context) {
  let {org, number, repo} = context.params;

  let reducer  = Redux.combineReducers({pagination, sorting});
  let store    = Redux.createStore(reducer, {pagination: {current: 0, size: 25}});

  function success(__, {results: issue}) {
    let delegate = new Delegate(org, repo, number);
    return Q.resolve(<Page issue={issue} table={delegate} store={store } />);
  }

  return qwest.get(`/api/issues`, {org, repo, number}).then(success);
}

export default Details;
