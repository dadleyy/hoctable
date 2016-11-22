import i18n from "../i18n";

class EnumDelegate {

  constructor(store, filter) {
    this.filter_id = filter.id;
    this.store     = store;
  }

  get filter() {
    let {store, filter_id} = this;
    let {filters} = store.getState();
    let result = {};

    for(let i = 0, c = filters.length; i < c; i++) {
      let {id} = filters[i];
      if(id === filter_id) return filters[i];
    }

    return {};
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

EnumDelegate.Multi = class MultiDelegate extends EnumDelegate {

  constructor(store, filter) {
    super(store, filter);
  }

  isSelected(item) {
    let {filter} = this;
    let {value}  = filter;
    return value && value.length && filter.value.indexOf(item) !== -1;
  }

  toggle(item, callback) {
    let {filter, store} = this;
    let {value} = filter;

    if(!value)
      value = [];

    let index = value.indexOf(item);

    if(index !== -1) {
      value.splice(index, 1);
      store.dispatch({type: "VALUE_SELECTION", value, filter});
      return callback(false);
    }

    value.push(item);
    store.dispatch({type: "VALUE_SELECTION", value, filter});
    callback(false);
  }

  text() {
    let {filter} = this;
    let {value}  = filter;
    return `${i18n("select_value")} (${value ? value.length : 0})`;
  }

}

export default EnumDelegate;
