import {replace} from "../util";
import i18n from "../i18n";

class MenuDelegate {

  constructor(store, filter) {
    this.store  = store;
    this.filter = filter;
  }

  text() {
    let {filter: {property}} = this;
    return property ? property.name : i18n("select_property");
  }

  options(callback) {
    let {store} = this;
    let {properties} = store.getState();
    return callback(properties);
  }

  select(property, callback) {
    let {store, filter} = this;
    let payload = {filter, property};
    store.dispatch({type: "PROPERTY_SELECTION", filter, property});
    callback(false);
  }

  translate({name}) { return name; }

}

export default MenuDelegate;
