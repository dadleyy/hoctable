import {services} from "hoctable";
import ProductDelegate from "../../services/delegates/product_table";
import Products from "../../pages/products";

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

function Index() {
  let reducer        = Redux.combineReducers({filters, properties: pass});
  let initial_filter = {id: 1, property: null};

  function warm(__, {results: properties}) {
    let store  = Redux.createStore(reducer, {properties, filters: [initial_filter]});
    let delegate = new ProductDelegate(store);
    return Q.resolve(<Products table={delegate} store={store} />);
  }

  function failed(error) {
    console.error(error);
    page("/error");
  }

  return qwest.get(`/api/properties`)
    .then(warm)
    .catch(failed);
}

export default Index;
