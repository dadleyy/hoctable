import OPS from "../var/operators";
import i18n from "../services/i18n";

import Filter from "../components/products/filter";
import ProductTable from "../components/products/table";
import * as React from "react";

class Products extends React.Component {

  constructor(props) {
    super(props)
    let {store} = props;

    function update() {
      this.setState({updated: Date.now()});
    }

    this.subscriptions = {store: store.subscribe(update.bind(this))};
  }

  componentWillUnmount() {
    let {subscriptions} = this;
    subscriptions.store();
  }

  clearFilters() {
    let {store} = this.props;
    store.dispatch({type: "CLEAR_FILTERS"});
    this.forceUpdate();
  }

  render() {
    let {props} = this;
    let {store, table: table_delegate} = props;

    // create the table that we will be rendering
    let table     = <ProductTable delegate={table_delegate} store={store} />;
    let controls  = [];
    let {filters} = store.getState();

    for(let i = 0, c = filters.length; i < c; i++) {
      let filter = <Filter filter={filters[i]} store={store} key={i} />;
      controls.push(filter);
    }

    return (
      <div className="clearfix products-view">
        <div className="clearfix">
          <div className="clearfix float-left margin-right-1">
            <a className="button" onClick={this.clearFilters.bind(this)}>{i18n("clear_filters")}</a>
          </div>
          <div className="products-view__controls overflow-hidden clearfix">{controls}</div>
        </div>
        <hr />
        <div className="products-view__table">{table}</div>
      </div>
    );
  }

}

export default Products;
