import {replace} from "../util";
import i18n from "../i18n";

class MenuDelegate {

  constructor(filter_store) {
    this.filter_store = filter_store;
  }

  text() {
    let {filter_store} = this;
    let {filter: {property: selected_property}} = filter_store.getState();
    return selected_property ? selected_property.name : i18n("select_property");
  }

  options(callback) {
    let {filter_store} = this;
    let {properties} = filter_store.getState();
    return callback(properties);
  }

  select(property, callback) {
    let {filter_store} = this;
    filter_store.dispatch({type: "PROPERTY_SELECTION", property});
    callback(false);
  }

  translate({name}) { return name; }

}

export default MenuDelegate;
