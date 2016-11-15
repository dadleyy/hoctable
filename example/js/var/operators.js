import i18n from "../services/i18n";

const OPERATORS = {
  EQUALS       : {text: i18n("operators.equals"), id: "equals", op: "eq"},
  GREATER_THAN : {text: i18n("operators.greater_than"), id: "greater_than", op: "gt"},
  LESS_THAN    : {text: i18n("operators.less_than"), id: "less_than", op: "lt"},

  HAS_VALUE    : {text: i18n("operators.has_value"), id: "has_value", op: "ne"},
  HAS_NO_VALUE : {text: i18n("operators.has_no_value"), id: "has_no_value", op: "eq"},

  IS_ANY       : {text: i18n("operators.is_any"), id: "is_any", op: "in"},
  CONTAINS     : {text: i18n("operators.contains"), id: "contains", op: "lk"}
};

export default OPERATORS;
