import i18n from "../services/i18n";

import Menu from "../components/menu";
import ProductTable from "../components/product_table";

import PropertyDelegate from "../services/delegates/property_menu";
import OperatorDelegate from "../services/delegates/operator_menu";
import EnumDelegate from "../services/delegates/enum_menu";

function control(content, key) {
  let control_style = {marginRight: "1rem"};
  return (<div className="float-left" style={control_style} key={key}>{content}</div>);
}

class Products extends React.Component {

  constructor(props) {
    super(props)
    let {store} = props;

    this.property_delegate = new PropertyDelegate(store);
    this.operator_delegate = new OperatorDelegate(store);

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
    let {property_delegate, props, operator_delegate} = this;
    let {store, "table-delegate": table_delegate} = props;

    // start our collection of controls
    let controls = [control(<Menu delegate={property_delegate} />, "property_menu")];

    // create the table that we will be rendering
    let table = <ProductTable delegate={table_delegate} store={store} />;

    let {filter: {property, operator}} = store.getState();

    if(property)
      controls.push(control(<Menu delegate={operator_delegate} />, "operator_menu"));

    if(operator && operator.id === "equals" && property.type === "enumerated") {
      let enum_delegate = new EnumDelegate(property, store);
      controls.push(control(<Menu delegate={enum_delegate} />, "enum_menu"));
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
