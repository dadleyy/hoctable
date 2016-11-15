import {replace} from "../util";
import i18n from "../i18n";
import OPS from "../../var/operators";

class MenuDelegate {

  constructor(store, filter) {
    this.store  = store;
    this.filter = filter;
  }

  text() {
    let {store, filter} = this;
    let {operator} = filter;
    return operator ? operator.text : i18n("select_operator");
  }

  options(callback) {
    let {store, filter} = this;
    let {property} = filter;
    let available_ops = [];

    switch(property.type) {
      case "enumerated":
        available_ops = [OPS.EQUALS, OPS.HAS_VALUE, OPS.HAS_NO_VALUE, OPS.IS_ANY];
        break;
      default:
        available_ops = [{text: i18n("unknown_property")}];
        break;
    }

    callback(available_ops);
  }

  select(operator, callback) {
    let {store, filter} = this;
    store.dispatch({type: "OPERATOR_SELECTION", filter, operator});
    callback(false);
  }

  translate({text}) { return text; }

}

export default MenuDelegate;
