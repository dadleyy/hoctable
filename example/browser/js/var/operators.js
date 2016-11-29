import i18n from "../services/i18n";

const OPERATORS = {
  EQUALS       : {text: i18n("operators.equals"), id: "equals"},
  GREATER_THAN : {text: i18n("operators.greater_than"), id: "greater_than"},
  LESS_THAN    : {text: i18n("operators.less_than"), id: "less_than"},

  HAS_VALUE    : {text: i18n("operators.has_value"), id: "has_value"},
  HAS_NO_VALUE : {text: i18n("operators.has_no_value"), id: "has_no_value"},

  IS_ANY       : {text: i18n("operators.is_any"), id: "is_any"},
  CONTAINS     : {text: i18n("operators.contains"), id: "contains"}
};

export default OPERATORS;
