import { MultiSelect as MultiSelectFactory, Select as SelectFactory } from "hoctable";

import PropertyDelegate from "../../services/delegates/property_menu";
import OperatorDelegate from "../../services/delegates/operator_menu";
import EnumDelegate from "../../services/delegates/enum_menu";

import OPS from "../../var/operators";
import i18n from "../../services/i18n";
import * as React from "react";

// compose a menu using the default transclusion
const SingleSelect = SelectFactory();
const MultiSelect = MultiSelectFactory();

const {
  HAS_VALUE    : { id: HAS_VALUE }, 
  HAS_NO_VALUE : { id: HAS_NO_VALUE },
  EQUALS       : { id: EQUALS },
  IS_ANY       : { id: IS_ANY }
} = OPS;

function ValueInput({ filter, store }) {
  let {property, operator, value} = filter;

  function changed({ target: { value } }) {
    store.dispatch({ type: "VALUE_SELECTION", value, filter });
  }

  let placeholder = null;

  switch(operator.id) {
    case OPS.IS_ANY.id:
      placeholder = i18n("placeholders.comma_separated_values");
      break;
    default:
      placeholder = i18n("placeholders.enter_value");
  }

  return (<input type="text" onChange={changed} placeholder={placeholder} className="margin-bottom-0" />);
}

function control(content, key) {
  let style = { marginRight: "1rem" };
  return (<div className="float-left" style={style} key={key}>{content}</div>);
}

export default function Filter({ filter, store }) {
  let property_delegate = new PropertyDelegate(store, filter);

  // start this control group out with a single select that will control the property associated w/ this filter
  let controls = [control(<SingleSelect delegate={property_delegate} />, "property")];

  let { property, operator, value } = filter;

  // if the user has not selected a property, we're done here
  if(!property)
    return (<div className="control-group">{controls}</div>);

  // create and add to our group a delegate and single select to control the operator associated with this filter
  let operator_delegate = new OperatorDelegate(store, filter);
  controls.push(control(<SingleSelect delegate={operator_delegate} />, "operator"))

  // if there is not an operator selector, or the operator is simply checking the presence of a value, we're done
  // rendering out controls.
  if(!operator || operator.id === HAS_VALUE || operator.id === HAS_NO_VALUE)
    return (<div className="control-group">{controls}</div>);

  // if the user has chosen to filter for direct eqivalence on a property that has a pre-defined set of possible
  // values, create a single select that will allow them to choose that.
  if(operator.id === EQUALS && property.type === "enumerated") {
    let enum_delegate = new EnumDelegate(store, filter);
    controls.push(control(<SingleSelect delegate={enum_delegate} />, "enum"));
    return (<div className="control-group">{controls}</div>);
  }

  // if the user has chosen to match against any value of a property who's possible values are a pre-defined set,
  // we have a multi select situation.
  if(operator.id === IS_ANY && property.type === "enumerated") {
    let enum_delegate = new EnumDelegate.Multi(store, filter);
    controls.push(control(<MultiSelect delegate={enum_delegate} />, "enum"));
    return (<div className="control-group">{controls}</div>);
  }

  // if none of the above cases are matched, we need to render out an input - the user is filtering a non-enumerated
  // property by either checking values that contain a string, or values that directly equal a string
  controls.push(
    <div className="overflow-hidden height-auto" key="value">
      <ValueInput filter={filter} store={store} />
    </div>
  );

  return (<div className="control-group">{controls}</div>);
}
