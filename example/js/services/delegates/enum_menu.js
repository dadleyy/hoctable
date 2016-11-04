import i18n from "../i18n";

class EnumDelegate {

  constructor(property, store) {
    this.property = property;
    this.filter_store = store;
  }

  options(callback) {
    let {property: {values}, filter_store} = this;
    callback(values);
  }

  select(filter_value, callback) {
    let {filter_store} = this;
    filter_store.dispatch({type: "FILTER_SELECTION", filter_value});
    callback(false);
  }

  text() {
    let {filter_store} = this;
    let {filter: {filter_value}} = filter_store.getState();
    return filter_value || i18n("select_value");
  }

  translate(enum_value) { return enum_value; }

}

export default EnumDelegate;
