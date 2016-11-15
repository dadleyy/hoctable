import i18n from "../services/i18n";

import Menu from "../components/menu";
import ProductTable from "../components/product_table";

import PropertyDelegate from "../services/delegates/property_menu";
import OperatorDelegate from "../services/delegates/operator_menu";
import EnumDelegate from "../services/delegates/enum_menu";


function control(content, key) {
  let style = {marginRight: "1rem"};
  return (<div className="float-left" style={style} key={key}>{content}</div>);
}

function Controls({filter, store}) {
  let property_delegate = new PropertyDelegate(store, filter);
  let controls = [control(<Menu delegate={property_delegate} />, "property")];

  let {property, operator, value} = filter;

  if(!property)
    return (<div className="control-group">{controls}</div>);

  let operator_delegate = new OperatorDelegate(store, filter);
  controls.push(control(<Menu delegate={operator_delegate} />, "operator"))

  if(!operator)
    return (<div className="control-group">{controls}</div>);

  if(operator.id === "equals" && property.type === "enumerated") {
    let enum_delegate = new EnumDelegate(store, filter);
    controls.push(control(<Menu delegate={enum_delegate} />, "enum"));
  }

  return (<div className="control-group">{controls}</div>);
}

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

  render() {
    let {props} = this;
    let {store, table: table_delegate} = props;

    // create the table that we will be rendering
    let table     = <ProductTable delegate={table_delegate} store={store} />;
    let controls  = [];
    let {filters} = store.getState();

    for(let i = 0, c = filters.length; i < c; i++) {
      let control_group = <Controls filter={filters[i]} store={store} key={i} />;
      controls.push(control_group);
    }

    return (
      <div className="clearfix products-view">
        <div className="products-view__controls clearfix">{controls}</div>
        <hr />
        <div className="products-view__table">{table}</div>
      </div>
    );
  }

}

export default Products;
