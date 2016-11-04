import {replace} from "../util";
import i18n from "../i18n";
import OPERATORS from "../../var/operators";

class MenuDelegate {

  constructor(filter_store) {
    this.filter_store = filter_store;
  }

  text() {
    let {filter_store} = this;
    let {filter: {operator}} = filter_store.getState();
    return operator ? operator.text : i18n("select_operator");
  }

  options(callback) {
    let {filter_store} = this;
    let {filter: {property}} = filter_store.getState();
    let available_ops = [];

    switch(property.type) {
      case "enumerated":
        available_ops = [OPERATORS.EQUALS, OPERATORS.HAS_VALUE, OPERATORS.HAS_NO_VALUE, OPERATORS.IS_ANY];
        break;
      default:
        available_ops = [{text: i18n("unknown_property")}];
        break;
    }

    callback(available_ops);
  }

  select(operator, callback) {
    let {filter_store} = this;
    filter_store.dispatch({type: "OPERATOR_SELECTION", operator});
    callback(false);
  }

  translate({text}) { return text; }

}

export default MenuDelegate;
