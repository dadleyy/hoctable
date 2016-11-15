import i18n from "../i18n";

class EnumDelegate {

  constructor(store, filter) {
    this.filter = filter;
    this.store  = store;
  }

  options(callback) {
    let {filter} = this;
    let {property: {values}} = filter;
    callback(values);
  }

  select(value, callback) {
    let {store, filter} = this;
    store.dispatch({type: "VALUE_SELECTION", value, filter});
    callback(false);
  }

  text() {
    let {filter} = this;
    let {value} = filter;
    return value || i18n("select_value");
  }

  translate(enum_value) { return enum_value; }

}

export default EnumDelegate;
