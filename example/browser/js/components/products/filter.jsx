import {hoc} from "hoctable";

import PropertyDelegate from "../../services/delegates/property_menu";
import OperatorDelegate from "../../services/delegates/operator_menu";
import EnumDelegate from "../../services/delegates/enum_menu";

import OPS from "../../var/operators";
import i18n from "../../services/i18n";
import * as React from "react";

// compose a menu using the default transclusion
const SingleSelect = hoc.Select();
const MultiSelect  = hoc.MultiSelect();
const {HAS_VALUE: {id: HAS_VALUE}, HAS_NO_VALUE: {id: HAS_NO_VALUE}} = OPS;

function ValueInput({filter, store}) {
  let {property, operator, value} = filter;

  function changed({target: {value}}) {
    store.dispatch({type: "VALUE_SELECTION", value, filter});
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
  let style = {marginRight: "1rem"};
  return (<div className="float-left" style={style} key={key}>{content}</div>);
}

function Filter({filter, store}) {
  let property_delegate = new PropertyDelegate(store, filter);
  let controls = [control(<SingleSelect delegate={property_delegate} />, "property")];

  let {property, operator, value} = filter;

  if(!property)
    return (<div className="control-group">{controls}</div>);

  let operator_delegate = new OperatorDelegate(store, filter);
  controls.push(control(<SingleSelect delegate={operator_delegate} />, "operator"))

  if(!operator || operator.id === HAS_VALUE || operator.id === HAS_NO_VALUE)
    return (<div className="control-group">{controls}</div>);

  if(operator.id === "equals" && property.type === "enumerated") {
    let enum_delegate = new EnumDelegate(store, filter);
    controls.push(control(<SingleSelect delegate={enum_delegate} />, "enum"));
    return (<div className="control-group">{controls}</div>);
  }

  if(operator.id === "is_any" && property.type === "enumerated") {
    let enum_delegate = new EnumDelegate.Multi(store, filter);
    controls.push(control(<MultiSelect delegate={enum_delegate} />, "enum"));
    return (<div className="control-group">{controls}</div>);
  }

  controls.push(
    <div className="overflow-hidden height-auto" key="value">
      <ValueInput filter={filter} store={store} />
    </div>
  );

  return (<div className="control-group">{controls}</div>);
}

export default Filter;
