import i18n from "../i18n";

const filters = {

  equals(property, value) {
    let result = {};
    console.log(property);
    return result;
  }

};

class Delegate {

  constructor() {
  }

  columns(store) {
    let {properties} = store.getState();

    function column({id, name}) {
      return {name, id, rel: `property_id[${id}]`};
    }

    let columns = properties.map(column);
    return [{name: i18n("id"), rel: "id"}].concat(columns);
  }

  rows(store, callback) {
    let {filter, sorting, pagination, properties} = store.getState();
    let {rel, order} = sorting;
    let {size, current} = pagination;
    let columns = this.columns(store);

    function normalize(product) {
      return {product, columns};
    }

    function success(__, {results, meta}) {
      let rows = results.map(normalize);
      callback(rows, meta.total);
    }

    function failed(error) {
      callback([{error}]);
    }

    let params = {
      orderby: order ? rel : `-${rel}`, 
      max: size,
      page: current
    };

    let {property, operator, filter_value} = filter || {};

    console.log(operator);
    if(property && operator && filters[operator.id])
      params.filter = filters[operator.id](property, filter_value);


    qwest.get(`/api/products`, params)
      .then(success)
      .catch(failed);

  }
}

export default Delegate;
