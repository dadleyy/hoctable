import {stores} from "hoctable";
import i18n from "../i18n";
import OPS from "../../var/operators";

const {HAS_VALUE: {id: HAS_VALUE}} = OPS;
const {HAS_NO_VALUE: {id: HAS_NO_VALUE}} = OPS;
const {IS_ANY: {id: IS_ANY}} = OPS;

class Delegate {

  constructor(store) {
    this.store = store;
    this.state = {sorting: {}, pagination: {current: 0, size: 10}};
  }

  goTo(new_page, callback) {
    this.state.pagination.current = new_page;
    callback();
  }

  sortBy(column, callback) {
    let {sorting} = this.state;

    if(sorting.rel === column.rel)
      sorting.direction = !sorting.direction;

    sorting.rel = column.rel;
    callback();
  }

  pagination() {
    return this.state.pagination;
  }

  sorting() {
    return this.state.sorting;
  }

  columns() {
    let {store} = this;
    let {properties} = store.getState();

    function column({id, name}) {
      return {name, id, rel: `property_id[${id}]`};
    }

    let columns = properties.map(column);
    return [{name: i18n("id"), rel: "id"}].concat(columns);
  }

  rows(callback) {
    let {properties, state, store} = this;
    let {sorting, pagination} = state;
    let {rel: orderby, direction} = sorting;
    let {size, current} = pagination;
    let {filters} = store.getState();

    let columns = this.columns(store);

    function normalize(product) {
      return {product, columns};
    }

    function success(__, {results, meta}) {
      let rows = results.map(normalize);
      pagination.total = meta.total;
      callback(rows);
    }

    function failed(error) {
      callback([{error}]);
    }

    let params = {
      orderby : orderby,
      max     : size,
      page    : current,
      filters : []
    };

    for(let i = 0, c = filters.length; i < c; i++) {
      let {property, operator, value} = filters[i];

      if(!property || !operator) 
        continue;

      let valueless_op = operator.id === HAS_VALUE || operator.id === HAS_NO_VALUE;

      // if we don't need a value we can skip ahead here
      if(valueless_op) {
        params.filters.push({property: property.id, operator: operator.id});
        continue;
      }

      if(!value)
        continue;

      if(operator.id === IS_ANY && property.type === "string" || property.type === "number")
        value = value.split(",");

      params.filters.push({property: property.id, operator: operator.id, value});
    }

    qwest.get(`/api/products`, params)
      .then(success)
      .catch(failed);

  }
}

export default Delegate;
